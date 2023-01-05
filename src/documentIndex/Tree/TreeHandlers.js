import { LoadingOutlined } from "@ant-design/icons";
import { getCustomIcon, getIconFolder } from "../../assets/icons";
import { isOld, getCurrentDate } from "../../services/dateService";
import { v4 as uuidV4 } from "uuid";

import TreeInput from "./TreeInput";

export function onDragEnter(info) {
  // console.log(info);
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

export function updateTreeData(list, id, children, newItem = false) {
  const newData = list.map((node) => {
    if (node.id === id) {
      // Para inyectar carpeta o archivo
      if (node.children && newItem) {
        const tmp = [...node.children];
        tmp.push(...children);
        return {
          ...node,
          children: updateTreeData(tmp, id, children),
        };
      } else {
        // Regresa lo que descargue de la BD (reload)
        return {
          ...node,
          children,
        };
      }
    } else if (node.children) {
      // Reiteracion para los nodos hijos
      return {
        ...node,
        children: updateTreeData(node.children, id, children, newItem),
      };
    } else {
      return node;
    }
  });
  return newData;
}

export function titleRender(node, isEdit, ref) {
  const { title, id } = node;
  if (isEdit === id) {
    return (
      <div className="tree_input">
        <TreeInput
          value={`${title.toUpperCase()}`}
          onCancel={() => ref.current.setIsEdit(false)}
          onSave={(value) => {
            onRename(value, isEdit, ref);
          }}
        />
      </div>
    );
  } else {
    return <span>{title.toUpperCase()}</span>;
  }
}

function onRename(value, id, ref) {
  ref.current.setData((node) => updateTitle(node, id, value.title));
  ref.current.setIsEdit(false);
}

export function onCreateFolder(id, ref) {
  const newid = uuidV4();
  ref.current.setData((node) =>
    updateTreeData(
      node,
      id,
      [
        {
          title: "Nueva carpeta",
          type: "folder",
          category: "general",
          key: newid,
          id: newid,
          info: null,
        },
      ],
      true
    )
  );
}

export function onCreateFile(id, ref) {
  const newid = uuidV4();
  const date = getCurrentDate()
  ref.current.setData((node) =>
    updateTreeData(
      node,
      id,
      [
        {
          title: "Nuevo archivo",
          isLeaf: true,
          key: newid,
          id: newid,
          date: date,
          version: 1,
          info: `Modificacion: ${date} Version: 1`,
        },
      ],
      true
    )
  );
}

export function updateTitle(list, id, title) {
  const newData = list.map((node) => {
    if (node.id === id) {
      return { ...node, title };
    } else if (node.children) {
      return {
        ...node,
        children: updateTitle(node.children, id, title),
      };
    } else {
      return node;
    }
  });
  return newData;
}

export function onDelete(list, id) {
  const data = [...list];
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

  // let deletedNode;
  loop(data, id, (item, index, arr) => {
    arr.splice(index, 1);
    // deletedNode = item;
  });

  return data;
}
