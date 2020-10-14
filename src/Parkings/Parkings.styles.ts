import styled from "styled-components";
import { Button, Input as AntInput } from "antd";

export const Container = styled.div`
  height: 100%;
`;

export const Input = styled(AntInput)`
  width: 100%;
  margin-bottom: 5px;
`

export const EditButton = styled(Button)`
  border: 0;
  background-color: transparent;
  color: #0167ba;

  :hover {
    color: #2f7cbc;
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }
`;

export const DeleteButton = styled(Button)`
  border: 0;
  background-color: transparent;
  color: #ba0101;

  :hover {
    color: #bc2f2f;
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }
`;
