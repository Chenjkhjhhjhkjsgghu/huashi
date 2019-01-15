let Mock =  require('mockJs')
// 获取积分记录
Mock.mock('/api/user.score/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists": [
      {
        score: 1, // 积分
        remark: "@name", // 原因备注
        create_at: '2017-11-21 12:30:22', // 添加时间戳
      }, {
        score: 3, // 积分
        remark: "@name", // 原因备注
        create_at: '2017-11-22 12:30:22', // 添加时间戳
      }, {
        score: 41, // 积分
        remark: "@name", // 原因备注
        create_at: '2017-11-23 12:30:22', // 添加时间戳
      }
    ],
    page: 1,
    page_size: 10
  }
})
// 经销商申请收支明细
Mock.mock('/api/user.dealer.wallet/getlists', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    lists: [
      {
        id: 0, // 记录ID
        create_at: 0, // 触发时间
        remark: '买了一个表', // 备注
        money: 138 // 金额
      }
    ],
    page: 1,
    page_size: 10
  }
})

// 经销商申请提现记录
Mock.mock('/api/user.dealer.wallet.apply/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    'money': 2000,
    "lists": [
      {
        "id": 1, // 记录ID
        "create_at": '2017-11-21 12:30:22', // 申请时间
        "back_account": '@name', // 提现账户
        "money": 111, // 提现金额
        "status": 0 // 状态 0 审核中 1 提现成功
      }, {
        "id": 2, // 记录ID
        "create_at": '2017-11-22 12:30:22', // 申请时间
        "back_account": '@name', // 提现账户
        "money": 222, // 提现金额
        "status": 0 // 状态 0 审核中 1 提现成功
      }, {
        "id": 3, // 记录ID
        "create_at": '2017-11-6 12:30:22', // 申请时间
        "back_account": '@name', // 提现账户
        "money": 3333, // 提现金额
        "status": 0 // 状态 0 审核中 1 提现成功
      }
    ],
    "page": 1,
    "page_size": 10
  }
})

// 获取积分排行记录
Mock.mock('/api/user.score/ranklist', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "self": {
      "index": 8, // 排行
      "headimgurl": '../../../static/img/3.png', // 头像
      "nickname": '@name',
      "score": 2500 // 总积分
    },
    "lists": [
      {
        "index": 1, // 排行
        "headimgurl": '../../../static/img/3.png', // 头像
        "nickname": '@name',
        "score": 3500 // 总积分
      }, {
        "index": 2, // 排行
        "headimgurl": '../../../static/img/3.png', // 头像
        "nickname": '@name',
        "score": 3400 // 总积分
      }, {
        "index": 3, // 排行
        "headimgurl": '../../../static/img/3.png', // 头像
        "nickname": '@name',
        "score": 3300 // 总积分
      }, {
        "index": 4, // 排行
        "headimgurl": '../../../static/img/3.png', // 头像
        "nickname": '@name',
        "score": 3200 // 总积分
      }
    ],
    "page": 1,
    "page_size": 10
  }
})

// 获取用户信息【未完善】
Mock.mock('/api/user/info', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "headimgurl": '../../../static/img/2.png', // 头像地址
    "nickname": '卧听风雨', // 昵称
    "money": 28000, // 可提现余额
    "score": 20000, // 我的积分
    "score_level_alias": '黄金', // 积分称号
    "score_level_min": 20000, // 积分称号
    "score_level_max": 30000, // 积分称号
    "score_rank": 8, // 积分排名
  }
})

// 获取积分等级列表
Mock.mock('/api/user.score/level', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists": [{
      "name": '黑铁', // 等级名称
      "min_score": 2500, // 最小积分
      "max_score": 6000, // 最大积分
      "icon": '../../../static/img/heitie.png' // 图标地址
    }, {
      "name": '青铜', // 等级名称
      "min_score": 6000, // 最小积分
      "max_score": 10000, // 最大积分
      "icon": '../../../static/img/qingtong.png' // 图标地址
    }, {
      "name": '白银', // 等级名称
      "min_score": 10000, // 最小积分
      "max_score": 15000, // 最大积分
      "icon": '../../../static/img/baiyin.png' // 图标地址
    }, {
      "name": '黄金', // 等级名称
      "min_score": 15000, // 最小积分
      "max_score": 20000, // 最大积分
      "icon": '../../../static/img/huangjin.png' // 图标地址
    }, {
      "name": '铂金', // 等级名称
      "min_score": 20000, // 最小积分
      "max_score": 30000, // 最大积分
      "icon": '../../../static/img/bojin.png' // 图标地址
    }, {
      "name": '钻石', // 等级名称
      "min_score": 30000, // 最小积分
      "max_score": 100000000, // 最大积分
      "icon": '../../../static/img/zuanshi.png' // 图标地址
    }],
    "explain": ''
  }
})

