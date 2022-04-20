<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";

import { getDetail, Goods } from "@/network/details";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
    };
  },
  // 千万注意：如果有 keep-alive 则你点其他页面 iid 也不会更新，因为 created 未被执行
  // 记得在 app 用 exclude 排除
  created() {
    // 将当前活跃路由传递的参数接收并保存，忘了的赶快去看笔记
    this.iid = this.$route.params.iid;

    // 2.根据 保存的iid 请求详情数据,并且抽离保存数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // (1) 获取顶部图片轮播图图片
      this.topImages = data.itemInfo.topImages;

      // (2)获取商品信息
      //  这个整合的类在 network / detail 里面
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  },
};
</script>

<style>
</style>