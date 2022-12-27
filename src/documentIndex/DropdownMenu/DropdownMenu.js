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
  const { title, type, isLeaf } = props.node;
  let filterType = type;
  if (isLeaf) filterType = "file";

  const options = [
    {
      key: "personalizar",
      icon: <SettingTwoTone />,
      label: `Personalizar ${title}`,
      type: ["nivel"],
    },
    {
      key: "referencia",
      icon: <InfoCircleTwoTone />,
      label: `Documentos de referencia de ${title}`,
      type: ["file"],
    },
    { label: "", key: null, disabled: true, type: ["nivel", "file"] },
    {
      key: "actualizar",
      icon: <ReloadOutlined style={{ color: "#2977ff" }} />,
      label: "Actualizar",
      type: ["nivel", "folder"],
    },
    {
      key: "crear",
      icon: <PlusCircleTwoTone />,
      label: "Crear",
      type: ["nivel", "folder"],
      children: [
        {
          key: "carpeta",
          icon: <FolderTwoTone />,
          label: "Carpeta",
        },
      ],
    },
    {
      key: "renombrar",
      icon: <EditTwoTone />,
      label: "Renombrar",
      type: ["nivel", "folder", "file"],
    },
    {
      key: "pegar",
      icon: <SnippetsTwoTone />,
      label: "Pegar",
      type: ["folder"],
    },
    {
      key: "copiar",
      icon: <CopyTwoTone />,
      label: "Copiar",
      type: ["file"],
    },
    {
      key: "impresion",
      icon: <PrinterTwoTone />,
      label: "Solicitar impresion",
      type: ["file"],
    },
    {
      key: "propiedades",
      icon: <QuestionCircleTwoTone />,
      label: "Propiedades",
      type: ["folder", "file"],
    },
    { label: "", key: null, disabled: true, type: ["nivel", "folder", "file"] },
    {
      key: "eliminar",
      icon: <DeleteTwoTone twoToneColor="#eb2f96" />,
      label: `Eliminar ${title}`,
      type: ["nivel", "folder", "file"],
    },
  ];

  const items = options.filter((i) => i.type.some((t) => t === filterType));

  if (filterType === "folder") {
    items[1].children.push({
      key: "documento",
      icon: <FileTwoTone />,
      label: "Documento",
    });
  }

  const onClickHandler = ({ key }) => {
    console.log("Click en:", key);
    if(key === "personalizar") props.onOpenDrawer();
    if(key === "actualizar") props.onReload();
    if(key === "renombrar") props.onEdit();
  };

  return <Menu items={items} onClick={onClickHandler} />;
};

export default DropdownMenu;
