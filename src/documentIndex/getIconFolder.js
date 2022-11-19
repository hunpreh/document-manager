import "./DocumentsIndex.css"
import React from "react";
import { FolderFilled, FolderOpenFilled, FileFilled, PieChartOutlined } from "@ant-design/icons";

function getIconFolder(type, expanded, date, isLeaf) {
  if(type === "nivel") return <PieChartOutlined className={"nivel"}/>
  if(type === "folder"){
    if(expanded) return <FolderOpenFilled className={"folder"}/>
    return <FolderFilled className={"folder"}/>
  }
  else if(isLeaf){
    return <FileFilled className={`${date}`}/>
  } else {
    return <FileFilled/>
  }
}

export default getIconFolder;
