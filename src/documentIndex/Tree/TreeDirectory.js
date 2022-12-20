import "./TreeDirectory.css";
import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { onDragEnter, onDrop, onIcon, onAllowDrop } from "./TreeHandlers";
import { getLevels } from "../../firebase/api";

const TreeDirectory = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const process = async () => {
      // Dependiendo del usuario, se regresan los niveles a los que tiene acceso.
      const data = await getLevels();

      const levels = [];
      for (const [key, value] of Object.entries(data)) {
        levels.push({
          id: key,
          key,
          title: value.title,
          type: value.type,
          customIcon: value.customIcon,
        });
      }

      setData(levels);
    };

    process();
  }, []);

  return (
    <Tree.DirectoryTree
      rootClassName="tree"
      treeData={data}
      icon={onIcon}
      onRightClick={({ node }) => {
        props.onSelectedNode(node);
      }}
      expandAction={"doubleClick"}
      allowDrop={onAllowDrop}
      onDragEnter={onDragEnter}
      onDrop={(info) => {
        setData(onDrop(info, data));
      }}
      draggable
    />
  );
};
export default TreeDirectory;
