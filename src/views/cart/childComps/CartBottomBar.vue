<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :checkValue="isSelectAll"
        @checkBtnClick="checkBtnClick"
      />
      <span class="check-content-text">全选</span>
    </div>
    <div class="totalPrice">合计:{{ totalPrice }}</div>
    <div class="calculateBtn" @click="calculateBtn">
      去计算({{ checkedLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/views/cart/childComps/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    // 用 mapGetters 简便获取 cartList
    ...mapGetters(["cartList"]),
    // 计算选中物品的总价格
    totalPrice() {
      // filter(过滤)：filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组、
      // reduce(简化)：遍历每一项，preValue 为上一项 item 为当前项 ，0 为第一次调用的前一项的初始值
      return (
        "￥" +
        this.cartList
          // 过滤：把 checked 为 true 的项抽取出来成新数组
          .filter((item) => {
            return item.checked;
          })
          // 简化：让每一项=每一项价格*数量
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          // 保留两位小数
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      // if (this.cartList.length === 0) return true;
      // else if (this.cartList.filter((item) => !item.checked).length == 0) {
      //   return true;
      // } else {
      //   return false;
      // }
      // 性能优化：只要找到 一个不选中 的即可判断
      // find() 查找第一个符合 fn 的元素，若没有符合的则返回 undefined。此处：若有未选中的返回 false，若无 ！undefined=true
      if (this.cartList.length === 0) return true;
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkBtnClick() {
      // 如果有部分选中，则全部选中。如果全部没选中，则全部选中
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calculateBtn() {
      this.$toast.show("敬请见证", 2000);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 54px;
  position: fixed;
  display: flex;
  bottom: 54px;
  background-color: rgb(250, 246, 246);
  line-height: 40px;
  font-size: 16px;
}
.check-content {
  align-items: center;
  margin-left: 10px;
  width: 60px;
  text-align: center;
}
.check-button {
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
  position: relative;
  left: 10px;
  top: 11px;
}
.check-content-text {
  position: relative;
  left: 20px;
  bottom: 18px;
}

.totalPrice {
  flex: 1;
  margin-left: 30px;
  text-align: center;
}
.calculateBtn {
  width: 90px;
  text-align: center;
  background: rgb(255, 79, 79);
  color: aliceblue;
}
</style>