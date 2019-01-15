let Mock =  require('mockJs')
// 地址列表
Mock.mock('/api/user.address/getlists', {
  'result|1-10': [{
    'address_id|+1': 1,
    'name': '@name',
    'tel|+1': 13121332121,
    'full_address': '@province@city',
    'is_default': '@natural(0,1)'
  }]
})
// 商品详情
Mock.mock('/api/ware/read', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "ware_id": 1, // 商品ID
    "images": [
      {
        "image_id": 1,
        "imgurl": "static/img/2.png"
      },
      {
        "image_id": 2,
        "imgurl": "static/img/2.png"
      }
    ],
    "title": "云智能眼镜4.0",
    "is_collection": 1, // 是否加入收藏 0 未收藏 1 已收藏
    "express_fee": 10, // 快递费
    "express_station": "山西太原", // 发货地
    "sale_count": 103, // 累计销售量
    "market_price": 10,
    "price": 8,
    "props": [ // 规格
      {
        "prop_id": 1, // 属性ID
        "name": "颜色",
        "values": [
          {
            "value_id": 1, // 值ID
            "name": "黑色"
          },
          {
            "value_id": 2,
            "name": "白色"
          },
          {
            "value_id": 3,
            "name": "蓝色"
          },
          {
            "value_id": 4,
            "name": "绿色"
          }
        ]
      },
      {
        "prop_id": 2,
        "name": "型号",
        "values": [
          {
            "value_id": 5,
            "name": "云智能眼镜1.0"
          },
          {
            "value_id": 6,
            "name": "云智能眼镜2.0"
          },
          {
            "value_id": 7,
            "name": "云智能眼镜3.0"
          },
          {
            "value_id": 8,
            "name": "云智能眼镜4.0"
          }
        ]
      }
    ],
    'evaluate|1-10':[{
      'avatar': 'static/img/avatar.png',
      'name': '@name',
      'time': '2017-11-11',
      'shopName': '健视加云智能眼镜4.0（白色）',
      'content': '好评！！很实用，很有效果！！！'
    }]
  }
})

// 获取单个商品详情
Mock.mock('/api/ware.sku/read', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "sku_id": 1, // sku规格ID
    "image": "https://via.placeholder.com/220x220?text=image1", // sku图片
    "stock_num": 999, // 库存
    "market_price": 10, // 市场价
    "price": 8 // 平台销售价格
  }
})

// 查看购物车列表
Mock.mock('/api/cart/getlists', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    lists: [
      {
        shop_id: 1, // 店铺ID
        order_id: 1, // 订单ID
        shop_name: '健视佳官方旗舰店',
        is_pay: 0, // 支付状态 0 未支付 1 已支付
        is_evaluation: 0, // 评价状态 0 未评价 1 已评价
        status: 0, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        item_count: 0, // 商品总数
        item_total_price: 0, // 商品总价
        express_mode: 0, // 配送方式 0 快递 1 自提
        express_fee: 0, // 快递费
        create_at: 0, // 下单时间
        items: [
          {
            cart_id: 1, // 购物车中的商品ID
            title: '健视加云智能', // 商品标题
            ware_id: 1, // 商品ID
            sku_id: 1, // 商品SKUID
            sku_image: '../../../static/img/avatar.png', // 商品SKU图片
            feature: [
              {
                key_id: '1', // 属性ID
                key_alias: '颜色分类',  // 属性的名称
                value_id: '1', // 属性值的ID
                value_alias: '白色'  // 属性值的名称
              }
            ],
            market_price: 19800, // 市场价, 精确到2位小数，单位:元
            price: 999, // 平台销售价格, 精确到2位小数，单位:元
            stock_num: 10, // 商品库存
            buy_count: 1 // 购买数量
          },
          {
            cart_id: 2, // 购物车中的商品ID
            ware_id: 1, // 商品ID
            title: '健视加云智能', // 商品标题
            sku_id: 1, // 商品SKUID
            sku_image: '../../../static/img/avatar.png', // 商品SKU图片
            feature: [
              {
                key_id: '1', // 属性ID
                key_alias: '颜色分类',  // 属性的名称
                value_id: '1', // 属性值的ID
                value_alias: '白色'  // 属性值的名称
              }
            ],
            market_price: 19800, // 市场价, 精确到2位小数，单位:元
            price: 999, // 平台销售价格, 精确到2位小数，单位:元
            stock_num: 10, // 商品库存
            buy_count: 1 // 购买数量
          }
        ]
      },
      {
        shop_id: 1, // 店铺ID
        order_id: 2, // 订单ID
        shop_name: '健视佳官方旗舰店',
        is_pay: 0, // 支付状态 0 未支付 1 已支付
        is_evaluation: 0, // 评价状态 0 未评价 1 已评价
        status: 0, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        item_count: 0, // 商品总数
        item_total_price: 0, // 商品总价
        express_mode: 1, // 配送方式 0 快递 1 自提
        express_fee: 0, // 快递费
        create_at: 0, // 下单时间
        items: [
          {
            cart_id: 3, // 购物车中的商品ID
            ware_id: 1, // 商品ID
            title: '健视加云智能', // 商品标题
            sku_id: 1, // 商品SKUID
            sku_image: '../../../static/img/avatar.png', // 商品SKU图片
            feature: [
              {
                key_id: '1', // 属性ID
                key_alias: '颜色分类',  // 属性的名称
                value_id: '1', // 属性值的ID
                value_alias: '白色'  // 属性值的名称
              }
            ],
            market_price: 19800, // 市场价, 精确到2位小数，单位:元
            price: 999, // 平台销售价格, 精确到2位小数，单位:元
            stock_num: 10, // 商品库存
            buy_count: 1 // 购买数量
          }
        ]
      }
    ],
    page: 1,
    page_size: 10
  }
})

