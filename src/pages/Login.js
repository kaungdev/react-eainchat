import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FacebookLogin from "react-facebook-login";
import localforage from "localforage";

import api from "../utilities/api";

export default class Login extends Component {
  state = {
    isLoginAsCustomer: true
  };

  facebookResponseHandler = async fbResponse => {
    console.log("TCL: Login -> fbResponse", fbResponse);
    if (!fbResponse.accessToken) return;
    const authResponse = await api.postAuth({
      accessToken: fbResponse.accessToken
    });
    const token = authResponse.data.token;
    const userResponse = await api.getUser({ token });
    console.log("TCL: Login -> userResponse", userResponse);
    const userToSave = {
      token,
      ...userResponse.data.user,
      isCustomer: this.state.isLoginAsCustomer
    };
    await localforage.setItem("user", userToSave);
    if (!userToSave.isCompleteSetup) {
      this.props.history.push("/setup");
    } else {
      this.props.history.push("/");
    }
  };

  handleCheckBox = () => event => {
    event.persist();
    this.setState({ isLoginAsCustomer: event.target.checked });
  };

  render() {
    return (
      <div>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ marginBottom: "60vh" }}
        >
          <Grid container alignItems="center">
            <Checkbox
              value="isLoginAsCustomer"
              checked={this.state.isLoginAsCustomer}
              onChange={this.handleCheckBox()}
            />
            <Typography>Login as Customer</Typography>
          </Grid>
          <Grid container>
            <FacebookLogin
              appId="384732675712100"
              fields="name,email,picture"
              callback={this.facebookResponseHandler}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
