import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Modal from "@material-ui/core/Modal";
import localforage from "localforage";

import Snackbar from "../components/Snackbar";
import DropZone from "../components/DropZone";
import helpers from "../utilities/helpers";
import api from "../utilities/api";

const defaultForm = {
  name: "",
  description: "",
  meat: "",
  category: "",
  price: "",
  image: "",
  _id: ""
};

export default class Home extends Component {
  state = {
    user: {
      isCustomer: true
    },
    form: { ...defaultForm },
    isShowMealForm: false,
    isShowOrderForm: false,
    isSnackbar: false,
    snackbarMessage: "",
    sellerInfo: {
      meals: []
    },
    orderQuantity: 1,
    orderMeal: null
  };

  async componentDidMount() {
    const user = await helpers.getUser();
    console.log("TCL: Home -> componentDidMount -> user", user);
    this.setState({ user }, cb => {
      console.log(user);
      if (!user.isCustomer) {
        this.doSellerTasks();
      } else {
        this.doCustomerTasks();
      }
    });
  }

  setMealData = data => {
    this.setState({
      sellerInfo: {
        meals: data.meals
      }
    });
  };

  doCustomerTasks = async () => {
    const townshipId = this.state.user.township._id;
    console.log("TCL: doCustomerTasks -> townshipId", townshipId);
    const { data, status } = await api.getMealsByTownship({ townshipId });
    if (status !== "success") return;
    this.setMealData(data);
  };

  doSellerTasks = async () => {
    const { data, status } = await api.getMealsBySeller({
      seller: this.state.user._id
    });
    if (status !== "success") return;
    this.setMealData(data);
  };

  createNewMeal = () => {
    this.setState({
      isShowMealForm: true,
      form: { ...defaultForm }
    });
  };

  handleImage = event => {
    event.persist();
  };

  changeHandler = name => event => {
    event.persist();
    this.setState(prevState => ({
      form: { ...prevState.form, [name]: event.target.value }
    }));
  };

  changeOrderQty = () => event => {
    event.persist();
    this.setState({ orderQuantity: event.target.value });
  };

  onDrop = async acceptedFiles => {
    const file = acceptedFiles[0];
    const { status, data } = await api.getCloudinary();
    if (status !== "success") return;
    const { uploadUrl } = data;
    const formData = helpers.bulildCloudinaryData({ data, file });
    const { public_id } = await api.postCloudinaryImage({
      formData,
      uploadUrl
    });
    this.setState(prevState => ({
      form: { ...prevState.form, image: public_id }
    }));
  };

  onPostMeal = async () => {
    const payload = { ...this.state.form };
    const { token } = this.state.user;
    const { status } = await api.postMeal({ token, payload });
    if (status !== "success") return;
    helpers.openSnackbar({ that: this, message: "Created new meal" });
    this.setState({ isShowMealForm: false });
    this.doSellerTasks();
  };

