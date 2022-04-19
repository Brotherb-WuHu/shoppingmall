<template>
  <div class="goods">
    <!-- goods.list 里面是 一堆小对象，每个小组件与每个小对象对应起来 -->
    <goods-item v-for="(item, index) in goods" :key="index" :goods-item="item">
    </goods-item>
  </div>
</template>

<script>
import goodsItem from "@/components/content/goods/goodsItem";

export default {
  name: "goods",
  components: {
    goodsItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>