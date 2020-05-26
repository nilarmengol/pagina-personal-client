import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouterWithSubRouters key={index} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

function RouterWithSubRouters(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
