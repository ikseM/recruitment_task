import React from "react";
import * as Styled from "./Parkings.styles";
import { compare } from "natural-orderby";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ParkingProperties } from "../types/Parkings";

type Columns = {
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export const Columns = ({ onEdit, onDelete }: Columns) => {
  return [
    {
      title: "Ulica",
      dataIndex: "street",
      sorter: (a: ParkingProperties, b: ParkingProperties) =>
        compare()(a.street, b.street),
      showSorterTooltip: false,
    },
    {
      title: "Miejsca",
      dataIndex: "spots",
    },
    {
      title: "Rodzaj",
      dataIndex: "paid",
      render: (_: string, record: ParkingProperties) => (
        <span>{record.paid ? "Płatny" : "Bezpłatny"}</span>
      ),
    },
    {
      title: "",
      width: 30,
      dataIndex: "edit",
      render: (_: string, record: ParkingProperties) => (
        <Styled.EditButton
          icon={<EditOutlined />}
          onClick={() => onEdit(record.index)}
        />
      ),
    },
    {
      title: "",
      width: 30,
      dataIndex: "delete",
      render: (_: string, record: ParkingProperties) => (
        <Styled.DeleteButton
          icon={<DeleteOutlined />}
          onClick={() => onDelete(record.index)}
        />
      ),
    },
  ];
};
