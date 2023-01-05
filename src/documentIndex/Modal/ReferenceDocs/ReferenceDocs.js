import React, { Fragment, useState } from "react";

import DocsList from "./DocsList";
import DraggerUploader from "./DraggerUploader";

const dummyData = [
  {
    uid: "-1",
    name: "Word.docx",
    status: "done",
  },
  {
    uid: "-2",
    name: "PDF.pdf",
    status: "done",
  },
  {
    uid: "-3",
    name: "Excel.xlsx",
    status: "done",
  },
];

const ReferenceDocs = () => {
  const [fileList, setFileList] = useState(dummyData);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadHandler = (uploadList) => {
    setFileList([...fileList, ...uploadList]);
  };

  return (
    <Fragment>
      <DocsList fileList={fileList} onChange={handleChange}/>
      <DraggerUploader onUpload={uploadHandler} />
    </Fragment>
  );
};

export default ReferenceDocs;
