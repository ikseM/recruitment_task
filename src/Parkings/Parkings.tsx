import React, { useState, useEffect, ChangeEvent } from "react";
import * as Styled from "./Parkings.styles";
import { Table } from "antd";
import { Columns } from "./columns";
import { Parking, ParkingProperties } from "../types/Parkings";
import ParkingForm from './ParkingForm/ParkingForm';

interface ParkingsProps {
  data: Parking[];
  onDelete: (index: number) => void
  onEdit: (payload: ParkingProperties) => void;
  onHover: (index?: number) => void;
  onSelect: (index?: number) => void;
  selectedParking?: number
}

const Parkings = ({ data, onDelete, onEdit, onHover, onSelect, selectedParking }: ParkingsProps) => {
  const [parkings, setParkings] = useState<ParkingProperties[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editedParking, setEditedParking] = useState<ParkingProperties>();

  useEffect(() => {
    const parkings = queryMappedParkingProperties(data);
    setParkings(parkings);
  }, [data]);

  const queryMappedParkingProperties = (data: Parking[]) => {
    return data.map((item) => item.properties);
  };

  const onRowEdit = (index: number) => {
    const parking = parkings.find(item => item.index === index);

    if (parking) {
      setEditedParking(parking);
    }
  };

  const onRowSelect = (record: ParkingProperties) => {
    if (selectedParking) {
      if (record.index === selectedParking) {
        onSelect()
      } else {
        onSelect(record.index)
      }
    } else {
        onSelect(record.index)
    }
  }

  const onFormClose = () => {
    setEditedParking(undefined);
  }

  const onFormSave = (payload: ParkingProperties) => {
    console.log(payload)
    onEdit(payload);
    onFormClose();
  }

  const onRowDelete = (index: number) => {
    onDelete(index);
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const filterDataSource = () => {
    return parkings.filter((parking) =>
      parking.street.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <Styled.Container>
      <Styled.Input placeholder="Wyszukaj..." onChange={onSearchChange} />
      <Table
        onRow={(record) => {
          return {
            onMouseEnter: () => onHover(record?.index),
            onMouseLeave: () => onHover(),
            onClick: () => onRowSelect(record)
          }
        }}
        dataSource={filterDataSource()}
        columns={Columns({
          onEdit: onRowEdit,
          onDelete: onRowDelete,
        })}
        pagination={false}
        size="small"
      />

      <ParkingForm parking={editedParking} onClose={onFormClose} onSave={onFormSave} />
    </Styled.Container>
  );
};

export default Parkings;