// 查看商城订单列表
Mock.mock('/api/order/getlists', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    lists: [
      {
        order_id: 1,
        shop_name: '健视佳官方旗舰店',
        is_pay: 0, // 支付状态 0 未支付 1 已支付
        is_evaluation: 0, // 评价状态 0 未评价 1 已评价
        status: 0, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        item_count: 1, // 商品总数
        item_total_price: 15800, // 商品总价
        express_mode: 0, // 配送方式 0 快递 1 自提
        express_fee: 0, // 快递费
        create_at: 0, // 下单时间
        items: [
          {
            snapshot: { // 商品快照
              title: '健视加云智能', // 商品标题
              ware_id: 1, // 商品ID
              sku_id: 0, // 商品规格ID
              sku_image: '../../../static/img/3.png', // 商品SKU图片
              market_price: 19800, // 市场价
              price: 18800, // 平台销售价格
              feature: [
                {
                  key_id: '1', // 属性ID
                  key_alias: '颜色分类',  // 属性的名称
                  value_id: '1', // 属性值的ID
                  value_alias: '青色'  // 属性值的名称
                }
              ]
            },
            sale_price: 15800, // 商品购买价格
            sale_count: 1, // 商品购买数量
            status: 0, // 状态 0 正常 1 退款
            bill_type: 0, // 快递类型
            bill_no: '', // 快递运单号
          }
        ],
        'item_count': 2, // 商品总数
        'item_total_price': 2000, // 商品总价
        'is_pay': 0, // 支付状态 0 未支付 1 已支付
        'is_evaluation': 0, // 评价状态 0 未评价 1 已评价
        // 'status': 3, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        'remark': "12313131", // 卖家订单留言
        // <!-- 未支付状态 -->
        auto_close_at: "2017-12-07 18:16", // 【未支付订单自动关闭倒计时】
        // <!-- 卖家已发货 -->
        company: {
          fullname: '中通快递', // 完整快递名称
          shortname: "中通", // 快递简称
          telephone: "95311", // 联系电话
        },
        bill_no: '1313131', // 快递单号
        delivery_at: '2017-12-07 18:16', // 发货时间
        auto_finish_at: '2017-12-16 18:16' // 自动确认收货时间
      },
      {
        order_id: 2,
        shop_name: '健视佳官方旗舰店',
        is_pay: 1, // 支付状态 0 未支付 1 已支付
        is_evaluation: 0, // 评价状态 0 未评价 1 已评价
        status: 1, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        item_count: 1, // 商品总数
        item_total_price: 15800, // 商品总价
        express_mode: 1, // 配送方式 0 快递 1 自提
        express_fee: 0, // 快递费
        create_at: 0, // 下单时间
        items: [
          {
            snapshot: { // 商品快照
              title: '健视加云智能', // 商品标题
              ware_id: 2, // 商品ID
              sku_id: 0, // 商品规格ID
              sku_image: '../../../static/img/3.png', // 商品SKU图片
              market_price: 19800, // 市场价
              price: 18800, // 平台销售价格
              feature: [
                {
                  key_id: '1', // 属性ID
                  key_alias: '颜色分类',  // 属性的名称
                  value_id: '1', // 属性值的ID
                  value_alias: '青色'  // 属性值的名称
                }
              ]
            },
            sale_price: 15800, // 商品购买价格
            sale_count: 1, // 商品购买数量
            status: 0, // 状态 0 正常 1 退款
            bill_type: 0, // 快递类型
            bill_no: '', // 快递运单号
          }
        ],
        'item_count': 2, // 商品总数
        'item_total_price': 2000, // 商品总价
        'is_pay': 0, // 支付状态 0 未支付 1 已支付
        'is_evaluation': 0, // 评价状态 0 未评价 1 已评价
        // 'status': 3, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        'remark': "12313131", // 卖家订单留言
        // <!-- 未支付状态 -->
        auto_close_at: "2017-12-07 18:16", // 【未支付订单自动关闭倒计时】
        // <!-- 卖家已发货 -->
        company: {
          fullname: '中通快递', // 完整快递名称
          shortname: "中通", // 快递简称
          telephone: "95311", // 联系电话
        },
        bill_no: '1313131', // 快递单号
        delivery_at: '2017-12-07 18:16', // 发货时间
        auto_finish_at: '2017-12-16 18:16' // 自动确认收货时间
      },
      {
        order_id: 3,
        shop_name: '健视佳官方旗舰店',
        is_pay: 1, // 支付状态 0 未支付 1 已支付
        is_evaluation: 0, // 评价状态 0 未评价 1 已评价
        status: 2, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        item_count: 1, // 商品总数
        item_total_price: 15800, // 商品总价
        express_mode: 0, // 配送方式 0 快递 1 自提
        express_fee: 0, // 快递费
        create_at: 0, // 下单时间
        items: [
          {
            snapshot: { // 商品快照
              title: '健视加云智能', // 商品标题
              ware_id: 3, // 商品ID
              sku_id: 0, // 商品规格ID
              sku_image: '../../../static/img/3.png', // 商品SKU图片
              market_price: 19800, // 市场价
              price: 18800, // 平台销售价格
              feature: [
                {
                  key_id: '1', // 属性ID
                  key_alias: '颜色分类',  // 属性的名称
                  value_id: '1', // 属性值的ID
                  value_alias: '青色'  // 属性值的名称
                }
              ]
            },
            sale_price: 15800, // 商品购买价格
            sale_count: 1, // 商品购买数量
            status: 0, // 状态 0 正常 1 退款
            bill_type: 0, // 快递类型
            bill_no: '', // 快递运单号
          }
        ],
        'item_count': 2, // 商品总数
        'item_total_price': 2000, // 商品总价
        'is_pay': 0, // 支付状态 0 未支付 1 已支付
        'is_evaluation': 0, // 评价状态 0 未评价 1 已评价
        // 'status': 3, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        'remark': "12313131", // 卖家订单留言
        // <!-- 未支付状态 -->
        auto_close_at: "2017-12-07 18:16", // 【未支付订单自动关闭倒计时】
        // <!-- 卖家已发货 -->
        company: {
          fullname: '中通快递', // 完整快递名称
          shortname: "中通", // 快递简称
          telephone: "95311", // 联系电话
        },
        bill_no: '1313131', // 快递单号
        delivery_at: '2017-12-07 18:16', // 发货时间
        auto_finish_at: '2017-12-16 18:16' // 自动确认收货时间
      },
      {
        order_id: 4,
        shop_name: '健视佳官方旗舰店',
        is_pay: 1, // 支付状态 0 未支付 1 已支付
        is_evaluation: 0, // 评价状态 0 未评价 1 已评价
        status: 3, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        item_count: 2, // 商品总数
        item_total_price: 15800, // 商品总价
        express_mode: 1, // 配送方式 0 快递 1 自提
        express_fee: 0, // 快递费
        create_at: 0, // 下单时间
        items: [
          {
            snapshot: { // 商品快照
              title: '健视加云智能', // 商品标题
              ware_id: 4, // 商品ID
              sku_id: 0, // 商品规格ID
              sku_image: '../../../static/img/3.png', // 商品SKU图片
              market_price: 19800, // 市场价
              price: 18800, // 平台销售价格
              feature: [
                {
                  key_id: '1', // 属性ID
                  key_alias: '颜色分类',  // 属性的名称
                  value_id: '1', // 属性值的ID
                  value_alias: '青色'  // 属性值的名称
                }
              ]
            },
            sale_price: 15800, // 商品购买价格
            sale_count: 1, // 商品购买数量
            status: 0, // 状态 0 正常 1 退款
            bill_type: 0, // 快递类型
            bill_no: '', // 快递运单号
          },
          {
            snapshot: { // 商品快照
              title: '健视加云智能', // 商品标题
              sku_image: '../../../static/img/3.png', // 商品SKU图片
              market_price: 19800, // 市场价
              price: 18800, // 平台销售价格
              feature: [
                {
                  key_id: '1', // 属性ID
                  key_alias: '颜色分类',  // 属性的名称
                  value_id: '1', // 属性值的ID
                  value_alias: '青色'  // 属性值的名称
                }
              ]
            },
            sale_price: 15800, // 商品购买价格
            sale_count: 1, // 商品购买数量
            status: 0, // 状态 0 正常 1 退款
            bill_type: 0, // 快递类型
            bill_no: '', // 快递运单号
          }
        ],
        'item_count': 2, // 商品总数
        'item_total_price': 2000, // 商品总价
        'is_pay': 0, // 支付状态 0 未支付 1 已支付
        'is_evaluation': 0, // 评价状态 0 未评价 1 已评价
        // 'status': 3, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
        'remark': "12313131", // 卖家订单留言
        // <!-- 未支付状态 -->
        auto_close_at: "2017-12-07 18:16", // 【未支付订单自动关闭倒计时】
        // <!-- 卖家已发货 -->
        company: {
          fullname: '中通快递', // 完整快递名称
          shortname: "中通", // 快递简称
          telephone: "95311", // 联系电话
        },
        bill_no: '1313131', // 快递单号
        delivery_at: '2017-12-07 18:16', // 发货时间
        auto_finish_at: '2017-12-16 18:16' // 自动确认收货时间
      }
    ],
    page: 1,
    page_size: 10
  }
})
// 获取线下门店地址
Mock.mock('/api/store/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists|1-20": [
      {
        "store_id|+1": 1, // 门店ID
        "name": '@name', // 门店名称
        "full_address": '@province@city', // 门店地址
        'telephone|+1': 13121332121
      }
    ],
    "page": 1,
    "page_size": 10
  }
})

