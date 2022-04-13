<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <template #itemIcon>
        <img src="@/assets/img/tabbar/home.svg" />
      </template>
      <template #itemIconActived>
        <img src="@/assets/img/tabbar/home_active.svg" />
      </template>
      <template #itemText>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <template #itemIcon>
        <img src="@/assets/img/tabbar/category.svg" />
      </template>
      <template #itemIconActived>
        <img src="@/assets/img/tabbar/category_active.svg" />
      </template>
      <template #itemText>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="blue">
      <template #itemIcon>
        <img src="@/assets/img/tabbar/shopcart.svg" />
      </template>
      <template #itemIconActived>
        <img src="@/assets/img/tabbar/shopcart_active.svg" />
      </template>
      <template #itemText>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <template #itemIcon>
        <img src="@/assets/img/tabbar/profile.svg" />
      </template>
      <template #itemIconActived>
        <img src="@/assets/img/tabbar/profile_active.svg" />
      </template>
      <template #itemText>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./TabBar.vue";
import TabBarItem from "./TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>