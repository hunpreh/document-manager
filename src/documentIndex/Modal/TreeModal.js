import "./TreeModal.css";
import { Modal, Tabs } from "antd";
import React, { useState, useEffect } from "react";

import GeneralOptions from "./GeneralOptions/GeneralOptions";
import SecurityPermissions from "./SecurityPermissions/SecurityPermissions";
import ReferenceDocs from "./ReferenceDocs/ReferenceDocs";

const modalStyle = {
  paddingTop: 0,
  maxHeight: "450px",
  overflowY: "auto",
  overflowX: "hidden",
};

const TreeModal = ({
  node = {},
  onOpen = false,
  onCloseModal = () => {},
  onUpdateCategory = () => {},
}) => {
  const [title, setTitle] = useState();
  const [isLeaf, setLeaf] = useState();
  const [option, setOption] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    setTitle(node.title);
    setLeaf(node.isLeaf);
    setCategory(node.info);
    if (onOpen === "referencia") setOption(true);
  }, [onOpen]);

  return (
    <Modal
      title={
        option
          ? `Documentos de referencia de "${title}"`
          : `Propiedades de "${title}"`
      }
      open={onOpen}
      width={620}
      bodyStyle={modalStyle}
      onCancel={() => {
        onCloseModal(false);
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
              <GeneralOptions
                category={category}
                updateCategory={onUpdateCategory}
                closeModal={() => {
                  onCloseModal(false);
                  setOption(false);
                }}
              />
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
