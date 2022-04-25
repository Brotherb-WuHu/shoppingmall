<template>
  <div class="cartList">
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :item-info="item"
    ></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "cartList",
  components: {
    CartListItem,
  },
  props: {
    cartList: {
      type: Array,
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>