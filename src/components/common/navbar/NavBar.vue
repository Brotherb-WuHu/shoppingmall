<template>
  <!-- 不一定只有一个地方用nav，所以这个用 class -->
  <div class="nav-bar">
    <!-- 一般需要左中右布局 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
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
  height: 44px;
  line-height: 44px;
}
.left,
.right {
  width: 60px;
  /* 测试用颜色 */
}
.center {
  /* 直接撑满一行 */
  flex: 1;

  text-align: center;

  /* 背景颜色不要在这里设置，这是公共组件，每个地方可能都不一样 */
  /* 在home 用的 nav 就在home那里设置 */
}
</style>