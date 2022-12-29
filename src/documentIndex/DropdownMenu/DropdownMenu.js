import React, { useState, useCallback } from "react";
import { Menu, Popconfirm } from "antd";
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

const DropdownMenu = (props) => {
  const { title, type, isLeaf } = props.node;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
    if (key === "personalizar") props.onOpenDrawer();
    if (key === "actualizar") props.onReload();
    if (key === "renombrar") props.onEdit();
    if (key === "carpeta") props.onCreateFolder();
    if (key === "eliminar") onShowPopconfirm();
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.onDelete()
      onShowPopconfirm();
      setConfirmLoading(false);
    }, 2000);
  };

  const onShowPopconfirm = useCallback(() => {
    setOpen((show) => !show);
  }, []);

  return (
    <Popconfirm
      icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
      title={`¿Estás seguro que quieres eliminar ${title}?`}
      placement="topLeft"
      open={open}
      okText="Eliminar"
      cancelText="Cancelar"
      onConfirm={handleOk}
      okButtonProps={{
        type: "danger",
        loading: confirmLoading,
      }}
      onCancel={onShowPopconfirm}
    >
      <Menu items={items} onClick={onClickHandler} />
    </Popconfirm>
  );
};

export default DropdownMenu;
