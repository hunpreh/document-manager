import React, { useState, useEffect, useCallback } from "react";
import { Menu, Popconfirm } from "antd";
import {
  InfoCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  ReloadOutlined,
  PlusCircleTwoTone,
  PrinterTwoTone,
  QuestionCircleTwoTone,
  FileTwoTone,
  FolderTwoTone,
  SettingTwoTone,
  TrademarkCircleTwoTone,
} from "@ant-design/icons";

const DropdownMenu = ({
  node = {},
  onOpenDrawer = () => {},
  onOpenModal = () => {},
  onEdit = () => {},
  onReload = () => {},
  onCreateFolder = () => {},
  onCreateFile = () => {},
  onDelete = () => {},
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState(node.title);
  const [type, setType] = useState(node.type);

  useEffect(() => {
    setTitle(node.title);
    setType(node.isLeaf ? "file" : node.type);
  }, [node]);

  const options = [
    {
      key: "personalizar",
      icon: <SettingTwoTone />,
      label: `Personalizar "${title}"`,
      type: ["nivel"],
    },
    {
      key: "referencia",
      icon: <InfoCircleTwoTone />,
      label: `Documentos de referencia de "${title}"`,
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
      key: "editar",
      icon: <EditTwoTone />,
      label: "Editar",
      type: ["file"],
    },
    {
      key: "renombrar",
      icon: <TrademarkCircleTwoTone />,
      label: "Renombrar",
      type: ["nivel", "folder", "file"],
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
      label: `Eliminar "${title}"`,
      type: ["nivel", "folder", "file"],
    },
  ];

  const items = options.filter((i) => i.type.some((t) => t === type));

  if (type === "folder") {
    items[1].children.push({
      key: "documento",
      icon: <FileTwoTone />,
      label: "Documento",
    });
  }

  const onClickHandler = ({ key }) => {
    console.log("Click en:", key);
    if (key === "personalizar") onOpenDrawer();
    if (key === "actualizar") onReload();
    if (key === "renombrar") onEdit();
    if (key === "carpeta") onCreateFolder();
    if (key === "documento") onCreateFile();
    if (key === "propiedades") onOpenModal("propiedades");
    if (key === "referencia") onOpenModal("referencia");
    if (key === "eliminar") onShowPopconfirm();
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      onDelete();
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
