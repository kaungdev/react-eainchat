import React, { Component } from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  BrowserRouter as Router
} from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./pages/Home";

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/" exact Component={Home} />
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
