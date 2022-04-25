<template>
  <div class="tab-control">
    <!-- 这个项目的选项卡只是文字不一样,数量不一样,所以不用slot更快速 -->
    <!-- 对比 nav 不只是文字不一样，而且选项数量和按钮都不一样 -->
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 要实现点击切换，要把事件传到外面的组件(HomeView)去
    itemClick(index) {
      // 把点击的 index 赋值给当前 的 currentIndex 实现 点击变色
      // 再把 index 发送出去方便其他操作
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>