// 查看订单详情【接口完成，未测试】
Mock.mock('/api/order/info', {
  'error_code': "SUCCESS",
  'reason': "",
  'result': {
    'express_mode': 0, // 配送方式 0 快递 1 自提
    'express_fee': 0.00, // 快递费
    'address': { // 收货人信息（快递订单）
      'name': '@name', // 收货人姓名
      'telephone': '17682316328', // 收货人手机号
      'province': '浙江', // 省份
      'province_id': '', // 省份ID
      'city': '杭州市', // 城市
      'city_id': '', // 城市ID
      'area': '西湖区', // 区(城镇)
      'area_id': '', // 区ID(城镇ID)
      'street': '文二路', // 街道地址
      'remark': '西湖国际大厦D南2座' // 用户填写详细地址
    },
    'shop_name': '健视加官方旗舰店', // 店铺名称
    'items': [ // 商品列表信息
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
    'status': 0, // 订单状态 0 待支付 1 待发货 2 待收货 3 交易成功
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
})

// 提醒发货成功
Mock.mock('/api/order/remind', {
  'error_code': "SUCCESS"
})

// 删除成功
Mock.mock('/api/order/delete', {
  'error_code': "SUCCESS"
})
// 延长收货成功
Mock.mock('/api/order.operation/prolong', {
  'error_code': "SUCCESS"
})

// 确认收货成功
Mock.mock('/api/order.operation/finish', {
  'error_code': "SUCCESS"
})
// 获取门店列表【接口完成】
Mock.mock('/api/store/getlists', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "lists": [
      {
        "store_id": 1, // 门店ID
        "name": "测试门店1", // 门店名称
        "full_address": "测试门店1的地址", // 门店地址
        "telephone": "15666666666" // 联系电话
      },
      {
        "store_id": 2,
        "name": "测试门店2",
        "full_address": "测试门店2的地址",
        "telephone": "15666666666"
      }
    ],
    "page": 1,
    "page_size": 10
  }
})

// 获取验证码
Mock.mock('/api/sms/send', {
  "error_code": "SUCCESS",
  "reason": "测试验证码已发送",
  "result": {
      "verify_code": '1967' // 该字段上线后不存在
  }
})


// 经销商提现接口
Mock.mock('/api/user.dealer.wallet/apply', {
  "error_code": "SUCCESS"
})

// 获取一级二级客户列表
Mock.mock('/api/user.dealer.child/getlists', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    lists: [
      {
        dealer_id: 1,
        nickname: '@name', // 昵称
        total_sale_money: '20000', // 总销售额
        total_brokerage: '900' // 总佣金
      },{
        dealer_id: 2,
        nickname: '@name', // 昵称
        total_sale_money: '23131', // 总销售额
        total_brokerage: '981' // 总佣金
      },{
        dealer_id: 3,
        nickname: '张三', // 昵称
        total_sale_money: '33333', // 总销售额
        total_brokerage: '1111' // 总佣金
      }
    ],
    page: 1,
    page_size: 10
  }
})

// 获取验证码
Mock.mock('/api/user.dealer.info/unlock', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    operation_key: "123456"
  }
})


// 变更提现信息
Mock.mock('/api/user.dealer.info/update', {
  error_code: "SUCCESS",
  reason: "",
})

// 获取物品的快递信息
Mock.mock('/api/order.package/query', {
  error_code: "SUCCESS",
  reason: "",
  result: {
    thumb_image: '../../../static/img/3.png', // 缩略图, 默认取第一个商品的sku图片。没有sku图片的话，取主商品的图。
    item_count: 5, // 同一包裹或同一快递单号下的所有商品数量
    company: {
      fullname: '中通快递', // 完整快递名称
      shortname: "中通", // 快递简称
      telephone: "95311", // 联系电话
    },
    bill_no: '1231313', // 快递单号
    context: [ // 物流信息
      {
        desc: "[杭州市] [杭州智格区]的派件已签收 感谢使用中通快递,期待再次为您服务!",
        time: 1510633478
      },
      {
        desc: "[杭州市] [分拣中新]的韩都现场派件 电话:13565265233",
        time: 1510411577
      },
      {
        desc: "[杭州市] [分拣中新]的韩都现场发出 ",
        time: 1510411577
      },
      {
        desc: "[杭州市] [分拣中新]的韩都现场发出 ",
        time: 1510411577
      },
      {
        desc: "[杭州市] [分拣中新]的韩都现场发出 ",
        time: 1510411577
      },
      {
        desc: "[济南市] [济南韩都衣舍]的韩都现场已收件",
        time: 1510411577
      }
    ],
    state: 3,
    status: 1
  }
})