  renderMeals = ({ meals, type }) => {
    return meals.map((meal, i) => {
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
                      src={helpers.getImageUrl(meal.image)}
                      alt="meal"
                      style={{
                        height: 90,
                        objectFit: "contain",
                        width: "100%"
                      }}
                    />
                  </Grid>
                  <Grid container>
                    {type === "customer" ? (
                      <Button
                        size="small"
                        variant="outlined"
                        style={{ color: "green" }}
                        onClick={() => this.openOrderUi(meal)}
                      >
                        + Order
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => this.onEditMeal(meal)}
                      >
                        Edit
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={8}>
                  <Grid container style={{ marginTop: 12 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {meal.name}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Typography>{meal.description}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Meat: {meal.meat}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>Category: {meal.category}</Typography>
                  </Grid>
                  <Grid container>
                    <Typography>
                      {meal.price} Kyats ({meal.price / 10} points)
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  renderSeller = () => {
    return (
      <div>
        <Modal open={this.state.isShowMealForm}>
          <Card style={{ margin: 20 }}>
            <CardContent>
              <TextField
                value={this.state.form.name}
                onChange={this.changeHandler("name")}
                label="Name"
                fullWidth
              />
              <TextField
                value={this.state.form.description}
                onChange={this.changeHandler("description")}
                label="Description"
                fullWidth
              />
              <TextField
                value={this.state.form.meat}
                onChange={this.changeHandler("meat")}
                label="Meat"
                fullWidth
              />
              <TextField
                value={this.state.form.category}
                onChange={this.changeHandler("category")}
                label="Category"
                fullWidth
              />
              <TextField
                value={this.state.form.price}
                onChange={this.changeHandler("price")}
                label="Price"
                fullWidth
              />
              <img
                src={helpers.getImageUrl(this.state.form.image)}
                style={{
                  height: 150,
                  width: "100%",
                  objectFit: "contain",
                  marginTop: 16
                }}
                alt="useful one"
              />
              <Button
                variant="outlined"
                size="small"
                style={{ marginTop: 16, marginBottom: 16 }}
                color="secondary"
              >
                <DropZone
                  onDrop={this.onDrop}
                  description={
                    this.state.form.image ? "Change Image" : "Insert Image"
                  }
                />
              </Button>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={() => this.setState({ isShowMealForm: false })}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.onPostMeal}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Modal>
        <Grid container>
          <Grid item xs={12}>
            <Button
              onClick={this.createNewMeal}
              variant="contained"
              color="secondary"
            >
              Create New Meal
            </Button>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
        </Grid>
        <Grid container>
          {this.renderMeals({
            meals: this.state.sellerInfo.meals,
            type: "seller"
          })}
        </Grid>
      </div>
    );
  };

  onEditMeal = meal => {
    this.setState({
      form: { ...meal },
      isShowMealForm: true
    });
  };

  openOrderUi = meal => {
    this.setState({
      isShowOrderForm: true,
      orderQuantity: 1,
      orderMeal: meal
    });
  };

  onOrderMeal = async () => {
    const payload = {
      quantity: this.state.orderQuantity,
      meal: this.state.orderMeal._id
    };
    const { token, points } = this.state.user;
    const mealPoints = (payload.quantity * this.state.orderMeal.price) / 10;
    if (mealPoints > points) {
      helpers.openSnackbar({ message: "insufficient points", that: this });
      return;
    }
    const { status, data } = await api.orderMeal({ payload, token });
    const updatedUser = { ...this.state.user, ...data.customer };
    this.updateUser(updatedUser);
    if (status !== "success") return;
    this.setState({ isShowOrderForm: false });
    helpers.openSnackbar({ message: "successfully ordered", that: this });
  };

  updateUser = async updatedUser => {
    this.setState({ user: updatedUser });
    await localforage.setItem("user", updatedUser);
  };

  getCostPoints = () => {
    try {
      const quantity = this.state.orderQuantity;
      const price = this.state.orderMeal.price;
      return (quantity * price) / 10;
    } catch (error) {
      return 0;
    }
  };

  renderCustomer = () => {
    const { points } = this.state.user;
    return (
      <div>
        <Modal open={this.state.isShowOrderForm}>
          <Card style={{ margin: 20 }}>
            <CardContent>
              <TextField
                value={this.state.orderQuantity}
                onChange={this.changeOrderQty()}
                label="Quantity"
                fullWidth
              />
              <div style={{ height: 20 }} />
              <Typography>Available Points: {points}</Typography>
              <Typography>Cost Points: {this.getCostPoints()}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={() => this.setState({ isShowOrderForm: false })}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.onOrderMeal}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Modal>
        <Grid container>
          <Typography variant="title">
            Available meals in your township.
          </Typography>
        </Grid>
        <Grid container style={{ marginTop: 16 }}>
          {this.renderMeals({
            meals: this.state.sellerInfo.meals,
            type: "customer"
          })}
        </Grid>
      </div>
    );
  };

  render() {
    const sellerUi = this.renderSeller();
    const customerUi = this.renderCustomer();
    return (
      <div>
        {this.state.isSnackbar && (
          <Snackbar message={this.state.snackbarMessage} />
        )}
        {this.state.user.isCustomer ? customerUi : sellerUi}
      </div>
    );
  }
}
