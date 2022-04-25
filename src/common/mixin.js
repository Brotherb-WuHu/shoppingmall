export const backTopMixin = {
  // 不能拿 components 我也不知道为啥
  data() {
    return {
      ShowBackTop: false,
    };
  },
  methods: {
    BackTopClick() {
      // 拿到SCroll组件 ,执行里面封装的 scrollTo 方法
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    listenShowBackTop(position) {
      this.ShowBackTop = -position.y > 1000;
    },
  },
};
