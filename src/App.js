import { Switch, Route, Redirect } from "react-router-dom";

import AppLayout from "./layout/layout";
import DocumentIndex from "./documentIndex/DocumentIndex";
import EditorCK from "./editor/Editor";

function App() {
  return (
    <Switch>
        <AppLayout>
          <Route path="/" exact>
            <Redirect to="/documentos" />
          </Route>
          <Route path="/documentos">
            <DocumentIndex />
          </Route>
          <Route path="/ckeditor">
            <EditorCK />
          </Route>
        </AppLayout>
      </Switch>
  );
}

export default App;