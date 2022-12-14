import React, { Fragment } from "react";
import { presetPalettes } from "@ant-design/colors";

const ColorPalette = (props) => {
  return (
    <Fragment>
      {Object.values(presetPalettes).map((c) => (
        <button
          key={c.primary}
          id={c.primary}
          className="icon_color_btn grow"
          style={{ backgroundColor: c.primary }}
          onClick={(e) => {
            props.onSelectPrimary(e.target.id);
          }}
        ></button>
      ))}
    </Fragment>
  );
};

export default ColorPalette;
