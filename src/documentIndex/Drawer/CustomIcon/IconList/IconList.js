import React from "react";
import { getAllIcons } from "../../../../assets/icons";

const data = getAllIcons();

const IconList = ({ index, onSelectIcon = () => {} }) => {
  return (
    <div className="icon_list_container">
      {data.map((i, indx) => (
        <button
          className={`icon_list_btn grow ${indx === index ? "active" : ""}`}
          key={indx}
          id={indx}
          onClick={() => {
            onSelectIcon(indx);
          }}
        >
          {i.icon}
        </button>
      ))}
    </div>
  );
};
export default IconList;
