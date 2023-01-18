import "./CustomIcon.css";
import React, { Fragment } from "react";
import { Input, Button, Divider } from "antd";

import IconList from "./IconList/IconList";
import ColorPalette from "./ColorPalette/ColorPalette";

const CustomIcon = ({
  iconSelected,
  iconColor,
  iconIndex,
  onSave = () => {},
  onChangeColor = () => {},
  onSelectIcon = () => {},
}) => {
  const style = {
    fontSize: "100px",
    color: iconColor,
  };

  const icon = React.cloneElement(iconSelected, { style });

  return (
    <Fragment>
      <div className="center">{icon}</div>
      <div className="center">
        <span className="icon_color_container">
          <input
            type="color"
            className="icon_color_picker"
            value={iconColor}
            onChange={({ target }) => {
              onChangeColor(target.value);
            }}
          />
          <Input
            bordered={false}
            value={iconColor.toUpperCase()}
            onChange={({ target }) => {
              onChangeColor(target.value);
            }}
            maxLength={7}
          />
        </span>
      </div>
      <div className="center">
        <ColorPalette
          onSelectPrimary={(c) => {
            onChangeColor(c);
          }}
          color={iconColor}
        />
      </div>
      <Divider>Lista de íconos</Divider>
      <div className="center">
        <IconList
          onSelectIcon={(i) => {
            onSelectIcon(i);
          }}
          index={iconIndex}
        />
      </div>
      <div className="icon_save_btn">
        <Button
          block
          type="primary"
          onClick={() => {
            onSave();
          }}
        >
          Guardar cambios
        </Button>
      </div>
    </Fragment>
  );
};

export default CustomIcon;
