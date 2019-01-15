let routes = [
  {
    path: '/',
    component: function (resolve) {
      require(['@/pages/indexT'], resolve)
    }
  }, {
    path: '/indexPhone',
    component: function (resolve) {
      require(['@/pages/indexPhone'], resolve)
    }
  }, {
    path: '/phoneTest',
    component: function (resolve) {
      require(['@/pages/phoneTest'], resolve)
    }
  }
]

export {
  routes
}
