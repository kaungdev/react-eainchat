import localforage from "localforage";
import api from "../api";

export default {
  getUser: async () => {
    const { token, isCustomer } = await localforage.getItem("user");
    const { data, status } = await api.getUser({ token });
    if (status !== "success") return false;
    const userToSave = {
      ...data.user,
      isCustomer,
      token
    };
    await localforage.setItem("user", userToSave);
    return userToSave;
  },
  checkIsCustomer: async () => {
    return await localforage.getItem("isCustomer");
  }
};
