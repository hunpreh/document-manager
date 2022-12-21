import { LoadingOutlined } from "@ant-design/icons";
import { getCustomIcon, getIconFolder } from "../../assets/icons";
import { isOld } from "../../services/dateService";

export function onDragEnter(info) {
  console.log(info);
}

export function onDrop(info, gData) {
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split("-");
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

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
      item.children.unshift(dragObj);
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
  return data;
}

export function onIcon(node, expanded, loading) {
  let icon;
  if (node.key === loading) return <LoadingOutlined />;
  if (node.type === "nivel") {
    icon = getCustomIcon(node.customIcon.num, node.customIcon.color);
  } else {
    icon = getIconFolder(node.isLeaf, isOld(node.date), expanded);
  }
  return icon;
}

export function onAllowDrop({ dragNode, dropNode, dropPosition }) {
  if (dragNode.type === "nivel") return false;
  else if (dropNode.type === "folder" && dropPosition === 0 && dragNode.isLeaf)
    return true;
  else if (
    dropNode.type === "nivel" &&
    dropPosition === 0 &&
    dragNode.type === "folder"
  )
    return true;
  else if (
    dropNode.type === "folder" &&
    dropPosition === 0 &&
    dragNode.type === "folder"
  )
    return true;
}

export function updateTreeData(list, key, children) {
  const newData = list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    } else if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    } else {
      return node;
    }
  });
  return newData;
}
