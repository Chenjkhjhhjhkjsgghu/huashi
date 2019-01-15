<template>
  <div class="page-footer-container">
    <tabbar v-model="activeIndex1">
      <tabbar-item v-for="(i, index) in tabBtoomList" @on-item-click="changeTab(i.link)" :key="index">
        <i slot="icon" class="iconfont" :class="i.icon"></i>
        <span slot="label">{{i.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import { Tabbar, TabbarItem } from 'vux'
  export default {
    props: {
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        activeIndex1: 0,
        tabBtoomList: [{
          icon: 'icon-shouye',
          label: '首页',
          link: '/'
        }, {
          icon: 'icon-wodedingdan',
          label: '我的订单',
          link: '/myOrderList'
        }, {
          icon: 'icon-gerenzhongxin',
          label: '个人中心',
          link: '/personal'
        }]
      }
    },
    methods: {
      changeTab (link) {
        let that = this
        that.$router.push(link)
      }
    },
    activated () {
      let that = this
      that.$nextTick(() => {
        that.activeIndex1 = that.activeIndex
      })
    },
    components: {
      Tabbar,
      TabbarItem
    }
  }
</script>
<style>
  .page-footer-container{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .page-footer-container .weui-bar__item_on i,
  .page-footer-container .weui-bar__item_on span{
    color:#27abdf !important;
  }
</style>
