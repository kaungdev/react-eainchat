import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import localforage from "localforage";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "secondary"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class MyAppBar extends Component {
  state = { token: "", left: false };

  async componentDidMount() {
    const token = await localforage.getItem("auth:token");
    this.setState({ token });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="inherit">
          <Drawer
            open={this.state.left}
            onClose={this.toggleDrawer("left", false)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("left", false)}
              onKeyDown={this.toggleDrawer("left", false)}
            >
              <Link to="/points">
                <ListItem button>
                  <ListItemText primary="Points" />
                </ListItem>
              </Link>
              <Link to="/orders">
                <ListItem button>
                  <ListItemText primary="Orders" />
                </ListItem>
              </Link>
              <Link to="/">
                <ListItem button>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <Link to="/setup">
                <ListItem button>
                  <ListItemText primary="Edit Information" />
                </ListItem>
              </Link>
              <Link to="/login">
                <ListItem button>
                  <ListItemText primary="Log out" />
                </ListItem>
              </Link>
            </div>
          </Drawer>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                color="secondary"
                aria-label="Open drawer"
                onClick={() => this.setState({ left: true })}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Button color="secondary">EainChat</Button>
              </Link>
            </Hidden>
            <Typography
              className={classes.title}
              variant="h6"
              color="secondary"
              noWrap
            >
              <Link to="/">
                <Typography>EainChat</Typography>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            {this.props.children}
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid container>
          <Grid item xs={12} style={{ padding: 12 }}>
            <hr />
            <Typography>
              Copyright © 2019 EainChat App. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MyAppBar);
