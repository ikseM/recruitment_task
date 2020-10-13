import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { compare } from "natural-orderby";

import { Parking, ParkingProperties } from "../../types/parking";
import * as Styled from "./Parkings.styles";

type ColumnsProps = {
  selectedParking?: Parking;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export const Columns = ({
  onEdit,
  onDelete,
  selectedParking,
}: ColumnsProps) => {
  const index = selectedParking?.properties.index;

  const generatePaidText = (paid: boolean) => (paid ? "Płatny" : "Bezpłatny");

  return [
    {
      title: "Ulica",
      dataIndex: "street",
      sorter: (a: ParkingProperties, b: ParkingProperties) =>
        compare()(a.street, b.street),
      showSorterTooltip: false,
      render: (text: string, record: ParkingProperties) =>
        index && index === record.index ? (
          <Styled.BoldRow>{text}</Styled.BoldRow>
        ) : (
          text
        ),
    },
    {
      title: "Miejsca",
      dataIndex: "spots",
      render: (text: string, record: ParkingProperties) =>
        index && index === record.index ? (
          <Styled.BoldRow>{text}</Styled.BoldRow>
        ) : (
          text
        ),
    },
    {
      title: "Rodzaj",
      dataIndex: "paid",
      render: (_: string, record: ParkingProperties) => {
        const paidText = generatePaidText(record.paid);

        return index && index === record.index ? (
          <Styled.BoldRow>{paidText}</Styled.BoldRow>
        ) : (
          paidText
        );
      },
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
        <Popconfirm
          title="Czy na pewno usunąć?"
          onConfirm={(e) => {
            e?.stopPropagation();
            onDelete(record.index);
          }}
          onCancel={(e) => e?.stopPropagation()}
          okText="Tak"
          cancelText="Nie"
        >
          <Styled.DeleteIcon />
        </Popconfirm>
      ),
    },
  ];
};
