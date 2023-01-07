import React, { useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";
import { getImageStorage } from "../firebase/api";

const CKEditorComponent = ({ isNew, ...rest }) => {
  const [editr, setEditor] = useState(null);
  const config = {
    extraPlugins: [uploadPlugin],
  };

  function uploadFile(loader) {
    const storageRef = ref(getImageStorage(), uuidV4());
    return {
      upload: () => {
        return loader.file.then(
          (file) =>
            new Promise((resolve, reject) => {
              uploadBytes(storageRef, file)
                .then((snapshot) => {
                  return getDownloadURL(snapshot.ref);
                })
                .then((downloadURL) => {
                  resolve({
                    default: downloadURL,
                  });
                })
                .catch((error) => {
                  reject(error.message);
                });
            })
        );
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadFile(loader);
    };
  }

  return (
    <CKEditor
      onReady={(editor) => {
        editor.ui
          .getEditableElement()
          .parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
        if (isNew) editor.setData("");
        setEditor(editor);
      }}
      onError={(error, { willEditorRestart }) => {
        if (willEditorRestart) {
          editr.ui.view.toolbar.element.remove();
        }
      }}
      editor={Editor}
      config={config}
      {...rest}
    />
  );
};

export default CKEditorComponent;
