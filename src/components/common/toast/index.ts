// @ts-nocheck
import Toast from "./Toast.vue";
import { createApp } from "vue";

const obj = {};

// 只要 use 这个插件，就会执行 install 这个函数
// 它会默认传入 vue 对象 ，一般叫 vue实例为 app
obj.install = function (app) {
  // 1.创建组件构造器
  const toastConstructor = createApp(Toast);

  // 2.创建组件对象，并挂载到某个元素上面
  const toast = toastConstructor.mount(document.createElement("div"));

  // 3.将挂载的Node添加到body中
  document.body.appendChild(toast.$el);

  // 3.定义全局($toast即是此插件的名称)
  app.config.globalProperties.$toast = toast;
};

export default obj;
