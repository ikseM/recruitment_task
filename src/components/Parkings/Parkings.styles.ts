import styled from "styled-components";
import { Button as AntButton, Input as AntInput } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const Container = styled.div`
  height: 100%;
`;

export const Input = styled(AntInput)`
  width: 100%;
  margin-bottom: 5px;
`

export const EditButton = styled(AntButton)`
  color: #0059c1;
  border: 0;
  background-color: transparent;

  :hover {
    color: #4d96ea;
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }
`;

export const DeleteIcon = styled(DeleteOutlined)`
  color: #c10000;

  :hover {
    color: #ea4d4d;
    cursor: pointer;
  }
`;

export const BoldRow = styled.span`
  font-weight: bold;
`;
