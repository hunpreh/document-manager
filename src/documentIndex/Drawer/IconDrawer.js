import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { getIcon } from "../../assets/icons";

import CustomIcon from "./CustomIcon";

const IconDrawer = (props) => {
  const [iColor, setIColor] = useState("#000000");
  const [selectedIcon, setSelectedIcon] = useState();
  const [iconIndex, setIconIndex] = useState(0);

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
        iconColor={iColor}
        iconSelected={selectedIcon}
      />
    </Drawer>
  );
};

export default IconDrawer;
