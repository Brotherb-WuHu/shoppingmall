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
  right: 15px;
  bottom: 80px;
}
.back-top img {
  width: 60px;
  height: 60px;
}
</style>