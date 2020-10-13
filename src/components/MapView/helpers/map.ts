import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Parking } from "../../../types/parking";
import Feature from "ol/Feature";
import { DEFAULT_STYLE } from "../../../constants/Features";

const prepareFeature = (parking: Parking) => {
  const { geometry, properties } = parking;

  const feature = new Feature({
    geometry: new GeoJSON().readGeometry(geometry),
  });

  feature.setId(properties.index);
  feature.setStyle(DEFAULT_STYLE);
  return feature;
};

export const initializeParkingLayer = (data: Parking[]) => {
  const features = data.map((parking) => prepareFeature(parking));

  return new VectorLayer({
    source: new VectorSource({
      features,
    }),
  });
};

export const initializeMap = (mapRef: HTMLDivElement) => {
  return new Map({
    target: mapRef,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 10,
      projection: "EPSG:4326",
    }),
  });
};

type FeatureExtent = {
  featureId: number;
  layer: VectorLayer;
};

export const queryFeatureExtent = ({ featureId, layer }: FeatureExtent) => {
  const feature = layer.getSource().getFeatureById(featureId);
  if (feature) {
    return feature.getGeometry().getExtent();
  }
};
