import "./DocumentsIndex.css";
import React, { Fragment, useState, useCallback, useRef } from "react";
import { Dropdown } from "antd";

import IconDrawer from "./Drawer/IconDrawer";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import TreeDirectory from "./Tree/TreeDirectory";

const DocumentIndex = () => {
  const [selectedNode, setSelectedNode] = useState();
  const [showDrawer, setShowDrawer] = useState(false);
  const ref = useRef();

  const onShowDrawer = useCallback(() => {
    setShowDrawer((show) => !show);
  }, []);

  const actions = (
    <DropdownMenu
      node={selectedNode}
      onOpen={onShowDrawer}
      onReload={() => ref.current.onLoadData(selectedNode)}
    />
  );

  return (
    <Fragment>
      <IconDrawer
        onOpen={showDrawer}
        onClose={onShowDrawer}
        node={selectedNode}
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
