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
import Cart from "./pages/Cart";
import Setup from "./pages/Setup";

class App extends Component {
  componentDidMount() {}

  render() {
    const routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/setup" exact component={Setup} />
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
