import React, { useState, useEffect } from "react";
import * as Styled from "./Main.styles";
import ParkingsData from "../commons/parkingi";
import { Parking, ParkingProperties } from "../types/Parkings";
import Parkings from "../Parkings/Parkings";
import MapView from "../MapView/MapView";

const Main = () => {
  const [parkings, setParkings] = useState<Parking[]>([]);
  const [hoveredParking, setHoveredParking] = useState<number>();
  const [selectedParking, setSelectedParking] = useState<number>();

  useEffect(() => {
    const data = queryMappedParkings(ParkingsData.features);
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

  const onRowDelete = (index: number) => {
    const newData = parkings.filter((item) => item.properties.index !== index);

    setParkings(newData);
  };

  const onRowEdit = (payload: ParkingProperties) => {
    const editedParkingIndex = parkings.findIndex(
      (item) => item.properties.index === payload.index
    );

    if (editedParkingIndex || editedParkingIndex === 0) {
      const newParkings = [...parkings];
      newParkings[editedParkingIndex].properties = payload;

      setParkings(newParkings);
    }
  };

  const onRowSelect = (index?: number) => {
    if (index) {
      const parking = parkings.find((item) => item.properties.index === index);

      if (parking) {
        setSelectedParking(parking.properties.index);
      }
    } else {
      setSelectedParking(undefined);
    }
  };

  const onRowHover = (index?: number) => {
    if (index) {
      const parking = parkings.find((item) => item.properties.index === index);

      if (parking) {
        setHoveredParking(parking.properties.index);
      }
    } else {
      setHoveredParking(undefined);
    }
  };

  return (
    <Styled.Container>
      <Parkings
        onDelete={onRowDelete}
        data={parkings}
        onEdit={onRowEdit}
        onHover={onRowHover}
        onSelect={onRowSelect}
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
