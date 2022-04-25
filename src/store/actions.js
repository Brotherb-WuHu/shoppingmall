import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  addCart({ state, commit }, payload) {
    // 一般都是返回 promise 好在操作完成之后给反应
    return new Promise((resolve, reject) => {
      // 判断新商品之前存不存在，存在则数量 count +1
      let oldProduct = null;
      for (let item of state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }
      // 通过 oldProduct 有没值来判断：是只 count+1 ，还是添加新商品
      if (oldProduct) {
        // count 不存在？不存在会直接新建属性
        // oldProduct.count += 1;
        commit(ADD_COUNTER, oldProduct);
        reject("添加购物车成功!");
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        commit(ADD_TO_CART, payload);
        resolve("添加购物车成功！");
      }
    });
  },
};
