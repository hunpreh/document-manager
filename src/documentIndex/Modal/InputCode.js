import React, { useState } from "react";
import { Row, Col, Button, Input } from "antd";
import { InfoCircleOutlined, FileTextOutlined } from "@ant-design/icons";

const InputCode = (props) => {
  const [char, setChar] = useState("");
  const [digit, setDigit] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateFile = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.onInsertFile(char + "-" + digit);
      props.onClose();
    }, 3000);
  };

  return (
    <>
      <Row justify="start" style={{ marginTop: 15 }}>
        <Col span={18}>
          <Input.Group compact>
            <Input
              style={{
                width: 150,
                textAlign: "center",
              }}
              placeholder="CODIGO"
              addonAfter="-"
              maxLength={10}
              onChange={({ target }) => {
                setChar(target.value);
              }}
            />
            <Input
              style={{
                width: 100,
                textAlign: "center",
              }}
              placeholder="000"
              maxLength={3}
              onChange={({ target }) => {
                setDigit(target.value);
              }}
              addonAfter={
                <InfoCircleOutlined
                  title={`Este apartado no podrá editarse, ni modificarse más adelante.\nAsegúrate de que este bien escrito.`}
                />
              }
            />
          </Input.Group>
        </Col>
        <Col span={6} align="center">
          <Button
            type="primary"
            shape="round"
            icon={<FileTextOutlined />}
            disabled={char.length < 6 || digit.length < 3}
            loading={loading}
            onClick={onCreateFile}
          >
            {loading ? "" : "Crear"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InputCode;
