// @ts-nocheck
import { createStore } from "vuex";

import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

const state = {
  // 数组里面放对象
  cartList: [],
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
