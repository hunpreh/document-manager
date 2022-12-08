import "./DocumentsIndex.css"
import React from "react";
import { FolderFilled, FolderOpenFilled, FileFilled, CaretRightFilled, CaretDownFilled } from "@ant-design/icons";

function getIconFolder(type, expanded, date, isLeaf) {
  //if(type === "nivel") return <DropboxCircleFilled className={"nivel"}/>
  if(type === "nivel"){
    if(expanded) return <CaretDownFilled className={type}/>
    return <CaretRightFilled className={type}/>
  }
  else if(type === "folder"){
    if(expanded) return <FolderOpenFilled className={type}/>
    return <FolderFilled className={type}/>
  }
  else if(isLeaf){
    return <FileFilled className={`${date}`}/>
  } else {
    return <FileFilled/>
  }
}

export default getIconFolder;