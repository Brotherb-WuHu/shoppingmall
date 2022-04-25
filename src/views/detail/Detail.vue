<template>
  <div id="detail">
    <toast class="detail-toast" :message="toastMessage"></toast>
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll
      class="detail-content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
      :pull-up-load="true"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="paramInfo" :param-info="paramInfo" />
      <detail-comment-info ref="commentInfo" :comment-info="commentInfo" />
      <h2 class="recommonds-text">更多推荐</h2>
      <goods :goods="recommonds" ref="recommonds" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @BackTopClick="BackTopClick" v-show="ShowBackTop" />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";
import { debounce } from "@/common/utils";

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import goods from "@/components/content/goods/goods";
import Toast from "@/components/common/toast/Toast";

import { backTopMixin } from "@/common/mixin.js";

import { mapActions } from "vuex";

import {
  getDetail,
  getRecommonds,
  Goods,
  Shop,
  GoodsParam,
} from "@/network/details";

export default {
  name: "Detail",
  components: {
    Scroll,
    BackTop,
    Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    goods,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      res: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommonds: [],
      themeTops: [],
      toastMessage: "",
      getThemeTop: null,
      currentIndex: 0,
    };
  },
  // 千万注意：如果有 keep-alive 则你点其他页面 iid 也不会更新，因为 created 未被执行
  // 记得在 app 用 exclude 排除
  created() {
    // 1.将当前活跃路由传递的参数接收并保存。注：点击路由跳转是在 goods和goodsItem 里面
    this.iid = this.$route.params.iid;

    // 2.根据 保存的iid 请求详情数据,并且抽离保存数据
    getDetail(this.iid).then((res) => {
      // (1)取出原始数据并过滤保存
      const data = res.result;
      // (2) 获取顶部图片轮播图图片
      this.topImages = data.itemInfo.topImages;

      // 下面的数据很分散，建议整合成 类 来操作。在network / detail.js 里面定义类
      // (3)获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // (4)获取商家信息
      this.shop = new Shop(data.shopInfo);

      // (5)获取商品详细信息
      this.detailInfo = data.detailInfo;

      // (6)获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // (7)获取评论信息
      // 这个接口详情页只会展示一条评论，而有的没有评论，需要判断
      // 有个更多评论按钮但是没爬里面的信息，所以。。。
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 超重点函数$nextTick( 回调函数 ),当上面的元素都被渲染完时，会回调里面的函数
      // 获取每个组件到Top的高度,为什么不放在 mounted updated 或者直接放在$nextTick外面?因为组件没渲染完,拿不到dom
      /*
      this.$nextTick(() => {
        // Dom已经被渲染,但是!图片没加载完,所以高度还是错的.
        // 需要图片加载完获取，即imageLoad()
        this.themeTops = [];
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.recommonds.$el.offsetTop);
        console.log(this.themeTops);
      });
      */
    });
    // 3.请求推荐数据
    getRecommonds().then((res) => {
      this.recommonds = res.data.list;
    });
  },

  methods: {
    ...mapActions(["addCart"]),
    // 在 DetailGoodsInfo.vue 里，所有图片加载完才发送事件进行刷新，解决滚动卡住
    // 里面判断图片加载完才发送值得一看
    imageLoad() {
      this.$refs.scroll.refresh();
      // 图片全部加载完成后，获取每个组件的高度
      // 每次图片加载一次，就调用太频繁了，需要防抖处理
      // 草，但为什么 debounce 没用啊，其他 test.html 可以用的啊，一点反应都没有，报错也没有
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.recommonds.$el.offsetTop);
      // console.log(this.themeTops);
    },
    // 监听滚动位置
    contentScroll(position) {
      // 监听滚动位置，实现nav颜色响应
      // position.y 和主题中值进行对比
      // position.y 在 themeTops[0]和[1]之间，让 index = 0
      const positionY = -position.y;
      this.themeTops.forEach((item, i) => {
        let length = this.topImages.length;
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTops[i] &&
            positionY <= this.themeTops[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTops[i]))
        ) {
          this.currentIndex = i;
          // 在 nav 组件中 用 currentIndex 来记录当前激活的导航,修改即可
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      });

      // 判断backtop按钮是否出现(这部分用了混入 实际逻辑代码：this.ShowBackTop = -position.y > 1000;)
      this.listenShowBackTop(position);
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 2000);
    },
    // 点击加入购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      // 2.数据想在多个界面共享，最好添加到vuex里面
      // 由于一个mutation对应一个操作，这个逻辑比较复杂，被放到actions里面进行分解
      // addCart 是被映射 this.$store.dispatch("addCart", product)
      this.addCart(product)
        // 3.在添加购物车操作之后弹窗。
        .then((res) => {
          this.toastMessage = res;
          this.$toast.show(res, 2000);
        })
        .catch((err) => {
          this.toastMessage = err;
          this.$toast.show(err, 2000);
        });

      // 3.toast 弹窗，用 插件封装更方便;
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
  bottom: 49px;
  left: 0;
  right: 0;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
.recommonds-text {
  font-size: 15px;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>