<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActived">
      <slot name="itemIcon"></slot>
    </div>
    <div v-else>
      <slot name="itemIconActived"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="itemText"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActived: true,
    };
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActived() {
      // $route 当前活跃状态的路由
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActived ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;

  font-size: 14px;
  margin-top: 3px;

  /* 图片下方会自带空间，希望自己设置margin-bottom，用这个去掉 */
  vertical-align: middle;

  margin-bottom: 2px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
}

.active {
  color: pink;
}
</style>