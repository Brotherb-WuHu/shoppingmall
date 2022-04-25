<template>
  <div id="app">
    <router-view #="{ Component }">
      <!-- 排除 Detail 原因：不排除会保存物品的iid 不管你点哪个物品，进去都是第一个物品的详情页 -->
      <!-- (可选)排除 cart 原因：刚打开cart页面，BScroll 会记住当前可滚动高度，但是后面添加新商品后，不刷新的话，可滚动区域不变，就会出现滚不动的情况 
      如果不想排除 cart 就要手动 refresh了-->
      <keep-alive exclude="Detail,Cart">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>



<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar.vue";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>
    

<style scoped>
@import "assets/css/base.css";
</style>