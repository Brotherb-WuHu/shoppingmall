const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        content: "@/components/content",
        common: "@/components/common",
        network: "@/network",
        views: "@/views",
      },
    },
  },
});
