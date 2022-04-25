import { request } from "./request";

// 请求详情页的数据
export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    },
  });
}

// 请求推荐类别的数据(没错，这接口不在详情页里面)
export function getRecommonds() {
  return request({
    url: "/recommend",
  });
}
// 有些数据分布非常分散，最好整合成一个对象再发出去
// 这就是 面向对象 ，这种思想非常重要好好学！这样更方便调用和维护！

// Goods 是头部的简介
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}
// Shop 是商家的信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
// GoodsParam 参数信息
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
