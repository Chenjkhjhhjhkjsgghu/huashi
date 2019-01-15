<template>
  <div>
    <!-- 输入验证码 -->
    <div v-transfer-dom>
      <x-dialog v-model="showCodeTips" class="tips-box top-box">
        <i class="iconfont icon-guanbi" @click="closeKeyboard(2)"></i>
        <i class="iconfont icon-jiantou" @click="closeKeyboard(1)"></i>
        <p class="tips-title">请输入验证码</p>
        <p class="tips-text">验证码发送至{{telephone}}</p>
        <div class="tips-body code-box">
          <div class="btn-time" @click="sendCode">{{ codeText }}</div>
          <div class="code-line">
            <div v-for="i in 4" @click="lineActive = i" :class="{'active': lineActive == i}">
              <!-- 光标 -->
              <!-- <div class="cursor" v-if="lineActive == i">|</div> -->
              <div class="num-box">{{code[i-1]}}<span v-if="lineActive == i" class="cursor">|</span></div>
            </div>
          </div>
        </div>
        <div class="tips-footer bg-orange" @click="checkTelCode">下一步</div>
      </x-dialog>
    </div>
    <!-- 虚拟键盘 -->
    <div class="keyboard-box" v-transfer-dom :style="{'height': setHeight()}" v-show="showKeyBoard">
      <div v-for="i in 9" @click="keyBoardDown(i)">
        <p>{{i}}</p>
        <P>{{keyboardList[i-1]}}</P>
      </div>
      <div class="gray"></div>
      <div class="null" @click="keyBoardDown(0)">
        0
      </div>
      <!-- 删除 -->
      <div class="gray null del" @click="keyBoardDown('del')">
        <i class="iconfont icon-huitui"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import { TransferDom, XDialog, PopupPicker, Group } from 'vux'
  import Vue from 'vue'
  export default {
    props: {
      tel: {
        default: 0,
        type: String
      }
    },
    data () {
      return {
        telephone: 0,
        code: ['', '', '', ''],
        lineActive: 1,
        isSend: false, // 验证码发送
        codeTime: 60,
        codeText: 's后重发',
        inSending: false, // 验证码是否正在发送
        showTelTips: true, // 手机号
        showCodeTips: true, // 验证码
        showKeyBoard: true, // 虚拟键盘
        keyboardList: ['', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'] // 虚拟键盘下小字母
      }
    },
    methods: {
      setHeight () {
        let that = this
        if (that.showKeyBoard) {
          return '4.8rem'
        } else {
          return '0'
        }
      },
      // 验证码倒计时
      setCodeTime () {
        let that = this
        if (that.inSending) {
          return false
        }
        that.inSending = true
        let timer1 = setInterval(() => {
          if (that.codeTime > 0) {
            that.codeTime--
            that.codeText = that.codeTime + 's后重发'
          } else {
            window.clearInterval(timer1)
            that.codeTime = 60
            that.inSending = false
            that.isSend = false
            that.codeText = '重新发送'
          }
        }, 1000)
      },
      // 发送验证码 输入验证码超时后 重新获取验证码
      sendCode () {
        let that = this
        if (!that.inSending) {
          that.setCodeTime()
          console.log('重新发送')
        }
      },
      // 检测验证码 并把验证码传出去
      checkTelCode () {
        let that = this
        for (let i = 0; i < that.code.length; i++) {
          if (that.code[i] === '') {
            console.log('验证码不正确')
            return false
          }
        }
        console.log('传出去', that.code)
        this.$emit('getFourCode', that.code)
        // that.$vux.toast.text('请输入四位验证码', that.toastPosition)
        // 提示框层级不够
      },
      // 关闭验证码弹窗 // 1是返回 2是关闭
      closeKeyboard (status) {
        let that = this
        that.$emit('closeKeyboard', status)
      },
      // 虚拟键盘按下
      keyBoardDown (key) {
        let that = this
        let index = that.lineActive - 1
        if (key !== 'del') {
          // 输入
          let newVal = String(that.code)
          Vue.set(that.code, index, key)
          if (newVal.length > 0) {
            // 当前格有内容 跳转至下格
            if (that.lineActive < that.code.length) {
              // Vue.set(that.code, index + 1, '')
              that.lineActive = that.lineActive + 1
            } else {
              that.lineActive = that.code.length
            }
          }
        } else {
          let newVal = String(that.code[index])
          // 本格有内容
          Vue.set(that.code, index, '')
          if (newVal.length <= 0 && index !== 0) {
            // 清除上格
            console.log('删上')
            Vue.set(that.code, index - 1, '')
            that.lineActive = index
          }
        }
      }
    },
    mounted () {
      let that = this
      that.telephone = that.tel
      console.log('tel', that.tel)
      that.setCodeTime()
    },
    components: {
      XDialog,
      Group,
      PopupPicker
    },
    directives: {
      TransferDom
    }
  }
</script>
<style>
  .tips-box{
    background:#fff;
    border-radius: .4rem;
  }
  .tips-box .weui-dialog{
    padding-top: .86rem;
    width: 83%;
    max-width: 3000px;
    border-radius: .1rem;
  }
  .tips-box.top-box .weui-dialog{
    top: 30%;
  }
  .tips-box .icon-jiantou{
    position: absolute;
    left: .2rem;
    top: .2rem;
    font-size: .4rem;
    transform: rotate(180deg);
    color:#666;
  }
  .tips-box .icon-jiantou:before{
  }
  .tips-box .icon-guanbi{
    position: absolute;
    right: .2rem;
    top: .2rem;
    font-size: .4rem;
  }
  .tips-box .tips-title{
    font-size: .34rem;
    color:#333;
    margin-bottom: .43rem;
  }
  .tips-box .tips-text{
    font-size: .24rem;
    text-align: center;
    margin-bottom: .23rem;
  }
  .tips-box .tips-body{
    position: relative;
    font-size: .24rem;
    color:#333;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    margin-bottom: .63rem;
    padding:0 .44rem;
    align-items: center;
  }
  .tips-box .tips-body.tel-box{
    height: .6rem;
  }
  .tips-box .tips-body.tel-box:after{
    position: absolute;
    content:" ";
    left: .44rem;
    right: .44rem;
    bottom:0;
    height: 1px;
    background: #ccc;
  }
  .tips-box .tips-body.tel-box input{
    margin-left: 2%;
    height: .6rem;
    width: 68%;
    border: 0;
    outline: none;
    font-size: .24rem;
  }
  .tips-box .tips-body.tel-box .nation-code{
    width: 30%
  }
  .tips-box .tips-footer{
    height:.87rem;
    text-align: center;
    width: 100%;
    font-size: .32rem;
    color:#fff;
    line-height: .87rem;
  }
  .tips-box .tips-body.code-box .btn-time{
    border:1px solid #ccc;
    width: 2rem;
    height: .7rem;
    line-height: .7rem;
    border-radius: .15rem;
    color: #999;
    margin-bottom: .24rem;
  }
  .tips-box .tips-body.code-box .code-line{
    position: relative;
    display: flex;
    justify-content:space-around;
    width: 100%;
  }
  .tips-box .tips-body.code-box .code-line>div{
    position: relative;
    width: .9rem;
    height: .9rem;
    border: 1px solid #ccc;
    line-height: .9rem;
  }
  .tips-box .tips-body.code-box .code-line>div.active{
    border: 1px solid #ff7715;
  }
  .tips-box .tips-body.code-box .code-line .cursor{
    position: relative;
    color: #ff7715;
    font-size: .6rem;
    line-height: .8rem;
    height: .9rem;
    opacity: 0;
    animation: shade .5s infinite linear;
  }
  .tips-box .tips-body.code-box .code-line .num-box{
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: .8rem;
    font-size: .5rem;
    text-align: center;
    left: 0;
    top: 0;
  }
  @keyframes shade{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  /*虚拟键盘*/
  .keyboard-box{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    z-index:9999;
    height: 0;
    transition: all 2s;
    -moz-transition: all 2s;  /* Firefox 4 */
    -webkit-transition: all 2s; /* Safari 和 Chrome */
    -o-transition: all 2s;
  }
  .keyboard-box>div{
    width: 33.3%;
    height: 1.2rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: .1rem 0;
  }
  .keyboard-box>div.gray{
    background: #ccc;
    font-size: .6rem;
  }
  .keyboard-box .null{
    font-size: .8rem;
    line-height: 1rem;
    font-size: .6rem;
  }
  .keyboard-box>div>p:first-child{
    color: #333;
    font-size: .6rem;
    line-height: .6rem;
  }
  .keyboard-box>div>p:nth-child(2){
    color: #333;
    font-size: .3rem;
    line-height: .4rem;
  }
  .keyboard-box>div.gray .icon-huitui {
    font-size: 0.6rem;
  }
</style>