import "./DocumentsIndex.css";
import React, { Fragment, useState, useCallback, useRef } from "react";
import { Dropdown } from "antd";
import { onCreateFolder, onCreateFile, onDelete } from "./Tree/TreeHandlers";

import IconDrawer from "./Drawer/IconDrawer";
import TreeModal from "./Modal/TreeModal";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import TreeDirectory from "./Tree/TreeDirectory";

const nodeStructure = {
  id: "",
  key: "",
  title: "",
  type: "",
  customIcon: {
    color: "#000000",
    index: 0,
  },
  info: "",
  isLeaf: false,
  date: new Date(),
  version: 0,
  children: [
    {
      title: "",
      type: "",
      id: "",
      key: "",
      info: "",
    },
  ],
};

const DocumentIndex = () => {
  const [selectedNode, setSelectedNode] = useState(nodeStructure);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  const onShowDrawer = useCallback(() => {
    setShowDrawer((show) => !show);
  }, []);

  const onShowModal = useCallback((newShow) => {
    setShowModal(newShow);
  }, []);

  const updateIcon = (icon) => {
    for (const n of ref.current.data) {
      if (n.key === selectedNode.key) {
        n.customIcon = icon;
      }
    }
  };

  const actions = (
    <DropdownMenu
      node={selectedNode}
      onOpenDrawer={onShowDrawer}
      onOpenModal={onShowModal}
      onEdit={() => ref.current.setIsEdit(selectedNode.id)}
      onReload={() => ref.current.onLoadData(selectedNode)}
      onCreateFolder={() => onCreateFolder(selectedNode.id, ref)}
      onCreateFile={() => onCreateFile(selectedNode.id, ref)}
      onDelete={() =>
        ref.current.setData((node) => onDelete(node, selectedNode.id))
      }
    />
  );

  return (
    <Fragment>
      <IconDrawer
        onOpen={showDrawer}
        onClose={onShowDrawer}
        node={selectedNode}
        onSaveIcon={updateIcon}
      />
      <TreeModal
        node={selectedNode}
        onOpen={showModal}
        onCloseModal={onShowModal}
      />
      <Dropdown
        overlay={actions}
        trigger={["contextMenu"]}
        overlayStyle={{ zIndex: 1 }}
      >
        <div>
          <TreeDirectory
            ref={ref}
            onSelectedNode={(n) => {
              setSelectedNode(n);
            }}
          />
        </div>
      </Dropdown>
    </Fragment>
  );
};
export default DocumentIndex;
