import React from 'react';
import * as Styled from './Tooltip.styles';
import {ParkingProperties} from '../types/Parkings';

type Tooltip = {
  parking: ParkingProperties
}

const Tooltip = ({parking}: Tooltip) => {
  const { street, spots, handicappedSpots, paid } = parking;

  return (
    <Styled.Container>
      <Styled.Row>
        <Styled.Label>Ulica:</Styled.Label>
        <Styled.Value>{street}</Styled.Value>
      </Styled.Row>

      <Styled.Row>
        <Styled.Label>Miejsca:</Styled.Label>
        <Styled.Value>{spots}</Styled.Value>
      </Styled.Row>

      <Styled.Row>
        <Styled.Label>Niepełnosprawne:</Styled.Label>
        <Styled.Value>{handicappedSpots}</Styled.Value>
      </Styled.Row>

      <Styled.Row>
        <Styled.Label>Rodzaj:</Styled.Label>
        <Styled.Value>{paid ? "Płatny" : "Bezpłatny"}</Styled.Value>
      </Styled.Row>
    </Styled.Container>
  )
}

export default Tooltip;
