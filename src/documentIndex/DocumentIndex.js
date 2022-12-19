import "./DocumentsIndex.css";
import React, { Fragment, useState, useEffect } from "react";
import { Dropdown } from "antd";

import IconDrawer from "./Drawer/IconDrawer";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import TreeDirectory from "./Tree/TreeDirectory";

// import { getLevels } from "../firebase/api";

const DocumentIndex = () => {
  const [selectedNode, setSelectedNode] = useState();
  const [showDrawer, setShowDrawer] = useState(false);

  // useEffect(() => {
  //   const process = async () => {
  //     getLevels();
  //   };

  //   process();
  // }, []);

  const actions = (
    <DropdownMenu
      node={selectedNode}
      onOpen={() => {
        setShowDrawer(true);
      }}
    />
  );

  return (
    <Fragment>
      <IconDrawer
        onOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
      />
      <Dropdown
        overlay={actions}
        trigger={["contextMenu"]}
        overlayStyle={{ zIndex: 1 }}
      >
        <div>
          <TreeDirectory
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
