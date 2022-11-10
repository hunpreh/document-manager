import { Switch, Route, Redirect } from "react-router-dom";

import AppLayout from "./layout/layout";

function App() {
  return (
    <Switch>
        <AppLayout>
          <Route path="/" exact>
            <Redirect to="/documentos" />
          </Route>
          <Route path="/documentos">
            <h1>Documentos</h1>
          </Route>
        </AppLayout>
      </Switch>
  );
}

export default App;
