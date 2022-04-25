  <!-- goods.list 里面是 一堆小对象，每个小组件与每个小对象对应起来 -->

<template>
  <div class="goods-item" @click="goodsItemClick">
    <a>
      <img v-lazy="showImage" :key="showImage" />
    </a>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // 跳转详情页
  methods: {
    goodsItemClick() {
      this.$emit("goodsItemClick");
    },
  },
  computed: {
    // 首页展示的 good img 路径与详情页的 推荐类别的 img 路径不一样，需要个判断
    showImage() {
      // 当前面为空时，取后面的数据
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>