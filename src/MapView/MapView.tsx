import React, { useRef, useEffect, useState } from "react";
import * as Styled from "./MapView.styles";
import { initializeMap, initializeParkingLayer } from "./helpers/map";
import { Parking } from "../types/Parkings";
import { LAYER_SYMBOL } from "../constants/features";
import {
  clearInteraction,
  initializeHoverTooltipInteraction,
  initializeTableInteractions,
  pickParkingInInteraction,
  zoomToFeature,
} from "./helpers/interactions";
import { MapInteractions } from "../types/interactions";
import Layer from "ol/layer/Layer";
import { INTERACTIONS } from "../constants/interactions";
import Feature from "ol/Feature";
import {createOverlay} from './helpers/overlay';
import {getCenter} from 'ol/extent';

type MapProps = {
  data: Parking[];
  hoveredParking?: number;
  selectedParking?: number;
};

const MapView = ({ data, hoveredParking, selectedParking }: MapProps) => {
  const [map, setMap] = useState();
  const [mapInteractions, setMapInteraction] = useState<MapInteractions>();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = initializeMap(mapRef.current);

      setMap(map);
    }
  }, []);

  useEffect(() => {
    if (map) {
      const layer = initializeParkingLayer(data);

      layer.setProperties({ symbol: LAYER_SYMBOL });

      map.addLayer(layer);

      const extent = layer.getSource().getExtent();
      map.getView().fit(extent, {
        size: map.getSize(),
        padding: [20, 20, 20, 20],
      });

      addInteractions();
    }
  }, [map]);

  useEffect(() => {
    clearInteraction(INTERACTIONS.TABLE_HOVER, mapInteractions);

    if (hoveredParking && mapInteractions) {
      const layer = map
        .getLayers()
        .getArray()
        .find((layer: Layer) => layer.get("symbol") === LAYER_SYMBOL);

      pickParkingInInteraction({
        featureId: hoveredParking,
        layer,
        interaction: mapInteractions[INTERACTIONS.TABLE_HOVER],
      });
    }
  }, [hoveredParking]);

  useEffect(() => {
    clearInteraction(INTERACTIONS.TABLE_SELECT, mapInteractions);

    if (selectedParking && mapInteractions) {
      const layer = map
        .getLayers()
        .getArray()
        .find((layer: Layer) => layer.get("symbol") === LAYER_SYMBOL);

      pickParkingInInteraction({
        featureId: selectedParking,
        layer,
        interaction: mapInteractions[INTERACTIONS.TABLE_SELECT],
      });

      zoomToFeature({
        layer,
        featureId: selectedParking,
        map,
      });
    }
  }, [selectedParking]);

  const addInteractions = () => {
    const tableInteraction = initializeTableInteractions();

    Object.values(tableInteraction).forEach((interaction) => {
      map.addInteraction(interaction);
      interaction.setActive(false);
    });

    const hoverInteraction = initializeHoverTooltipInteraction(onFeatureHover);
    map.addInteraction(hoverInteraction);

    setMapInteraction({
      ...tableInteraction,
      HOVER_TOOLTIP: hoverInteraction,
    });
  };

  const onFeatureHover = (feature: Feature) => {
    clearOverlay()

    if (feature) {
      const hoveredFeature = data.find(
        (item) => item.properties.index === feature.getId()
      );

      if (hoveredFeature) {
        const overlay = createOverlay(hoveredFeature.properties);

        const extent = feature.getGeometry().getExtent();
        const center = getCenter(extent)

        overlay.setPosition(center);
        map.addOverlay(overlay);
      }
    }
  };

  const clearOverlay = () => {
    const overlay = map.getOverlayById(LAYER_SYMBOL)

    if (overlay) {
      map.removeOverlay(overlay);
    }
  }

  return (
    <Styled.Container>
      <Styled.MapContainer ref={mapRef} />
    </Styled.Container>
  );
};

export default MapView;
