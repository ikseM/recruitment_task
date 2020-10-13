import { Fill, Stroke, Style } from "ol/style";

export const LAYER_SYMBOL = "PARKINGS";

export const DEFAULT_STYLE = new Style({
  fill: new Fill({
    color: "rgba(255, 0, 0, 0.45)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 0, 0.95)",
    width: 1,
  })
});
