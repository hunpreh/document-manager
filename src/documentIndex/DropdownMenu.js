import React from "react";
// import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  InfoCircleTwoTone,
  EditTwoTone,
  SnippetsTwoTone,
  DeleteTwoTone,
  ReloadOutlined,
  PlusCircleTwoTone,
  PrinterTwoTone,
  QuestionCircleTwoTone,
  CopyTwoTone,
  FileTwoTone,
  FolderTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
// import { v4 as uuidV4 } from "uuid";

const DropdownMenu = (props) => {
  //const history = useHistory();
  const node = props.node;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [];

  if (node.type === "nivel")
    items.push(
      getItem(`Personalizar ${node.title}`, "personalizar", <SettingTwoTone />)
    );
  if (node.isLeaf) {
    items.push(
      getItem(
        `Documentos de referencia de ${node.title}`,
        "referencia",
        <InfoCircleTwoTone />
      ),
      { label: "", key: null, disabled: true }
    );
  } else {
    items.push(
      getItem(
        "Actualizar",
        "actualizar",
        <ReloadOutlined style={{ color: "#2977ff" }} />
      ),
      getItem("Crear", "crear", <PlusCircleTwoTone />, [
        getItem("Carpeta", "carpeta", <FolderTwoTone />),
      ])
    );
  }
  items.push(getItem("Renombrar", "renombrar", <EditTwoTone />));
  if (node.type === "folder") {
    items[1].children.push(getItem("Documento", "creardoc", <FileTwoTone />));
    items.push(getItem("Pegar", "pegar", <SnippetsTwoTone />));
  }
  if (node.isLeaf) {
    items.push(
      getItem("Copiar", "copy", <CopyTwoTone />),
      getItem(`Solicitar impresion`, `solprint`, <PrinterTwoTone />)
    );
  }
  if (node.isLeaf || node.type === "folder") {
    items.push(
      { label: "", key: null, disabled: true },
      getItem("Propiedades", "prop", <QuestionCircleTwoTone />)
    );
  }
  items.push(
    { label: "", key: null, disabled: true },
    getItem(
      `Eliminar ${node.title}`,
      "eliminar",
      <DeleteTwoTone twoToneColor="#eb2f96" />
    )
  );

  const onClickHandler = ({ key }) => {
    console.log("Click en:");
    console.log(key);
    //console.log(props.node);
    //props.node.type nivel folder isLeaf
  };

  return <Menu items={items} onClick={onClickHandler} />;
};

export default DropdownMenu;
