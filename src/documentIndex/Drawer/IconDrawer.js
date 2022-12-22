import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { getIcon } from "../../assets/icons";

import useHttp from "../../hooks/use-http";
import { updateIcon } from "../../firebase/api";

import CustomIcon from "./CustomIcon";

const IconDrawer = (props) => {
  const [iColor, setIColor] = useState("#000000");
  const [selectedIcon, setSelectedIcon] = useState();
  const [iconIndex, setIconIndex] = useState(0);
  const { sendRequest: updteIcon, status } = useHttp(updateIcon);

  useEffect(() => {
    try {
      setIconIndex(props.node.customIcon.num);
      setIColor(props.node.customIcon.color);
    } catch (error) {}
  }, [props.onOpen]);

  useEffect(() => {
    const icon = getIcon(iconIndex);
    setSelectedIcon(icon);
  }, [iconIndex]);

  useEffect(() => {
    if (status === "completed") {
      props.onSaveIcon({ color: iColor, num: iconIndex });
      props.onClose();
    }
  }, [status]);

  const saveChanges = () => {
    updteIcon(props.node.id, { color: iColor, num: iconIndex });
  };

  return (
    <Drawer
      title="Personaliza el ícono"
      placement="right"
      onClose={() => {
        props.onClose();
      }}
      open={props.onOpen}
    >
      <CustomIcon
        onChangeColor={(color) => {
          setIColor(color);
        }}
        onSelectIcon={(i) => {
          setIconIndex(i);
        }}
        onSave={saveChanges}
        iconColor={iColor}
        iconSelected={selectedIcon}
      />
    </Drawer>
  );
};

export default IconDrawer;
