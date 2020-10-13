import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition";
import {
  TABLE_HOVER_STYLE,
  INTERACTIONS,
  TABLE_SELECT_STYLE,
  HOVER_TOOLTIP_STYLE,
} from "../../../constants/Interactions";
import { MapInteractions } from "../../../types/interactions";
import VectorLayer from "ol/layer/Vector";
import { Parking } from "../../../types/parking";
import Feature from "ol/Feature";

const initializeTableHoverInteraction = () => {
  const interaction = new Select({
    style: TABLE_HOVER_STYLE,
  });

  interaction.setProperties({ type: INTERACTIONS.TABLE_HOVER });

  return interaction;
};

const initializeTableSelectInteraction = () => {
  const interaction = new Select({
    style: TABLE_SELECT_STYLE,
  });

  interaction.setProperties({ type: INTERACTIONS.TABLE_SELECT });

  return interaction;
};

type HoverCallback = (feature: Feature) => void;

export const initializeHoverTooltipInteraction = (callback: HoverCallback) => {
  const interaction = new Select({
    condition: pointerMove,
    style: HOVER_TOOLTIP_STYLE,
  });

  interaction.setProperties({ type: INTERACTIONS.HOVER_TOOLTIP });

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

type PickParking = {
  featureId: number;
  layer: VectorLayer;
  interaction: Select;
};

export const pickParkingInInteraction = ({
  featureId,
  layer,
  interaction,
}: PickParking) => {
  const feature = layer.getSource().getFeatureById(featureId);

  if (feature) {
    interaction.getFeatures().push(feature);
  }
};

export const filterRemovedFeatures = (data: Parking[], layer: VectorLayer) => {
  const source = layer.getSource();
  const features = source.getFeatures();

  features.forEach((feature) => {
    if (!data.find((item) => item.properties.index === feature.getId())) {
      source.removeFeature(feature);
    }
  });
};
