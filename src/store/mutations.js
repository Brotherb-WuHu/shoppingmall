import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    // 添加是否选中属性
    payload.checked = true;
    // 添加其余属性
    state.cartList.push(payload);
  },
};
