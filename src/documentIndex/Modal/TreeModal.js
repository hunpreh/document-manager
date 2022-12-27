import { Modal } from "antd";
import React, { useState } from "react";

const TreeModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      props.onCloseModal();
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      title="Title"
      open={props.onOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={props.onCloseModal}
      width={300}
    >
      <p>{modalText}</p>
    </Modal>
  );
};
export default TreeModal;
