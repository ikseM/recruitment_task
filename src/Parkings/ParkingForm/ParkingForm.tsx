import React, { useEffect } from "react";
import { Modal, Form, Button, message, Input, InputNumber, Select } from "antd";
import { ParkingProperties } from "../../types/Parkings";
import { TEXT_VALUES, convertBooleanToText, convertTextToBoolean } from "./helper";

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

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const saveForm = () => {
    form
      .validateFields()
      .then((value) => {
        const payload = {
          ...parking,
          ...value,
          paid: convertTextToBoolean(value.paid)
        } as ParkingProperties;

        onSave(payload);
      })
      .catch(() => {
        message.warn("Wypełnij pola!");
      });
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
      <Form form={form} {...layout}>
        <Form.Item
          label="Ulica"
          name="street"
          rules={[{ required: true, message: "Pole wymagane!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Miejsca"
          name="spots"
          rules={[{ required: true, message: "Pole wymagane!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Niepełnosprawne"
          name="handicappedSpots"
          rules={[{ required: true, message: "Pole wymagane!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Rodzaj"
          name="paid"
          rules={[{ required: true, message: "Pole wymagane!" }]}
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
