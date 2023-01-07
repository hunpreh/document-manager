import "./Editor.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import { getCurrentDate } from "../services/dateService";
import { saveDocument, getDocument } from "../firebase/api";
import useHttp from "../hooks/use-http";

import EditorHeader from "./EditorHeader";
import CKEditorComponent from "./CKEditorComponent";

const Editor = () => {
  const [content, setContent] = useState();
  const [version, setVersion] = useState(1);
  const [date, setDate] = useState();
  const [title, setTitle] = useState();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { sendRequest: saveDoc, status: statusSaved } = useHttp(saveDocument);
  const {
    sendRequest: getDoc,
    status: statusGetDoc,
    data,
  } = useHttp(getDocument);

  useEffect(() => {
    const process = async () => {
      const id = location.pathname.split("/").filter((i) => i.length > 32);
      setId(...id);
      setDate(getCurrentDate())
      getDoc(id);
    };

    process();
  }, []);

  useEffect(() => {
    if (statusSaved === "completed") {
      //Modal de redireccion o cerrar ventana o de accion
      console.log("SI SE GUARDO");
    }
  }, [statusSaved]);

  useEffect(() => {
    if (statusGetDoc === "completed") {
      if (data === null) {
        console.log("no data");
      } else {
        console.log("setting");
        setTitle(data.title);
        setVersion(data.version);
        setContent(data.content);
      }
      console.log(data);
      console.log("GETDOC");

      setLoading(false);
    }
  }, [statusGetDoc]);

  const saveHandler = (title) => {
    const documentData = {
      title,
      date,
      version,
      content,
    };
    console.log("Guardar", documentData);
    saveDoc(id, documentData);
  };

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div id="editor_container">
      <EditorHeader
        onSaveHandler={saveHandler}
        version={version}
        title={title}
      />
      <CKEditorComponent
        isNew={!data}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        data={content}
      />
    </div>
  );
};

export default Editor;