// 删除购物车中的商品
Mock.mock('/api/cart.item/delete', {
  error_code: "SUCCESS"
})

// 评价订单
Mock.mock('/api/order/grade', {
  error_code: 'SUCCESS'
})

// 取消订单
Mock.mock('/api/order/cancel', {
  error_code: "SUCCESS"
})

// 提交订单ID获取支付参数
Mock.mock('/api/order/pay', {
  error_code: "SUCCESS",
  reason: "",
  result: {} // 微信支付参数
})

// 提醒发货
Mock.mock('/api/order/remind', {
  error_code: "SUCCESS"
})

// 删除订单
Mock.mock('/api/order/delete', {
  error_code: "SUCCESS"
})

// 查看订单返现列表
Mock.mock('/api/order.cashback/getlists', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    lists: [
      {
        order_id: 201712091230, // 订单号
        type: 'normal', // normal 普通购买 group 会销购买
        create_at: '2017-12-08 18:09', // 购买时间
        from_store_id: 0, // 购买渠道 0 旗舰店 门店ID
        status: 0, // 状态 0 等待返现 1 返现成功
        // <!-- 以下字段只有会销购买的订单才会有 -->
        meet_id: 0, // 会销ID
        meet_name: '西湖国际', // 会销地点名称
        // <!-- 以上字段只有会销购买的订单才会有 -->
      },
      {
        order_id: 201712091230, // 订单号
        type: 'normal', // normal 普通购买 group 会销购买
        create_at: '2017-12-08 18:09', // 购买时间
        from_store_id: 0, // 购买渠道 0 旗舰店 门店ID
        status: 0, // 状态 0 等待返现 1 返现成功
        // <!-- 以下字段只有会销购买的订单才会有 -->
        meet_id: 0, // 会销ID
        meet_name: '杭州大厦', // 会销地点名称
        // <!-- 以上字段只有会销购买的订单才会有 -->
      },
      {
        order_id: 201712091230, // 订单号
        type: 'normal', // normal 普通购买 group 会销购买
        create_at: '2017-12-08 18:09', // 购买时间
        from_store_id: 0, // 购买渠道 0 旗舰店 门店ID
        status: 0, // 状态 0 等待返现 1 返现成功
        // <!-- 以下字段只有会销购买的订单才会有 -->
        meet_id: 0, // 会销ID
        meet_name: '西湖国际', // 会销地点名称
        // <!-- 以上字段只有会销购买的订单才会有 -->
      },
      {
        order_id: 201712091230, // 订单号
        type: 'normal', // normal 普通购买 group 会销购买
        create_at: '2017-12-08 18:09', // 购买时间
        from_store_id: 0, // 购买渠道 0 旗舰店 门店ID
        status: 0, // 状态 0 等待返现 1 返现成功
        // <!-- 以下字段只有会销购买的订单才会有 -->
        meet_id: 0, // 会销ID
        meet_name: '杭州大厦', // 会销地点名称
        // <!-- 以上字段只有会销购买的订单才会有 -->
      }
    ]
  }
})

