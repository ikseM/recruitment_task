import React, { useRef, useState, useEffect } from "react";
import * as Styled from "./Map.styles";
import { Parking } from "../../types/parking";
import {
  initializeMap,
  initializeParkingLayer,
  queryFeatureExtent,
} from "./helpers/map";
import {
  clearInteraction,
  pickParkingInInteraction,
  initializeTableInteractions,
  filterRemovedFeatures,
  initializeHoverTooltipInteraction,
} from "./helpers/interactions";
import { MapInteractions } from "../../types/interactions";
import { INTERACTIONS } from "../../constants/Interactions";
import { LAYER_SYMBOL } from "../../constants/Features";
import Layer from "ol/layer/Layer";
import Feature from "ol/Feature";
import { createOverlay } from "./helpers/overlay";
import { getCenter } from "ol/extent";

interface MapProps {
  data: Parking[];
  hoveredParking?: Parking;
  selectedParking?: Parking;
}

const MapView = ({ data, hoveredParking, selectedParking }: MapProps) => {
  const [map, setMap] = useState();
  const [mapInteractions, setMapInteractions] = useState<MapInteractions>();
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

      const extent = layer.getSource().getExtent();

      map.addLayer(layer);
      map.getView().fit(extent, {
        size: map.getSize(),
        padding: [20, 20, 20, 20],
      });

      addInteractions();
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      clearInteraction(INTERACTIONS.TABLE_HOVER, mapInteractions);
      clearInteraction(INTERACTIONS.TABLE_SELECT, mapInteractions);

      const layer = map
        .getLayers()
        .getArray()
        .find((layer: Layer) => layer.get("symbol") === LAYER_SYMBOL);

      filterRemovedFeatures(data, layer);
    }
  }, [data]);

  useEffect(() => {
    clearInteraction(INTERACTIONS.TABLE_HOVER, mapInteractions);

    if (hoveredParking && mapInteractions) {
      const layer = map
        .getLayers()
        .getArray()
        .find((layer: Layer) => layer.get("symbol") === LAYER_SYMBOL);

      pickParkingInInteraction({
        featureId: hoveredParking.properties.index,
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
        featureId: selectedParking.properties.index,
        layer,
        interaction: mapInteractions[INTERACTIONS.TABLE_SELECT],
      });

      zoomToFeature(selectedParking.properties.index);
    }
  }, [selectedParking]);

  const zoomToFeature = (featureId: number) => {
    const layer = map
      .getLayers()
      .getArray()
      .find((layer: Layer) => layer.get("symbol") === LAYER_SYMBOL);

    const extent = queryFeatureExtent({
      featureId,
      layer,
    });

    if (extent) map.getView().setCenter(extent);
  };

  const addInteractions = () => {
    const tableInteractions = initializeTableInteractions();

    Object.values(tableInteractions).forEach((interaction) => {
      map.addInteraction(interaction);
      interaction.setActive(false);
    });

    const tooltipInteraction = initializeHoverTooltipInteraction(
      onFeatureHover
    );

    map.addInteraction(tooltipInteraction);

    setMapInteractions({
      ...tableInteractions,
      HOVER_TOOLTIP: tooltipInteraction,
    });
  };

  const onFeatureHover = (feature?: Feature) => {
    clearOverlay();

    if (feature) {
      const hoveredParking = data.find(
        (item) => item.properties.index === feature.getId()
      );

      if (hoveredParking) {
        const overlay = createOverlay(hoveredParking.properties);
        const extent = feature.getGeometry().getExtent();
        const center = getCenter(extent);

        overlay.setPosition(center);
        map.addOverlay(overlay);
      }
    }
  };

  const clearOverlay = () => {
    const overlay = map.getOverlayById(LAYER_SYMBOL);
    if (overlay) {
      map.removeOverlay(overlay);
    }
  };

  return (
    <Styled.Container>
      <Styled.MapContainer ref={mapRef} />
    </Styled.Container>
  );
};

export default MapView;
