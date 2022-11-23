import "./Editor.css";
import React, { Component } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

class EditorCK extends Component {
  editor = null;

  render() {
    return (
      <CKEditor
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);

          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );

          this.editor = editor;
        }}
        onError={(error, { willEditorRestart }) => {
          if (willEditorRestart) {
            this.editor.ui.view.toolbar.element.remove();
          }
        }}
        onChange={(event, editor) => console.log({ event, editor })}
        editor={Editor}
        data="<p>Hello from CKEditor 5's decoupled editor!</p>"
      />
    );
  }
}

export default EditorCK;
