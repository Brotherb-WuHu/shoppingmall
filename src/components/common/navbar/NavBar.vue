<template>
  <!-- 不一定只有一个地方用nav，所以这个用 class -->
  <div class="nav-bar">
    <!-- 一般需要左中右布局 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar {
  display: flex;
  flex-direction: row;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
  /* 测试用颜色 */
}
.center {
  /* 直接撑满一行 */
  flex: 1;
  /* 背景颜色不要在这里设置，这是公共组件，每个地方可能都不一样 */
  /* 在home 用的 nav 就在home那里设置 */
}
</style>