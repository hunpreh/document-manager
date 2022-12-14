import React, { Fragment } from "react";
import { Button } from "antd";
import { getAllIcons } from "../../assets/icons";

const data = getAllIcons();

const IconList = (props) => {
  return (
    <Fragment>
      {data.map((i, index) => (
        <Button
          icon={i.icon}
          key={index}
          size="large"
          className="icon_list_btn"
          onClick={() => {
            props.onSelectIcon(index);
          }}
        />
      ))}
    </Fragment>
  );
};
export default IconList;
