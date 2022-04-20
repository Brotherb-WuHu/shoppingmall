<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll
      class="detail-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";

import { getDetail, Goods, Shop } from "@/network/details";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
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

      //  下面的数据很分散，建议整合成 类 来操作，在network / detail.js 里面
      // (2)获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // (3)获取商家信息
      this.shop = new Shop(data.shopInfo);

      // (4)获取商品详细信息
      this.detailInfo = data.detailInfo;

      // (5)获取商品参数信息
      // this.paramsInfo = new GoodsParam();
      this.paramsInfo = data;
    });
  },
  methods: {
    // 在 DetailGoodsInfo.vue 里，所有图片加载完才发送事件进行刷新
    // 里面判断图片加载完才发送值得一看
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  /* 为了把底部 导航栏覆盖掉 */
  z-index: 9;
  background-color: #fff;
}

.detail-content {
  overflow: hidden;
  position: absolute;
  /* 下面的我也知道为什么一定要加，不然不生效 */
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
</style>