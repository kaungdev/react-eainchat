export default {
  bulildCloudinaryData: ({ data, file }) => {
    console.log("TCL: data, file", data, file);
    const { cloudinaryApiKey, signature, timestamp, folder } = data;
    const formData = new FormData();
    formData.append("api_key", cloudinaryApiKey);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("file", file);
    formData.append("folder", folder);
    return formData;
  },

  openSnackbar: ({ message, that }) => {
    that.setState({ isSnackbar: true, snackbarMessage: message });
    setTimeout(() => {
      that.setState({ isSnackbar: false });
    }, 3000);
  },

  getImageUrl: image => {
    if (image) {
      return (
        "https://res.cloudinary.com/kaungsorcerer/image/upload/v1555630425/" +
        image
      );
    }
    return "https://www.holsterfashion.co.za/wp-content/themes/claue/assets/images/placeholder.png";
  }
};
