import React, { Fragment, useState } from "react";
import { message, Upload, Button } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const MAX_MB = 10;
const FILE_TYPES = [".doc", ".docx", ".xls", ".xlsx", ".pdf"];

const DraggerUploader = (props) => {
  const [uploadList, setUploadList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const draggerProps = {
    name: "file",
    multiple: true,
    fileList: uploadList,
    onRemove: (file) => {
      const index = uploadList.map((f) => f.uid).indexOf(file.uid);
      const newFileList = uploadList.slice();
      newFileList.splice(index, 1);
      setUploadList(newFileList);
      return { files: newFileList };
    },
    beforeUpload: (file) => {
      const { name } = file;
      const type = "." + name.split(".").pop();
      if (!new RegExp(FILE_TYPES.join("|"), "i").test(type)) {
        message.warn(`Tipo '${type}' de archivo no permitido`);
        return Upload.LIST_IGNORE;
      }
      // Validate files size
      if (
        MAX_MB * 1000000 <
        uploadList.reduce((a, c) => a + c.size, 0) + file.size
      ) {
        message.warn(`El tamaño de los archivos excede ${MAX_MB} MB`);
        return Upload.LIST_IGNORE;
      }

      setUploadList([...uploadList, file]);
      return false;
    },
  };

  const uploadAnimation = (arr) => {
    let time = 0,
      x = setInterval(function () {
        props.onUpload(
          arr.map((i) => {
            return {
              name: i.name,
              uid: i.uid,
              status: "uploading",
              percent: time,
            };
          })
        );
        ++time;
        if (time === 100) {
          props.onUpload(
            arr.map((i) => {
              return {
                name: i.name,
                uid: i.uid,
                status: "done",
                url: "url or id",
              };
            })
          );
          clearInterval(x);
        }
      }, 10);
  };

  const uploadFiles = () => {
    setUploading(true);
    //API PARA SUBIR EL ARCHIVO A BD Y REGRESA LA URL O ID CON EL QUE SE GUARDO PARA PODER ACCEDER
    uploadAnimation(
      uploadList.map((i) => {
        return { name: i.name, uid: i.uid };
      })
    );
    setUploadList([]);
    setUploading(false);
  };

  return (
    <Fragment>
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Haz click o arrastra tus archivos a esta área para cargarlos al
          sistema.
        </p>
        <p className="ant-upload-hint">
          Archivos permitidos: .doc .docx .xls .xlsx .pdf
        </p>
      </Dragger>
      <Button
        type="primary"
        icon={<UploadOutlined />}
        block
        onClick={uploadFiles}
        disabled={uploadList.length === 0}
        loading={uploading}
        className="upload_btn__modal"
      >
        {uploading ? "Cargando..." : "Subir Archivos"}
      </Button>
    </Fragment>
  );
};

export default DraggerUploader;