// 变更提现信息
Mock.mock('/api/user.spread/image', {
  error_code: "SUCCESS",
  reason: "",
  result: {
      imgurl: "static/img/poster.png"
  }
})


// 我的订单 获取订单返现详情【2017-10-08 17:08 新增】
Mock.mock('/api/order.cashback/read', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    type: 0, // 订单类型 0 普通订单 1 会销订单
    order_id: 123131, // 订单ID
    create_at: '2017-12-8 16:00', // 消费时间
    money_pool: 1313131, // 当前资金池金额
    money_pool_percent: 0.15, // 资金池比例
    cashback_at: '2017-12-9 24:00', // 脚本开始返现时间的时间
    // <!-- 以下数据只有会销订单才有 -->
    meet_id: 0, // 会销ID
    meet_name: '西湖国际大厦', // 会销地点名称
    meet_start_at: '2017-10-08 16:00', // 会销开始时间
    meet_end_at: '2017-10-08 16:00', // 会销结束时间
    // <!-- 以上数据只有会销订单才有 -->
  }
})


// 提现排队列表
Mock.mock('/api/order.cashback/getlists2', {
  "error_code": "SUCCESS",
  "reason": "",
  "result": {
    "self": {
      "rank": 8, // 排队编号
      "nickname": "", // 昵称
      "headimgurl": "../../../static/img/1.png", // 头像
      "money": 0, // 消费金额
      "score": 0, // 用户积分
      "create_at": "2017-12-08 17:49" // 下单时间
    },
    "lists": [
      {
        "rank": 1, // 排队编号
        "order_id": 12312312, // 订单编号
        "nickname": "孙九洲", // 昵称
        "headimgurl": "../../../static/img/1.png", // 头像
        "money": 70, // 消费金额
        "score": 0, // 用户积分
        "create_at": "2017-12-08 12:49" // 下单时间
      },{
        "rank": 2, // 排队编号
        "order_id": 111112, // 订单编号
        "nickname": "杨万里", // 昵称
        "headimgurl": "../../../static/img/2.png", // 头像
        "money": 90, // 消费金额
        "score": 0, // 用户积分
        "create_at": "2017-12-08 17:49" // 下单时间
      },{
        "rank": 3, // 排队编号
        "order_id": 1231, // 订单编号
        "nickname": "百里登风", // 昵称
        "headimgurl": "../../../static/img/avatar.png", // 头像
        "money": 100, // 消费金额
        "score": 2222, // 用户积分
        "create_at": "2017-12-8 19:49" // 下单时间
      },{
        "rank": 4, // 排队编号
        "order_id": 1231, // 订单编号
        "nickname": "汝嫣", // 昵称
        "headimgurl": "../../../static/img/avatar.png", // 头像
        "money": 100, // 消费金额
        "score": 2222, // 用户积分
        "create_at": "2017-12-8 20:10" // 下单时间
      },{
        "rank": 5, // 排队编号
        "order_id": 1231, // 订单编号
        "nickname": "游龙", // 昵称
        "headimgurl": "../../../static/img/avatar.png", // 头像
        "money": 100, // 消费金额
        "score": 2222, // 用户积分
        "create_at": "2017-12-8 20:12" // 下单时间
      },{
        "rank": 6, // 排队编号
        "order_id": 1231, // 订单编号
        "nickname": "戏凤", // 昵称
        "headimgurl": "../../../static/img/avatar.png", // 头像
        "money": 100, // 消费金额
        "score": 2222, // 用户积分
        "create_at": "2017-12-8 20:16" // 下单时间
      },{
        "rank": 6, // 排队编号
        "order_id": 1231, // 订单编号
        "nickname": "杨焱", // 昵称
        "headimgurl": "../../../static/img/avatar.png", // 头像
        "money": 100, // 消费金额
        "score": 2222, // 用户积分
        "create_at": "2017-12-8 20:19" // 下单时间
      },{
        "rank": 6, // 排队编号
        "order_id": 1231, // 订单编号
        "nickname": "杨淼", // 昵称
        "headimgurl": "../../../static/img/avatar.png", // 头像
        "money": 100, // 消费金额
        "score": 2222, // 用户积分
        "create_at": "2017-12-8 21:49" // 下单时间
      }
    ]
  }
})

