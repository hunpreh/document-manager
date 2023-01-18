import React from "react";
import { presetPalettes } from "@ant-design/colors";

const ColorPalette = ({ color, onSelectPrimary = () => {} }) => {
  return (
    <div>
      {Object.values(presetPalettes).map((c) => (
        <button
          key={c.primary}
          id={c.primary}
          className={`icon_color_btn grow ${c.primary === color ? "selected" : ""}`}
          style={{ backgroundColor: c.primary }}
          onClick={({target}) => {
            onSelectPrimary(target.id);
          }}
        ></button>
      ))}
    </div>
  );
};

export default ColorPalette;
