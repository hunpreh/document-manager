import React, { useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CKEditorComponent = ({isNew, ...rest}) => {
  const [editr, setEditor] = useState(null);

  return (
      <CKEditor
        onReady={(editor) => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
          if(isNew) editor.setData("");
          setEditor(editor);
        }}
        onError={(error, { willEditorRestart }) => {
          if (willEditorRestart) {
            editr.ui.view.toolbar.element.remove();
          }
        }}
        editor={Editor}
        {...rest}
      />
  );
};

export default CKEditorComponent;
