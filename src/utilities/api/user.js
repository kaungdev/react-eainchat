import axios from "axios";

import { getBaseUrl } from "./url";

export default {
  postAuth: async ({ accessToken }) => {
    const response = await axios.post(getBaseUrl() + "/api/auth", {
      access_token: accessToken
    });
    return response.data;
  },

  getUser: async ({ token }) => {
    const response = await axios.get(getBaseUrl() + "/api/user?token=" + token);
    return response.data;
  },

  putUser: async ({ token, payload }) => {
    const response = await axios.put(getBaseUrl() + "/api/user", {
      token,
      payload
    });
    return response.data;
  }
};
