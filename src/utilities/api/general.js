import axios from "axios";

import { getBaseUrl } from "./url";

export default {
  getCloudinary: async () => {
    const response = await axios.get(
      getBaseUrl() + "/api/general/cloudinary_signature"
    );
    return response.data;
  },

  postCloudinaryImage: async ({ uploadUrl, formData }) => {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    return response.data;
  }
};
