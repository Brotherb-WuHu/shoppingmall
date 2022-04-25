<template>
  <div class="toast" v-show="isShow">
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  computed: {},
  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 40px;
  background-color: black;
  opacity: 0.8;
  border-radius: 4px;
  text-align: center;
  line-height: 40px;
  color: white;
  z-index: 100;
}
</style>