import { Switch, Route, Redirect } from "react-router-dom";

import AppLayout from "./layout/layout";
import DocumentIndex from "./documentIndex/DocumentIndex";

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
        </AppLayout>
      </Switch>
  );
}

export default App;
