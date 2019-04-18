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
  }
};
