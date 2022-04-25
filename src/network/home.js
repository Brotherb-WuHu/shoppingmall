import { request } from "./request";

export function getHomeMultidata() {
  // 返回的是一个 Promise
  return request({
    url: "/home/multidata",
  });
}
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page,
    },
  });
}
