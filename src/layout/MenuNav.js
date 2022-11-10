import React from "react";
import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import { FileOutlined, EditOutlined } from "@ant-design/icons";

const MenuNav = () => {
  const history = useHistory();
  function getItem(label, key, icon) {
    return {
      key,
      icon,
      label,
    };
  }
  const items = [
    getItem("Documentos", "/documentos", <FileOutlined />),
    getItem("CKEditor", `/ckeditor`, <EditOutlined />),
  ];

  const onClickHandler = (e) => {
    history.push(`${e.key}`);
  };

  return (
    <Menu theme="dark" mode="inline" items={items} onClick={onClickHandler} />
  );
};

export default MenuNav;
