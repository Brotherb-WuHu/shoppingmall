import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000,
  });

  // axios 的拦截器
  // use(function(config),function(err)),拦截的就是请求的配置config
  instance.interceptors.request.use((config) => {
    return config;
  }),
    (err) => {
      console.log(err);
    };

  //use(function(res),function(err)),拦截下来的是请求成功返回的结果res
  instance.interceptors.response.use(
    (res) => {
      // 一般进行操作是在调用那边，这里一般只过滤数据
      // console.log(res);
      // 这里可以把返回的data取出来，进行过滤 res.data
      return res.data;
    },
    (err) => {
      // 请求失败时的错误信息
      console.log(err);
    }
  );

  return instance(config);
}
