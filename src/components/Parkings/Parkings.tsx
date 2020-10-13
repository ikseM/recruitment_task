import React, { useState, useEffect, ChangeEvent } from "react";
import * as Styled from "./Parkings.styles";
import { Table } from "antd";
import { Columns } from "./columns";
import { ParkingProperties, Parking } from "../../types/parking";
import { SearchOutlined } from "@ant-design/icons";

import ParkingForm from './ParkingForm/ParkingForm';

interface ParkingsProps {
  data: Parking[];
  selectedParking?: Parking;
  onHover: (index?: number) => void;
  onSelect: (index?: number) => void;
  onDelete: (index: number) => void;
  onEdit: (payload: ParkingProperties) => void;
}

const Parkings = ({
  data,
  selectedParking,
  onHover,
  onSelect,
  onDelete,
  onEdit
}: ParkingsProps) => {
  const [parkings, setParkings] = useState<ParkingProperties[]>([]);
  const [editedParking, setEditedParking] = useState<ParkingProperties>();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const parkings = queryMappedParkingProperties(data);
    setParkings(parkings);
  }, [data]);

  const queryMappedParkingProperties = (parkings: Parking[]) => {
    return parkings.map((parking: Parking) => parking.properties);
  };

  const onEditRow = (index: number) => {
    const parking = parkings.find(item => item.index === index);

    if (parking) {
      setEditedParking(parking);
    }
  };

  const onFormClose = () => {
    setEditedParking(undefined);
  }

  const onFormSave = (payload: ParkingProperties) => {
    onEdit(payload);
    onFormClose()
  }

  const onDeleteRow = (index: number) => {
    onDelete(index);
  };

  const onMouseEnter = (record?: ParkingProperties) => {
    onHover(record?.index);
  };

  const onRowSelect = (record: ParkingProperties, event: any) => {
    event.preventDefault();
    if (event.target.tagName !== "svg") {
      if (selectedParking) {
        const { index } = selectedParking.properties;

        if (index !== record.index) {
          onSelect(record.index);
        } else {
          onSelect();
        }
      } else {
        onSelect(record.index);
      }
    }
  };

  const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
  };

  const filterDataSource = () => {
    return parkings.filter((parking) =>
      parking.street.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <Styled.Container>
      <Styled.Input
        prefix={<SearchOutlined />}
        placeholder="Wyszukaj..."
        onChange={onSearchChange}
      />
      <Table
        onRow={(record) => {
          return {
            onMouseEnter: () => onMouseEnter(record),
            onMouseLeave: () => onMouseEnter(),
            onClick: (event) => onRowSelect(record, event),
          };
        }}
        dataSource={filterDataSource()}
        columns={Columns({
          onEdit: onEditRow,
          onDelete: onDeleteRow,
          selectedParking,
        })}
        pagination={false}
        size="small"
      />

      <ParkingForm parking={editedParking} onClose={onFormClose} onSave={onFormSave}/>
    </Styled.Container>
  );
};

export default Parkings;
