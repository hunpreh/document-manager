import { v4 as uuidV4 } from "uuid";
import { Typography, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getCustomIcon, getIconFolder } from "../../assets/icons";
import { isOld, getCurrentDate } from "../../services/dateService";
import { titleVerify } from "../../utils/regex_validators";

import InputCode from "../Modal/InputCode/InputCode";

const { Paragraph } = Typography;

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
    icon = getCustomIcon(node.customIcon.index, node.customIcon.color);
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
  const { title, id, code, isLeaf } = node;

  const onChangeTitle = (titleStr) => {
    if (titleVerify(titleStr)) {
      ref.current.setData((node) => updateTitle(node, id, titleStr));
      ref.current.setIsEdit(false);
    }
  };

  return (
    <div className="tree_input">
      <Paragraph
        style={{ margin: 0, minWidth: 600 }}
        editable={{
          editing: isEdit === id,
          maxLength: 32,
          triggerType: "text",
          onChange: onChangeTitle,
          onEnd: () => ref.current.setIsEdit(false),
        }}
      >{`${
        isLeaf && !isEdit ? code + " - " : ""
      }${title.toUpperCase()}`}</Paragraph>
    </div>
  );
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
          key: newid,
          id: newid,
          info: "GENERAL",
        },
      ],
      true
    )
  );
  ref.current.setIsEdit(newid);
}

export function onCreateFile(id, ref) {
  const newid = uuidV4();
  const date = getCurrentDate();

  const insertFile = (code = "CODIGO-000") => {
    ref.current.setData((node) =>
      updateTreeData(
        node,
        id,
        [
          {
            title: "Nuevo archivo",
            code: code,
            isLeaf: true,
            key: newid,
            id: newid,
            date: date,
            version: 0,
            info: `Modificación: ${date}\nVersión: 0`,
          },
        ],
        true
      )
    );
    ref.current.setIsEdit(newid);
  };

  Modal.info({
    title: "Introduce el código del documento:",
    content: (
      <InputCode
        onInsertFile={(code) => {
          insertFile(code);
        }}
        onClose={Modal.destroyAll}
      />
    ),
    icon: null,
    closable: true,
    bodyStyle: { padding: "20px 32px 0px" },
    okButtonProps: { style: { display: "none" } },
  });
}

export function onUpdateIcon(icon, node, ref){
  for (const n of ref.current.data) {
    if (n.key === node.key) {
      n.customIcon = icon;
    }
  }
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

export function onUpdateCategory(list, id, info) {
  const newData = list.map((node) => {
    if (node.id === id) {
      return { ...node, info };
    } else if (node.children) {
      return {
        ...node,
        children: onUpdateCategory(node.children, id, info),
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