// 门店获取订单数据
Mock.mock('/api/store.order/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists": [
      {
        "order_id": 1,   // 订单ID
        "money": "26.00",   // 消费金额
        "create_at": "2017-12-01 00:00:00", // 消费时间
        "nickname": "aaa"    // 昵称
      },
      {
        "order_id": 2,
        "money": "36.00",
        "create_at": "2017-11-30 21:13:20",
        "nickname": "aaa"
      }
    ],
    "page": 1,
    "page_size": 10
  }
})

// 门店获取基本信息
Mock.mock('/api/store/info', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "store_id": 1,      // 门店ID
    "shop_name": "测试门店1",    // 门店名称
    "total_order_count": 2, // 总订单数
    "avatar": "../../../static/img/3.png"    // 头像地址
  }
})

// 门店获取销售数据
Mock.mock('/api/store.sale/info', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists": [
      {
        "total_sales": 62340,  //总销售额
        "today_sales": 2445.9,   //今日销售额
        "transaction_number": 2,    //交易笔数
        "capital_pool": 0,  //当前资金池
        "account_balance": 0,   //账户余额
        "graph_data": [
          {
            "day_transactions": 2220,  // 销售额
            "transaction_number": 222,    //交易数
            "date": "2017-11-20 00:00:00"   //日期
          },
          {
            "day_transactions": 1820,
            "transaction_number": 182,
            "date": "2017-11-21 00:00:00"
          },
          {
            "day_transactions": 1910,
            "transaction_number": 191,
            "date": "2017-11-22 00:00:00"
          },
          {
            "day_transactions": 2340,
            "transaction_number": 234,
            "date": "2017-11-23 00:00:00"
          },
          {
            "day_transactions": 1910,
            "transaction_number": 191,
            "date": "2017-11-24 00:00:00"
          },
          {
            "day_transactions": 2340,
            "transaction_number": 234,
            "date": "2017-11-25 00:00:00"
          },
          {
            "day_transactions": 1800,
            "transaction_number": 180,
            "date": "2017-11-26 00:00:00"
          }
        ]
      }
    ]
  }
})
