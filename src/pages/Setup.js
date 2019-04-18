import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import localforage from "localforage";

import api from "../utilities/api";
import helpers from "../utilities/helpers";

export default class Setup extends Component {
  state = {
    form: {},
    user: null
  };

  async componentDidMount() {
    const user = await helpers.getUser();
    this.setState({ user });
  }

  changeHandler = name => event => {
    event.persist();
    this.setState(prevState => ({
      form: { ...prevState.form, [name]: event.target.value }
    }));
  };

  submit = async () => {
    const { data, status } = await api.putUser({
      token: this.state.user.token,
      payload: { ...this.state.form }
    });
    if (status !== "success") return;
    await localforage.setItem("user", data.user);
    this.props.history.push("/");
  };

  render() {
    return (
      <Grid container style={{ marginBottom: "60vh" }}>
        <Grid item xs={12}>
          <TextField
            label="Address"
            onChange={this.changeHandler("address")}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            onChange={this.changeHandler("phone")}
            fullWidth
          />
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Button variant="contained" color="secondary" onClick={this.submit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}
