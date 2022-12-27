import React from "react";
import { Form, Input, Button, Tooltip } from "antd";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";

const FILENAME_PATTERN = /^[^\\/?%*:|"<>\.#$@!&]+$/g;

const TreeInput = (props) => {
  const onFinish = (values) => {
    if(values.title === props.value) console.log("same")
    else props.onSave(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="tree"
      layout="inline"
      initialValues={{title: props.value}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item>
        <Tooltip title="Cancelar">
          <Button
            size="small"
            type="text"
            shape="circle"
            onClick={() => {
              props.onCancel();
            }}
            icon={<CloseOutlined />}
          />
        </Tooltip>
      </Form.Item>
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            pattern: FILENAME_PATTERN,
            message: `No puede estar en blanco, ni debe contener los siguientes caracteres: " / ? % * : | < > # $ @ ! &`,
          },
        ]}
      >
        <Input
          size="small"
          maxLength={32}
          suffix={
            <Tooltip title="Presiona ENTER para guardar">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
          style={{ width: "350px" }}
        />
      </Form.Item>
    </Form>
  );
};
export default TreeInput;
