import "./Editor.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Layout, Row, Col, Tooltip, Button, Input, Tag } from "antd";
import { FileTextOutlined, SaveOutlined } from "@ant-design/icons";
import { saveDocument } from "../firebase/api";
//import useHttp from "../hooks/use-http";

const { Header } = Layout;

const EditorCK = (props) => {
  const [editr, setEditor] = useState(null);
  const [content, setContent] = useState("<p>Cargando...</p>");
  const [version, setVersion] = useState("1.0");
  const [date, setDate] = useState()
  const [title, setTitle] = useState()

  //const { sendRequest, status } = useHttp(saveDocument);
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const id = pathSnippets.slice(1, 2)[0];

  // useEffect(() => {
  //   if (status === "completed") {
  //     console.log("SI SE GUARDO")
  //   }
  // }, [status, history]);

  const saveHandler = () => {
    const content = editr.getData();

    const documentData = {
      title,
      date,
      version,
      content,
    };

    console.log("Guardar", documentData);
    saveDocument(id, documentData);
    //onAddQuote({ author: enteredAuthor, text: enteredText });
  };

  const getCurrentDate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    if (month < 10) {
      setDate(`${day}-0${month}-${year}`);
    } else {
      setDate(`${day}-${month}-${year}`);
    } // DD-MM-YYYY
  };

  return (
    <div id="editor_container">
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
            <Input placeholder="Titulo del Documento" maxLength={32} onChange={(t) => setTitle(t.target.value)}/>
          </Col>
          <Col flex="100px" align="center">
            <Tag color="#108ee9">Version {version}</Tag>
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
          getCurrentDate();

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
        editor={Editor}
        data={content}
      />
    </div>
  );
};

export default EditorCK;
