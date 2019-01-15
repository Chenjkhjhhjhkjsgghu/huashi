<template>
  <div id="app">
    <keep-alive>
        <router-view>
        </router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
    let that = this
    that.$nextTick(() => {
      that.loaded = true
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  font-family:'微软雅黑'
}
a{
  color: #333;
}
.colorOrange{
  color:#ff8e01 !important;
}
.clear {
  clear:both;
}
// 成功弹窗
.weui-toast_success {
  font-size: .3rem;
  line-height: 1;
}
.weui-toast__content{
  font-size: .26rem;
  position: relative;
  width: 100%;
  text-align: center;
}
</style>
