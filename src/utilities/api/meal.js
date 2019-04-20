import axios from "axios";

import { getBaseUrl } from "./url";

export default {
  postMeal: async ({ token, payload }) => {
    const response = await axios.post(getBaseUrl() + "/api/meals", {
      token,
      payload
    });
    return response.data;
  },
  getMealsBySeller: async ({ seller }) => {
    const response = await axios.get(
      getBaseUrl() + "/api/meals?seller=" + seller
    );
    return response.data;
  },
  getMealsByTownship: async ({ townshipId }) => {
    const response = await axios.get(
      getBaseUrl() + "/api/meals?township=" + townshipId
    );
    return response.data;
  },
  orderMeal: async ({ payload, token }) => {
    const response = await axios.post(getBaseUrl() + "/api/orders", {
      token,
      payload
    });
    return response.data;
  }
};
