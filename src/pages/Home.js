import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Modal from "@material-ui/core/Modal";

import DropZone from "../components/DropZone";
import helpers from "../utilities/helpers";
import api from "../utilities/api";

const defaultForm = {
  name: "",
  description: "",
  meat: "",
  category: "",
  price: ""
};

export default class Home extends Component {
  state = {
    user: {
      isCustomer: true
    },
    form: { ...defaultForm },
    isShowForm: !false,
    publicId: "",
    imageTempUrl: ""
  };

  async componentDidMount() {
    const user = await helpers.getUser();
    this.setState({ user });
  }

  createNewMeal = () => {
    this.setState({
      isShowForm: true,
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

  onDrop = async acceptedFiles => {
    const file = acceptedFiles[0];
    const { status, data } = await api.getCloudinary();
    if (status !== "success") return;
    const { uploadUrl } = data;
    const formData = helpers.bulildCloudinaryData({ data, file });
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const { public_id, secure_url } = await api.postCloudinaryImage({
      formData,
      uploadUrl
    });
    this.setState({
      imageTempUrl: secure_url,
      publicId: public_id
    });
  };

  onPostMeal = () => {
    const payload = { ...this.state.form, image: this.state.publicId };
  };

  renderSeller = () => {
    return (
      <div>
        <Modal open={this.state.isShowForm}>
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
              {this.state.imageTempUrl && (
                <img
                  src={this.state.imageTempUrl}
                  style={{ height: 150, width: "100%", objectFit: "contain" }}
                  alt="useful one"
                />
              )}
              <Button
                variant="outlined"
                size="small"
                style={{ marginTop: 20, marginBottom: 20 }}
                color="secondary"
              >
                <DropZone
                  onDrop={this.onDrop}
                  description={
                    this.state.publicId ? "Change Image" : "Insert Image"
                  }
                />
              </Button>
            </CardContent>
            <CardActions>
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
            <Button onClick={this.createNewMeal} variant="contained">
              Create New Meal
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

  renderCustomer = () => {
    return <div />;
  };

  render() {
    const sellerUi = this.renderSeller();
    const customerUi = this.renderCustomer();
    return <div>{this.state.user.isCustomer ? customerUi : sellerUi}</div>;
  }
}
