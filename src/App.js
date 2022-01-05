import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Index from "./views/Index";
import Sender from "./views/Sender";
import Settings from "./views/Settings";


const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/sender" component={Sender} exact />
          <Route path="/settings" component={Settings} exact />
        </Switch>
      </Router>
    </div>
  );
};
export default App;