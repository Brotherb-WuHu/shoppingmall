<template>
  <div class="goods">
    <!-- goods.list 里面是 一堆小对象，每个小组件与每个小对象对应起来 -->
    <goods-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
      @goodsItemClick="goodsItemClick(index)"
    >
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
    // 在 home 传入 this.goods[this.currentType].list 数据
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    goodsItemClick(index) {
      // 最好用 push，这样后面写返回按钮时，用 back 即可
      // 跳转路由传递参数，忘了的看笔记，共三种方式
      this.$router.push("/detail/" + this.goods[index].iid);
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