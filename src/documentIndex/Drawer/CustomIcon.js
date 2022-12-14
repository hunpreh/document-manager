import "./CustomIcon.css";
import React, { Fragment } from "react";
import { Row, Col, Input, Typography, Button, Divider } from "antd";

import IconList from "./IconList";
import ColorPalette from "./ColorPalette";

const CustomIcon = (props) => {
  const style = {
    fontSize: "100px",
    color: props.iconColor,
  };

  const icon = React.cloneElement(props.iconSelected, { style });

  const selectedIcon = (i) => {
    props.onSelectIcon(i);
  };

  return (
    <Fragment>
      <Row justify="center">
        <Col align="middle">{icon}</Col>
      </Row>
      <Row justify="center">
        <Col align="middle">
          <span className="icon_color_container">
            <input
              type="color"
              className="icon_color_picker"
              value={props.iconColor}
              onChange={(e) => {
                props.onChangeColor(e.target.value);
              }}
            />
            <Input
              bordered={false}
              value={props.iconColor.toUpperCase()}
              onChange={(e) => {
                props.onChangeColor(e.target.value);
              }}
              maxLength={7}
            />
          </span>
        </Col>
      </Row>
      <Row justify="center">
        <Col align="middle">
          <ColorPalette
            onSelectPrimary={(c) => {
              props.onChangeColor(c);
            }}
          />
        </Col>
      </Row>
      <Divider>Lista de íconos</Divider>
      <Row justify="center">
        <div className="icon_list_container">
          <IconList onSelectIcon={selectedIcon} />
        </div>
      </Row>
      <div className="icon_save_btn">
        <Button type="primary" block>
          Guardar cambios
        </Button>
      </div>
    </Fragment>
  );
};

export default CustomIcon;
