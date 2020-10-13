import { Fill, Stroke, Style } from "ol/style";

export const INTERACTIONS = {
  TABLE_HOVER: "TABLE_HOVER",
  TABLE_SELECT: "TABLE_SELECT",
  HOVER_TOOLTIP: "HOVER_TOOLTIP"
};

export const TABLE_HOVER_STYLE = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 0, 0.45)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 255, 0, 0.95)",
    width: 1,
  }),
});

export const HOVER_TOOLTIP_STYLE = new Style({
  fill: new Fill({
    color: "rgba(255, 0, 0, 0.35)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 0, 0.65)",
    width: 1,
  })
});

export const TABLE_SELECT_STYLE = new Style({
  fill: new Fill({
    color: "rgba(255, 0, 255, 0.45)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 255, 0.95)",
    width: 1,
  }),
});
