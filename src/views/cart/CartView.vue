<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar>
      <template #center>购物车({{ length }})</template>
    </nav-bar>
    <scroll class="cartContent" ref="scroll">
      <!-- 商品列表 -->
      <cart-list :cartList="list" />
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar> </cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "CartView",
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar,
  },

  computed: {
    // 1.数组风格
    // ...mapGetters(["cartLength", "cartList"]),
    // 2.对象风格,可以重命名使用
    ...mapGetters({ length: "cartLength", list: "cartList" }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
.cartContent {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 94px;
  left: 0;
  right: 0;
}
</style>