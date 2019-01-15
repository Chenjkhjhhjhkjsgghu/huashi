let Mock =  require('mockJs')
// 首页商品列表
Mock.mock('/api/ware/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists|10": [
      {
        "ware_id|+1": 1, // 商品ID
        "imgurl": "static/img/3.png",
        "title": "健视加青年眼药水", // 商品标题
        "desc": "500毫升", // 简单描述
        "market_price": 10, // 市场价, 精确到2位小数，单位:元
        "price": 8, // 平台销售价格, 精确到2位小数，单位:元
        "sale_count": 103 // 本月销售量
      }],
    "page": 1,
    "page_size": 10
  }
})
// 首页海报列表
Mock.mock('/api/shop.banner/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists": [
      {
        "banner_id": 1, // 海报ID
        "imgurl": "static/img/1.png", // 图片地址
        "type": 0, // 类型 0 普通图片 1 站外链接 2 站内链接
        "params": []
      },
      {
        "banner_id": 2,
        "imgurl": "static/img/1.png",
        "type": 1,
        "params": { // 【站外链接】类型才会有这个字段
          "url": "https://www.baidu.com/",
          "target": "_blank"
        }
      },
      {
        "banner_id": 3,
        "imgurl": "static/img/1.png",
        "type": 2,
        "params": { // 【站内链接】类型才会有这个字段
          "to": "ware", // 商品页面
          "query": {
            "ware_id": 1 // 商品ID
          }
        }
      }
    ],
    "page": 1,
    "page_size": 10
  }
})
// 获取商品详情评论

Mock.mock('/api/ware.comment/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists|10": [
      {
        comment_id: 0, // 评论ID
        user: {
          user_id: 0, // 用户ID
          headimgurl: 'static/img/avatar.png', // 头像地址
          nickname: '@name', // 昵称
        },
        item: {
          title: '健视加云智能眼镜4.0', // 商品标题
          ware_id: 0, // 商品ID
          sku_id: 0, // 商品SKUID
          feature: [
            {
              key_id: 0,
              key_alias: '颜色分类',
              value_id: 0,
              value_alias: '白色'
            }
          ]
        },
        content: '好评！！很实用，很有效果！！！', // 评论内容
        create_at: '2017-12-06 18:26', // 评论时间
      }
    ],
    "page": 1,
    "page_size": 10
  }
})
// 根据单个参数查询库存
Mock.mock('/api/ware.sku/search', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": [
    {
      "key_id": 2,
      "value_id": 5,
      "stock_num": 1229
    }, {
      "key_id": 2,
      "value_id": 8,
      "stock_num": 103
    }, {
      "key_id": 2,
      "value_id": 6,
      "stock_num": 1
    }, {
      "key_id": 2,
      "value_id": 7,
      "stock_num": 0
    }
  ]
})
// 删除收货地址
Mock.mock('/api/user.address/delete', {
  'error_code': 'SUCCESS'
})
// 提交订单 单条
Mock.mock('/api/ware.sku/buy', {
  'error_code': 'SUCCESS',
  'reason': "",
  'result': {} // 微信支付参数
})