import React from 'react';
import ReactDOM from 'react-dom';
import {ParkingProperties} from '../../types/Parkings';
import Overlay from 'ol/Overlay';
import {LAYER_SYMBOL} from '../../constants/features';
import OverlayPositioning from 'ol/OverlayPositioning';
import Tooltip from '../../Tooltip/Tooltip';

export const createOverlay = (parking: ParkingProperties) => {
  return new Overlay({
    id: LAYER_SYMBOL,
    stopEvent: false,
    positioning: OverlayPositioning.BOTTOM_CENTER,
    element: renderOverlayContainer(parking)
  })
}

const renderOverlayContainer = (parking: ParkingProperties) => {
  const overlayElement = document.createElement('div');
  ReactDOM.render(<Tooltip parking={parking}/>, overlayElement);
  return overlayElement;
}
