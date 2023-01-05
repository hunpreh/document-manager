import React, { Fragment, useState } from "react";
import { Upload, Switch } from "antd";

import { getIconFile } from "../../../assets/icons";

const DocsList = (props) => {
  const [fileView, setFileView] = useState(true);

  return (
    <Fragment>
      <Switch
        className="list_switch__modal"
        defaultChecked={true}
        checkedChildren={"Cuadricula"}
        unCheckedChildren={"Lista"}
        onChange={(checked) => {
          setFileView(checked);
        }}
      />
      <div className="document_list__modal">
        <Upload
          listType={fileView ? "picture-card" : "picture"}
          fileList={props.fileList}
          onDownload={() => {
            console.log("DESCARGA DE DOCUMENTO");
          }}
          onChange={props.onChange}
          iconRender={getIconFile}
          showUploadList={{ showPreviewIcon: false, showDownloadIcon: true }}
        />
      </div>
    </Fragment>
  );
};

export default DocsList;
