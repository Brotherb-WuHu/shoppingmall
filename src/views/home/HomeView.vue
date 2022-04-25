<template>
  <div id="home">
    <div class="home-nav">
      <nav-bar>
        <template #center>购物街</template>
      </nav-bar>
    </div>
    <!-- 曲线救国：当滚动到下面时，tabcontrol隐藏，这个显示 -->
    <tab-control
      class="tabControlTop"
      v-show="isTabFixed"
      ref="tabControlTop"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    ></tab-control>
    <scroll
      class="home-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      :observeImage="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends"></home-recommend>
      <feature></feature>
      <tab-control
        :class="{ tabFixed: isTabFixed }"
        ref="tabControlCenter"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>

      <!-- goods 显示的是什么由选项卡点击事件传过来的 tabClick 来决定 -->
      <!-- 这里用计算属性代替 goods[currentType].list;-->
      <goods :goods="showGoods"></goods>
    </scroll>
    <back-top @BackTopClick="BackTopClick" v-show="ShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommend from "@/views/home/childComps/HomeRecommend";
import Feature from "@/views/home/childComps/Feature";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/TabControl/TabControl";
import BackTop from "@/components/content/backtop/BackTop";
import goods from "@/components/content/goods/goods";
import goodsItem from "@/components/content/goods/goodsItem";

// 面向 home.js 而不是全部塞在 request.js 避免代码耦合
// 这里只需要知道要请求什么数据，具体操作封装在 home.js 里面

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "HomeView",
  components: {
    HomeSwiper,
    HomeRecommend,
    Feature,
    NavBar,
    TabControl,
    BackTop,
    goods,
    goodsItem,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // 注意 goods 的保存方式
      goods: {
        pop: { page: 0, list: [] },
        // 新接口 就是 new 不是 news
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 用 currentType 保存当前显示的栏目,默认当前类型为 pop
      currentType: "pop",
      ShowBackTop: false,
      tabOffsetTop: 620,
      isTabFixed: false,
    };
  },
  // created() 当前组件被创建时执行
  created() {
    // 网络请求在组件创建成功后发送,获取数据并储存
    // 一般不希望在生命周期函数里写复杂的业务代码，建议封装到 methods 里面
    // 记住用 this 才是 methods 里的方法，不加则是用 import 进来的同名方法
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  methods: {
    // 网络请求方法-总
    getHomeMultidata() {
      // 下面的同名方法是 import 进来的
      getHomeMultidata().then((res) => {
        // 箭头函数的 this 是往上找的,created 里面调用,所以在 created 里面找指向
        // created() 的 this 是指向当前组件的
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 网络请求方法-分
    // 除了创建时要用到，下拉加载菜单还要用到
    getHomeGoods(type) {
      // 每调用一次，那个类别的页码+1
      // 第一次page 0，第二次 page1,，第三次 page2
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 下拉加载更多要调用一次下面的方法才能继续运行
        this.$refs.scroll.finishPullUp();
      });
    },

    // 监听 tabControl 的点击，根据点击的 index 查找不同的数据类别
    // 这个 index 就是当前响应的商品种类，详细的看 TabControl.vue
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      this.$refs.tabControlTop.currentIndex = index;
      this.$refs.tabControlCenter.currentIndex = index;
    },
    // 点击回到顶层方法
    BackTopClick() {
      // 拿到SCroll组件 ,执行里面封装的 scrollTo 方法
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    // content 滚动事件监听
    contentScroll(position) {
      // PS:向下滚 y 都是 负值

      // 判断返回顶部按钮是否显示
      this.ShowBackTop = -position.y > 1000;

      // 决定 tabcontrol 是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多方法
    loadMore() {
      // 每调用一次，页码+1，数据+30
      this.getHomeGoods(this.currentType);

      // this.$refs.scroll.finishPullUp();
      // 如果放这里就变成同步任务了，数据都没出来就执行了 finish
      // 所以要放到 getHomeGoods 里面
    },

    // 监听轮播图图片加载完成,并获取选项卡距离顶部距离(实现吸顶效果)
    // swiperLoad 事件在 HomeSwiper 里面发送，只有接收了这个事件，下面的方法才会被执行哦
    swiperImageLoad() {
      // 获取 tabcontrol 的 offsettop 来获得距离
      // 但是！直接拿组件的 offsettop 是没有的，应该去拿组件里面的 根div
      // 所有组件都有 $el 是用于获取组件中的元素
      // 但是！直接拿 组件.$el.offsettop 是不准确的，因为有些图片没加载完，获取的高度是非常低的，需要监听大的图片加载完再获取，经测试一般监听轮播图即可

      // console.log(this.$refs.tabControlCenter.$el.offsetTop);

      this.tabOffsetTop = this.$refs.tabControlCenter.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
}

.home-content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 莫名不能用鼠标上下拖动 */
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */

/* 直接写 fixed 脱离文档流，出现鬼闪，因为better scroll 是控制 translate 来滚动的与fixed冲突
.tabFixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 44px;
} */
.tabControlTop {
  position: relative;
  z-index: 9;
}
</style>