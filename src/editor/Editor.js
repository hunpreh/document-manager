import "./Editor.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Layout, Row, Col, Tooltip, Button, Input, Tag } from "antd";
import { FileTextOutlined, SaveOutlined } from "@ant-design/icons";

const { Header } = Layout;

const EditorCK = (props) => {
  const [editr, setEditor] = useState(null);
  const [content, setContent] = useState("<p>Cargando...</p>");

  const saveHandler = (props) => {
    console.log("Guardar", editr.getData());
  };

  const button = <Button onClick={saveHandler}>Guardar</Button>;

  return (
    <div>
      <Header className="editor_header">
        <Row>
          <Col flex="50px" align="center">
            <Link to="/documentos">
              <Tooltip
                title="Regresar a Documentos"
                placement="bottomLeft"
                color="blue"
              >
                <Button
                  type="text"
                  icon={<FileTextOutlined className="editor_logo" />}
                />
              </Tooltip>
            </Link>
          </Col>
          <Col flex={1}>
            <Input placeholder="Titulo del Documento" />
          </Col>
          <Col flex="100px" align="center">
            <Tag color="#108ee9">Nuevo</Tag>
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

      <CKEditor
        onReady={(editor) => {
          console.log("El editor ya esta listo!", editor);
          setContent("<p>Listo</p>");

          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );

          setEditor(editor);
        }}
        onError={(error, { willEditorRestart }) => {
          if (willEditorRestart) {
            editr.ui.view.toolbar.element.remove();
          }
        }}
        //onChange={(event, editor) => console.log(editor.getData())}
        editor={Editor}
        data={content}
      />
    </div>
  );
};

export default EditorCK;
