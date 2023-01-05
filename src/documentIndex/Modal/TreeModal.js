import "./TreeModal.css"
import { Modal, Tabs } from "antd";
import React, { useState, useEffect } from "react";

import GeneralOptions from "./GeneralOptions";
import SecurityPermissions from "./SecurityPermissions";
import ReferenceDocs from "./ReferenceDocs/ReferenceDocs";

const TreeModal = (props) => {
  const [title, setTitle] = useState();
  const [isLeaf, setLeaf] = useState();
  const [option, setOption] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    try {
      setTitle(props.node.title);
      setLeaf(props.node.isLeaf);
      setCategory(props.node.category)
      if (props.onOpen === "referencia") setOption(true);
    } catch (error) {}
  }, [props.onOpen]);

  return (
    <Modal
      title={option ? `Documentos de referencia de "${title}"` : `Propiedades de "${title}"`}
      open={props.onOpen}
      width={620}
      bodyStyle={{
        paddingTop: 0,
        maxHeight: "450px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      onCancel={() => {
        props.onCloseModal(false);
        setOption(false);
      }}
      destroyOnClose
      footer={null}
    >
      {isLeaf && option && <ReferenceDocs />}
      {!option && (
        <Tabs>
          {!isLeaf && (
            <Tabs.TabPane tab="Categoria" key="1">
              <GeneralOptions category={category} />
            </Tabs.TabPane>
          )}
          <Tabs.TabPane tab="Seguridad" key="2">
            <SecurityPermissions />
          </Tabs.TabPane>
        </Tabs>
      )}
    </Modal>
  );
};
export default TreeModal;
