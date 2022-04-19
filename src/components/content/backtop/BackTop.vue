<template>
  <div class="back-top" @click="$emit('BackTopClick')">
    <img src="~assets\img\common\top.png" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  emits: ["BackTopClick"],
};
</script>

<style  scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}
.back-top img {
  width: 43px;
  height: 43px;
}
</style>