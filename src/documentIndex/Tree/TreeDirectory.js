import "../DocumentsIndex.css";
import React, { Fragment, useState } from "react";
import { Tree, Tooltip } from "antd";
import { getCustomIcon, getIconFolder } from "../../assets/icons";
import { isOld } from "../../services/dateService";

const data = [
  {
    key: 1,
    title: "NIVEL 1 - INFORMACION GENERAL",
    type: "nivel",
    customIcon: {
      num: 1,
      color: "#F5222D",
    },
    children: [
      {
        key: 12,
        title: "CARPETA 1",
        type: "folder",
        date: "dic. 13 2022, 10:05:00 am",
        children: [
          {
            key: 121,
            title: "ARCHIVO 1",
            isLeaf: true,
            date: "dic. 09 2022, 10:05:00 am",
          },
          {
            key: 122,
            title: "ARCHIVO 2",
            isLeaf: true,
            date: "dic. 19 2022, 10:05:00 am",
          },
        ],
      },
      {
        key: 13,
        title: "CARPETA 2",
        type: "folder",
        date: "dic. 13 2022, 10:05:00 am",
      },
    ],
  },
  {
    key: 2,
    title: "NIVEL 2 - HACCP",
    type: "nivel",
    customIcon: {
      num: 11,
      color: "#52C41A",
    },
    children: [
      {
        key: 22,
        title: "CARPETA 3",
        type: "folder",
        date: "dic. 13 2022, 10:05:00 am",
        children: [
          {
            key: 221,
            title: "ARCHIVO 3",
            isLeaf: true,
            date: "dic. 13 2020, 10:05:00 am",
          },
          {
            key: 222,
            title: "ARCHIVO 4",
            isLeaf: true,
            date: "dic. 15 2022, 10:05:00 am",
          },
        ],
      },
    ],
  },
];

const TreeDirectory = (props) => {
  const [gData, setGData] = useState(data);

  const onDragEnter = (info) => {
    console.log(info);
  };

  const onDrop = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };

  return (
    <Fragment>
      <Tree.DirectoryTree
        rootClassName="tree"
        icon={({ data: node, expanded }) => {
          let icon;
          if (node.type === "nivel") {
            icon = getCustomIcon(node.customIcon.num, node.customIcon.color);
          } else {
            icon = getIconFolder(node.isLeaf, isOld(node.date), expanded);
          }
          return icon;
        }}
        onRightClick={({ node }) => {
          props.onSelectedNode(node);
        }}
        draggable
        expandAction={"doubleClick"}
        // titleRender={(node) => <Tooltip placement="bottom" title={`Info de ${node.title}`}>{node.title}</Tooltip>}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
        allowDrop={({ dragNode, dropNode, dropPosition }) => {
          if (dragNode.type === "nivel") return false;
          else if (
            dropNode.type === "folder" &&
            dropPosition === 0 &&
            dragNode.isLeaf
          )
            return true;
          else if (
            dropNode.type === "nivel" &&
            dropPosition === 0 &&
            dragNode.type === "folder"
          )
            return true;
        }}
      />
    </Fragment>
  );
};
export default TreeDirectory;
