import "./DocumentsIndex.css";
import { Dropdown, Tree, Drawer } from "antd";
import React, { Fragment, useState, useEffect, useRef } from "react";
import getIconFolder from "./getIconFolder";
// import customIcon from "./customIcon";
import DropdownMenu from "./DropdownMenu";

// import { getLevels } from "../firebase/api";

const data = [
  {
    key: 1,
    title: "NIVEL 1 - INFORMACION GENERAL",
    type: "nivel",
    children: [
      {
        key: 12,
        title: "CARPETA 1",
        type: "folder",
        children: [
          {
            key: 121,
            title: "ARCHIVO 1",
            isLeaf: true,
            date: "old",
          },
          {
            key: 122,
            title: "ARCHIVO 2",
            isLeaf: true,
            date: "new",
          },
        ],
      },
      {
        key: 13,
        title: "CARPETA 2",
        type: "folder",
      },
    ],
  },
  {
    key: 2,
    title: "NIVEL 2 - HACCP",
    type: "nivel",
    children: [
      {
        key: 22,
        title: "CARPETA 3",
        type: "folder",
        children: [
          {
            key: 221,
            title: "ARCHIVO 3",
            isLeaf: true,
            date: "old",
          },
          {
            key: 222,
            title: "ARCHIVO 4",
            isLeaf: true,
            date: "old",
          },
        ],
      },
    ],
  },
];

const DocumentIndex = () => {
  const [gData, setGData] = useState(data);
  const [selectedNode, setSelectedNode] = useState();
  const [open, setOpen] = useState(false);
  // const colorRef = useRef();

  // useEffect(() => {
  //   const process = async () => {
  //     getLevels();
  //   };

  //   process();
  // }, []);

  // useEffect(() => {
  //   console.log(colorRef);
  // }, [colorRef]);

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

  const onClose = () => {
    setOpen(false);
  };

  const actions = (<DropdownMenu node={selectedNode} />)

  //nivel
  //  Crear carpeta
  //  Actualizar
  //  Renombrar
  //  Eliminar {nombre nivel}

  //carpeta OPCION DE CARPETAS DENTRO DE CARPETAS
  //  Crear carpeta
  //  Crear documento
  //  Pegar ? (solo documento)
  //  Actualizar
  //  Propiedades de {carpeta}
      //  Modal con pesta;as de General y Seguridad (Resize, Close)
      //  General (es como el tipo o categoria de la carpeta)
      //  Radiochecklist General / Registros / Cancelados / Derrogados
      //  Seguridad (es quien tiene acceso a esa carpeta)
      // Son dos tablas, una con usuarios sin acceso, otra con acceso, flechas de pasar todos de un lado a otro o de uno en uno
  //  Renombrar
  //  Eliminar {carpeta}

  //documento CAFE VIEJO, AZUL NUEVO O MODIFICADO RECIENTE DE UNA SEMANA
  //TAG HOVER DE : Modificacion: DD/MM/AAAA HH:MM:SS pm/am Version: #
  // CAMBIA APUNTADOR A MANITA
  //  Documentos de referencia de {documento} ?
  //  Modificar (permiso)
  //  Editar (permiso)
  // Copiar {documento}
  // Solicitar impresion
  // Imprimir (permiso)
  // Eliminar {documento}
  // Propiedades de {documento}
      // Igual que de seguridad, quien tiene acceso al documento.
      // Pero con permiso de sin o con acceso a lectura, escritura y ejecucion ?

  return (
    <Fragment>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Dropdown
        overlay={actions}
        trigger={["contextMenu"]}
        overlayStyle={{ zIndex: 1 }}
      >
        <div id="tree_container">
          <Tree.DirectoryTree
            rootClassName="tree"
            icon={({ data: node, expanded }) => {
              const type = node.type;
              const date = node.date;
              const isLeaf = node.isLeaf;
              const icon = getIconFolder(type, expanded, date, isLeaf);
              return icon;
            }}
            onRightClick={({ node }) => {setSelectedNode(node)}}
            draggable
            blockNode
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
        </div>
      </Dropdown>
    </Fragment>
  );
};
export default DocumentIndex;
