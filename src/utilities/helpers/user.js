import localforage from "localforage";

export default {
  getUser: async () => {
    return await localforage.getItem("user");
  },
  checkIsCustomer: async () => {
    return await localforage.getItem("isCustomer");
  }
};
