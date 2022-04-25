<template>
  <div id="DetailNavBar">
    <nav-bar>
      <template #left>
        <div @click="backClick">
          <img class="backimg" src="@/assets/img/common/back.svg" />
        </div>
      </template>
      <template #center>
        <div class="title-center">
          <div
            class="title-item"
            v-for="(item, index) in titles"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style  scoped>
.active {
  color: var(--color-high-text);
}
.title-center {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.backimg {
  margin-top: 12px;
}
</style>>

