import "./TreeDirectory.css";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Tree } from "antd";
import {
  onDragEnter,
  onDrop,
  onIcon,
  onAllowDrop,
  updateTreeData,
  titleRender,
} from "./TreeHandlers";
import { getLevels } from "../../firebase/api";
const { DirectoryTree } = Tree;

const TreeDirectory = forwardRef((props, ref) => {
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
          info: null,
        });
      }

      setData(levels);
    };

    process();
  }, []);

  useImperativeHandle(ref, () => ({
    onLoadData,
    setIsEdit,
    setData,
    data,
  }));

  const onLoadData = ({ key }) =>
    new Promise((resolve) => {
      setReload(key);
      setTimeout(() => {
        setReload(false);
        setData((node) =>
          updateTreeData(node, key, [
            {
              title: "Folder Test",
              type: "folder",
              key: `${key}-0`,
              info: null,
            },
            {
              title: "File Test",
              isLeaf: true,
              key: `${key}-1`,
              date: "dic. 19 2022, 10:05:00 am",
              version: 1,
              info: "Modificacion: DD/MM/AAAA HH:MM:SS pm/am Version: #",
            },
          ])
        );
        resolve();
      }, 3000);
    });

  return (
    <DirectoryTree
      rootClassName="tree"
      treeData={data}
      icon={({ data: node, expanded }) => {
          return onIcon(node, expanded, reload);
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
      draggable={!isEdit}
      titleRender={(node) => titleRender(node, isEdit, ref)}
      expandAction={isEdit ? "false" : "doubleClick"}
      fieldNames={{ title: "info" }}
    />
  );
});

export default TreeDirectory;
