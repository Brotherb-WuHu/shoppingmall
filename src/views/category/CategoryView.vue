<template>
  <div>
    <h2>CategoryView</h2>
    <div></div>
  </div>
</template>

<script>
// 后面都会对第三方库进行封装，防止它不更新带来的影响
import BScroll from "better-scroll";
export default {
  name: "CategoryView",
  data() {
    return {
      scroll: null,
    };
  },
  destroyed() {
    console.log("category被销毁啦");
  },
  mounted() {},
};
</script>

<style>
</style>