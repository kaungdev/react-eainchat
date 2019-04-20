import React, { Component } from "react";
import helpers from "../utilities/helpers";

export default class Orders extends Component {
  async componentDidMount() {
    const user = await helpers.getUser();

    this.setState({ user }, () => {
      console.log(user);
    });
  }

  render() {
    return <div>Orders</div>;
  }
}
