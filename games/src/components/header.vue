<template>
  <x-header :left-options="{backText: ''}">{{titleText}}<i slot="right" class="iconfont icon-gengduo"></i></x-header>
</template>
<script>
  import { XHeader } from 'vux'
  export default {
    props: {
      title: {
        type: String,
        default: '健视加'
      }
    },
    data () {
      return {
        titleText: ''
      }
    },
    methods: {},
    activated () {
      let that = this
      that.$nextTick(() => {
        that.titleText = that.title
      })
    },
    components: {
      XHeader
    }
  }
</script>
<style>
  .vux-header{
    position: absolute !important;
    width: 100%;
    top: 0;
    background: #fff !important;
  }
  .vux-header:after{
    position: absolute;
    width: 100%;
    content:"";
    height: 1px;
    bottom:0;
    z-index:1;
    background: #eee;
  }
  .vux-header .vux-header-title{
    color:#333 !important;
    font-size: .34rem;
  }
  .vux-header .vux-header-left .left-arrow:before{
    border: 1px solid #333;
  }
  .icon-gengduo{
    color:#333 !important;
  }
</style>
