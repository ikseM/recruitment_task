import React, { useEffect } from "react";
import { Modal, Form, Button, Input, InputNumber, Select, message } from "antd";
import { ParkingProperties } from "../../../types/parking";
import {
  convertBooleanToText,
  convertTextToBoolean,
  TEXT_VALUES,
} from "./helper";

type ParkingForm = {
  parking?: ParkingProperties;
  onClose: () => void;
  onSave: (payload: ParkingProperties) => void;
};
const ParkingForm = ({ parking, onClose, onSave }: ParkingForm) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (parking) {
      form.setFieldsValue({
        ...parking,
        paid: convertBooleanToText(parking.paid),
      });
    }
  }, [parking]);

  const saveForm = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          ...parking,
          ...values,
          paid: convertTextToBoolean(values.paid),
        } as ParkingProperties;

        onSave(payload);
      })
      .catch(() => {
        message.warn("Wypełnij wszystkie pola");
      });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      visible={Boolean(parking)}
      title="Parking"
      footer={[
        <Button onClick={onClose}>Anuluj</Button>,
        <Button type="primary" onClick={saveForm}>
          Zapisz
        </Button>,
      ]}
    >
      <Form form={form} {...layout} size="small">
        <Form.Item
          label="Ulica"
          name="street"
          rules={[{ required: true, message: "Pole wymagane" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Miejsca"
          name="spots"
          rules={[{ required: true, message: "Pole wymagane" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Niepełnosprawne"
          name="handicappedSpots"
          rules={[{ required: true, message: "Pole wymagane" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Rodzaj"
          name="paid"
          rules={[{ required: true, message: "Pole wymagane" }]}
        >
          <Select>
            <Select.Option value={TEXT_VALUES.paid}>
              {TEXT_VALUES.paid}
            </Select.Option>
            <Select.Option value={TEXT_VALUES.notPaid}>
              {TEXT_VALUES.notPaid}
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ParkingForm;
