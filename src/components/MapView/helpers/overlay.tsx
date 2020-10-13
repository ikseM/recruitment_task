import React from "react";
import ReactDOM from "react-dom";
import Overlay from "ol/Overlay";

import Tooltip from "../../Tooltip/Tooltip";
import { LAYER_SYMBOL } from "../../../constants/Features";
import OverlayPositioning from "ol/OverlayPositioning";
import { ParkingProperties } from "../../../types/parking";

export const createOverlay = (parking: ParkingProperties) => {
  return new Overlay({
    element: renderOverlayContainer(parking),
    id: LAYER_SYMBOL,
    stopEvent: false,
    positioning: OverlayPositioning.BOTTOM_CENTER,
  });
};

const renderOverlayContainer = (parking: ParkingProperties) => {
  const overlayElement = document.createElement("div");
  ReactDOM.render(<Tooltip parking={parking} />, overlayElement);
  return overlayElement;
};
