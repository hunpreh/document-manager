import "./Editor.css";
import React, { Fragment, useState } from "react";
import { Layout, Row, Col, Button, Input, Tag } from "antd";
import { FileTextOutlined, SaveOutlined } from "@ant-design/icons";

const { Header } = Layout;

const EditorHeader = (props) => {
  const [title, setTitle] = useState(props.title);

  const saveHandler = () => {
    props.onSaveHandler(title);
  }

  return (
    <Fragment>
      <Header className="editor_header">
        <Row>
          <Col flex="50px" align="center">
            <FileTextOutlined className="editor_logo" />
          </Col>
          <Col flex={1}>
            <Input
              placeholder="Titulo del Documento"
              defaultValue={title}
              maxLength={32}
              onChange={(t) => setTitle(t.target.value)}
            />
          </Col>
          <Col flex="100px" align="center">
            <Tag color="#108ee9">Version {props.version}</Tag>
          </Col>
          <Col flex="auto" align="right" pull={1}>
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
      </Header>
    </Fragment>
  );
}

export default EditorHeader;
