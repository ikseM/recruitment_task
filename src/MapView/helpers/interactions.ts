import Select from "ol/interaction/Select";
import Map from "ol/Map";
import {
  TABLE_HOVER_STYLE,
  TABLE_SELECT_STYLE,
} from "../../constants/interactions";
import VectorLayer from "ol/layer/Vector";
import { MapInteractions } from "../../types/interactions";
import { DEFAULT_STYLE } from "../../constants/features";
import { pointerMove } from "ol/events/condition";
import Feature from "ol/Feature";

const initializeTableHoverInteraction = () => {
  const interaction = new Select({
    style: TABLE_HOVER_STYLE,
  });

  return interaction;
};
const initializeTableSelectInteraction = () => {
  const interaction = new Select({
    style: TABLE_SELECT_STYLE,
  });

  return interaction;
};

type HoverCallback = (feature: Feature) => void;

export const initializeHoverTooltipInteraction = (callback: HoverCallback) => {
  const interaction = new Select({
    condition: pointerMove,
    style: DEFAULT_STYLE,
  });

  interaction.on("select", ({ selected }) => {
    callback(selected[0]);
  });

  return interaction;
};

export const initializeTableInteractions = () => {
  return {
    TABLE_HOVER: initializeTableHoverInteraction(),
    TABLE_SELECT: initializeTableSelectInteraction(),
  };
};

type PickParking = {
  featureId: number;
  layer: VectorLayer;
  interaction: Select;
};

export const pickParkingInInteraction = ({
  featureId,
  interaction,
  layer,
}: PickParking) => {
  const feature = layer.getSource().getFeatureById(featureId);

  if (feature) {
    interaction.getFeatures().push(feature);
  }
};

export const clearInteraction = (
  type: string,
  interactions?: MapInteractions
) => {
  if (interactions) {
    const interaction = interactions[type];

    if (interaction) {
      interaction.getFeatures().clear();
    }
  }
};

type ZoomToFeature = {
  layer: VectorLayer;
  map: Map;
  featureId: number;
};

export const zoomToFeature = ({ layer, featureId, map }: ZoomToFeature) => {
  const feature = layer.getSource().getFeatureById(featureId);

  if (feature) {
    const extent = feature.getGeometry().getExtent();

    if (extent) {
      map.getView().setCenter(extent);
    }
  }
};
