import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import helpers from "../utilities/helpers";

export default class Orders extends Component {
  state = {
    user: {
      requestedOrders: [],
      receivedOrders: []
    }
  };

  async componentDidMount() {
    const user = await helpers.getUser();
    this.setState({ user }, () => {
      console.log("TCL: Orders -> componentDidMount -> user", user);
    });
  }

  openDetails = order => {};

  renderOrders = ({ orders }) => {
    console.log("TCL: orders", orders);
    return orders.map((order, i) => {
      return (
        <Grid item xs={12} key={i} style={{ marginTop: 8 }}>
          <Card style={{ minHeight: 100 }}>
            <CardContent>
              <Grid container>
                <Grid
                  item
                  xs={3}
                  style={{ paddingTop: "auto", paddingBottom: "auto" }}
                >
                  <Grid container>
                    <img
                      src={helpers.getImageUrl(order.meal.image)}
                      alt="meal"
                      style={{
                        height: 90,
                        objectFit: "contain",
                        width: "100%"
                      }}
                    />
                  </Grid>
                  <Grid container>
                    <Button
                      size="small"
                      variant="outlined"
                      style={{ color: "green" }}
                      onClick={() => this.openDetails(order)}
                    >
                      Details
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={8}>
                  <Grid container style={{ marginTop: 12 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {order.meal.name}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Quantity: {order.quantity}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Price: {order.price}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Total Price: {order.totalPrice}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Seller: {order.seller.name}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Customer: {order.customer.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  render() {
    const { requestedOrders, receivedOrders, isCustomer } = this.state.user;
    return (
      <div>
        <Grid container>
          <Typography variant="title">Orders</Typography>
        </Grid>
        <Grid container>
          <Typography variant="subtitle1">
            {isCustomer ? "Your Orders" : "Incoming Orders"}
          </Typography>
        </Grid>
        <Grid container>
          {isCustomer
            ? this.renderOrders({ orders: requestedOrders })
            : this.renderOrders({ orders: receivedOrders })}
        </Grid>
      </div>
    );
  }
}
