import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import useHttp from "../../hooks/use-http";
import { updateIcon } from "../../firebase/api";
import { getIcon } from "../../assets/icons";

import CustomIcon from "./CustomIcon/CustomIcon";

const icon = {
  color: "#000000",
  index: 0,
};

const IconDrawer = ({
  node = {},
  onOpen = false,
  onClose = () => {},
  onSaveIcon = () => {},
}) => {
  const { customIcon = icon, id } = node;
  const [color, setColor] = useState(customIcon.color);
  const [index, setIndex] = useState(customIcon.index);
  const [selectedIcon, setSelectedIcon] = useState();
  const { sendRequest: iconUpdate, status } = useHttp(updateIcon);

  useEffect(() => {
    setIndex(customIcon.index);
    setColor(customIcon.color);
  }, [onOpen, customIcon.index, customIcon.color]);

  useEffect(() => {
    const icon = getIcon(index);
    setSelectedIcon(icon);
  }, [index]);

  useEffect(() => {
    if (status === "completed") {
      onSaveIcon({ color, index });
      onClose();
    }
  }, [status]);

  // CHANGE FOR THE REAL API
  const saveChanges = () => {
    iconUpdate(id, { color, index });
  };

  return (
    <Drawer
      title="Personaliza el ícono"
      placement="right"
      onClose={onClose}
      open={onOpen}
    >
      <CustomIcon
        onChangeColor={(color) => {
          setColor(color);
        }}
        onSelectIcon={(i) => {
          setIndex(i);
        }}
        onSave={saveChanges}
        iconColor={color}
        iconIndex={index}
        iconSelected={selectedIcon}
      />
    </Drawer>
  );
};

export default IconDrawer;
