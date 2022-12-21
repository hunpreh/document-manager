import "./TreeDirectory.css";
import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import {
  onDragEnter,
  onDrop,
  onIcon,
  onAllowDrop,
  updateTreeData,
} from "./TreeHandlers";
import { getLevels } from "../../firebase/api";

const TreeDirectory = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

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

  const onLoadData = ({ key, children }) =>
    new Promise((resolve) => {
      setLoading(key);
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setData((node) =>
          updateTreeData(node, key, [
            {
              title: "Folder Test",
              type: "folder",
              key: `${key}-0`,
            },
            {
              title: "File Test",
              isLeaf: true,
              key: `${key}-1`,
            },
          ])
        );
        resolve();
      }, 3000);
    });

  return (
    <Tree.DirectoryTree
      rootClassName="tree"
      treeData={data}
      icon={({ data: node, expanded }) => {
        return onIcon(node, expanded, loading);
      }}
      onRightClick={({ node }) => {
        props.onSelectedNode(node);
      }}
      loadData={onLoadData}
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
