import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import helpers from "../utilities/helpers";

const availablePointPacks = [
  { points: 1000, money: 9000, save: 1000 },
  { points: 500, money: 4500, save: 500 },
  { points: 100, money: 900, save: 100 }
];

export default class Points extends Component {
  state = {
    user: { points: 0 },
    isOpenDialog: false,
    pointPack: { points: 1000, money: 9000, save: 1000 }
  };

  async componentDidMount() {
    const user = await helpers.getUser();
    this.setState({ user }, () => {
      console.log(user);
    });
  }

  onBuyPoints = pack => () => {
    this.setState({
      isOpenDialog: true,
      pointPack: pack
    });
  };

  renderPointPacks = availablePointPacks => {
    return availablePointPacks.map(pack => {
      return (
        <div style={{ marginRight: 16 }} key={pack.points}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={this.onBuyPoints(pack)}
          >
            {pack.points}
          </Button>
        </div>
      );
    });
  };

  closeDialog = () => {
    this.setState({ isOpenDialog: false });
  };

  renderDialog = () => {
    const { pointPack } = this.state;
    return (
      <Dialog
        open={this.state.isOpenDialog}
        onClose={this.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Point Prices"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Buy ${pointPack.points} points with ${pointPack.money}. Save ${
              pointPack.save
            } Kyats. In order to buy points, please transfer ${
              pointPack.money
            } Kyats to 0000 1111 2222 3333 Bank Account and send the receipt photo.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { points } = this.state.user;
    return (
      <div>
        {this.renderDialog()}
        <Grid container>
          <Typography variant="title">Points</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          {this.renderPointPacks(availablePointPacks)}
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          <Grid item xs={4}>
            <Typography>Your Points: </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{points.toLocaleString() + " points"}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
