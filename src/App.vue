<template>
  <div id="app">
    <router-view #="{ Component }">
      <keep-alive exclude="Detail">
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