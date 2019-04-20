import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Points from "./pages/Points";
import Setup from "./pages/Setup";

class App extends Component {
  componentDidMount() {}

  render() {
    const routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/setup" exact component={Setup} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/points" exact component={Points} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Router>
          <Layout>{routes}</Layout>
        </Router>
      </div>
    );
  }
}

export default App;
