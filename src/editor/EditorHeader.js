import "./Editor.css";
import React, { useState } from "react";
import { Row, Col, Button, Tooltip, Modal, Typography } from "antd";
import {
  FileTextOutlined,
  SaveOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { codeVerify, titleVerify } from "../utils/regex_validators";

import ReferenceDocs from "../documentIndex/Modal/ReferenceDocs/ReferenceDocs";

const { Title } = Typography;

const styleProps = {
  style: {
    color: "white",
    marginTop: "12px",
  },
  level: 4,
  ellipsis: true,
};

const EditorHeader = (props) => {
  const [title = "Titulo del Documento", setTitle] = useState(props.title);
  const [code = "CODIGO-000", setCode] = useState();
  const [edit, setEdit] = useState(true);

  const saveHandler = () => {
    props.onSaveHandler(title);
  };

  const onChangeCode = (codeStr) => {
    if (codeVerify(codeStr)) setCode(codeStr);
  };

  const onChangeTitle = (titleStr) => {
    if (titleVerify(titleStr)) setTitle(titleStr);
  };

  const referenceModal = () => {
    Modal.info({
      title: `Documentos de referencia de "${title}"`,
      content: <ReferenceDocs />,
      width: 620,
      icon: null,
      bodyStyle: { padding: 24 },
      maskClosable: true,
      closable: true,
      okButtonProps: { style: { display: "none" } },
      afterClose: saveHandler,
    });
  };

  return (
    <Row className="editor_header">
      <Col
        xs={2}
        sm={2}
        md={2}
        lg={{ span: 1 }}
        xl={{ span: 1 }}
        align="center"
      >
        <Tooltip
          placement="bottomLeft"
          title={`Version #${props.version}`}
          color="blue"
        >
          <FileTextOutlined className="editor_logo" />
        </Tooltip>
      </Col>
      <Col xs={7} sm={7} md={6} lg={{ span: 4 }} xl={{ span: 3 }}>
        <Title
          {...styleProps}
          editable={{
            maxLength: 10,
            triggerType: "text",
            onChange: onChangeCode,
            onEnd: saveHandler
          }}
        >
          {code}
        </Title>
      </Col>
      <Col xs={7} sm={7} md={8} lg={{ span: 6 }} xl={{ span: 6 }}>
        <Title
          {...styleProps}
          editable={{
            maxLength: 32,
            triggerType: "text",
            onChange: onChangeTitle,
            onEnd: saveHandler
          }}
        >
          {title}
        </Title>
      </Col>
      <Col
        xs={2}
        sm={2}
        md={2}
        lg={{ span: 1, offset: 9 }}
        xl={{ span: 1, offset: 10 }}
        align="center"
      >
        <Button
          title="Adjuntar documentos de referencia"
          shape="circle"
          icon={<PaperClipOutlined />}
          onClick={referenceModal}
        />
      </Col>
      <Col
        xs={6}
        sm={6}
        md={5}
        lg={{ span: 3 }}
        xl={{ span: 3 }}
        align="center"
      >
        <Button
          type="primary"
          shape="round"
          icon={<SaveOutlined />}
          onClick={saveHandler}
        >
          Guardar
        </Button>
      </Col>
    </Row>
  );
};

export default EditorHeader;
