// @ts-nocheck
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import lazyPlugin from "vue3-lazy";
import FastClick from "fastclick";
import toast from "./components/common/toast";

// 解决移动端 300ms 延迟
FastClick.attach(document.body);

const app = createApp(App);
app.use(lazyPlugin, {
  loading: require("@/assets/img/common/loading.png"),
  error: require("@/assets/img/common/loading.png"),
});

app.use(store).use(toast).use(router).mount("#app");
