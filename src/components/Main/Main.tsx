import React, { useState, useEffect } from "react";
import * as Styled from "./Main.styles";
import Parkings from "../Parkings/Parkings";
import MapView from "../MapView/MapView";

import parkings_data from "./parkingi";
import {Parking, ParkingProperties} from "../../types/parking";

const Main = () => {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [hoveredParking, setHoveredParking] = useState<Parking>();
  const [selectedParking, setSelectedParking] = useState<Parking>();

  useEffect(() => {
    const data = queryMappedParkings(parkings_data.features);
    setParkings(data);
  }, []);

  const queryMappedParkings = (data: any[]) => {
    return data.map((parking: Parking, index: number) => {
      return {
        ...parking,
        properties: {
          ...parking.properties,
          index: index + 1,
        },
      };
    });
  };

  const onRowHover = (index?: number) => {
    if (index) {
      const parking = parkings.find((item) => item.properties.index === index);

      if (parking) setHoveredParking(parking);
    } else {
      setHoveredParking(undefined);
    }
  };

  const onRowSelect = (index?: number) => {
    if (index) {
      const parking = parkings.find((item) => item.properties.index === index);

      if (parking) setSelectedParking(parking);
    } else {
      setSelectedParking(undefined);
    }
  };

  const onRowDelete = (index: number) => {
    const newParkings = parkings.filter(
      (parking) => parking.properties.index !== index
    );

    setParkings(newParkings);
    setSelectedParking(undefined);
    setHoveredParking(undefined);
  };

  const onRowEdit = (payload: ParkingProperties) => {
    const editedParkingIndex = parkings.findIndex(
      (parking) => parking.properties.index === payload.index)

    if (editedParkingIndex) {
      const newParkings = [...parkings];
      newParkings[editedParkingIndex].properties = payload;

      setParkings(newParkings);
    }
  }

  return (
    <Styled.Container>
      <Parkings
        data={parkings}
        onHover={onRowHover}
        onSelect={onRowSelect}
        onDelete={onRowDelete}
        onEdit={onRowEdit}
        selectedParking={selectedParking}
      />
      <MapView
        data={parkings}
        hoveredParking={hoveredParking}
        selectedParking={selectedParking}
      />
    </Styled.Container>
  );
};

export default Main;
