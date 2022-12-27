import "./DocumentsIndex.css";
import React, { Fragment, useState, useCallback, useRef } from "react";
import { Dropdown } from "antd";

import IconDrawer from "./Drawer/IconDrawer";
import TreeModal from "./Modal/TreeModal";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import TreeDirectory from "./Tree/TreeDirectory";

const DocumentIndex = () => {
  const [selectedNode, setSelectedNode] = useState();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  const onShowDrawer = useCallback(() => {
    setShowDrawer((show) => !show);
  }, []);

  const onShowModal = useCallback(() => {
    setShowModal((show) => !show);
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
