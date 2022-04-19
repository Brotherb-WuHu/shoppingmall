const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        img: "~assets/img",
        components: "@/components",
        content: "@/components/content",
        common: "@/components/common",
        network: "@/network",
        views: "@/views",
      },
    },
  },
});
