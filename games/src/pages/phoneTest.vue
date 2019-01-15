<!-- 车行争霸 -->
<template>
  <div style="width:100%;height:100%;">
    <!-- <div class="box-container phoneBox"> -->
    <div class="box-container phoneBox" :style="boxStyle" style="background:red;">
      1111111
    </div>
  </div>
</template>
<script></script>
<script>
  import axios from 'axios'
  import { Group, Cell, Popup, XInput } from 'vux'
  export default{
    data () {
      return {
        value: '',
        boxStyle: '',
        imgList1: [{
          img: '../static/img/img1.png'
        }, {
          img: '../static/img/img2.png'
        }, {
          img: '../static/img/img3.png'
        }, {
          img: '../static/img/img4.png'
        }], // 历史记录列表
        code: 9, // 转盘值
        bettingList: [{
          codeList: [],
          jetonNumber: 10
        }, {
          codeList: [],
          jetonNumber: 20
        }, {
          codeList: [],
          jetonNumber: 60
        }, {
          codeList: [],
          jetonNumber: 100
        }, {
          codeList: [],
          jetonNumber: 205
        }, {
          codeList: [],
          jetonNumber: 103
        }, {
          codeList: [],
          jetonNumber: 101
        }, {
          codeList: [],
          jetonNumber: 189
        }], // 投注列表
        codeInterval: '',
        times: 30,
        direction: {
          pageUp: true,
          pageDown: true,
          pageLeft: true,
          pageRight: true
        }, // 方向键
        codeList: [{
          keyDown: false,
          numList: ['1', 'w'],
          padding: 0.12,
          img: '../../static/img/jeton1.png',
          status: false
        }, {
          keyDown: false,
          numList: ['1', '0', 'w'],
          padding: 0.05,
          img: '../../static/img/jeton2.png',
          status: false
        }, {
          keyDown: false,
          numList: ['5', '0', 'w'],
          padding: 0.1,
          img: '../../static/img/jeton3.png',
          status: false
        }, {
          keyDown: false,
          numList: ['1', '0', '0', 'w'],
          padding: '-0.02',
          img: '../../static/img/jeton4.png',
          status: false
        }, {
          keyDown: false,
          numList: ['1', '5', '0', 'w'],
          padding: '-0.02',
          img: '../../static/img/jeton5.png',
          status: false
        }, {
          keyDown: false,
          numList: ['5', '0', '0', 'w'],
          padding: '-0.02',
          img: '../../static/img/jeton6.png',
          status: false
        }], // 筹码列表
        codeIndex: '', // 筹码的索引值
        mouseCodeImg: '', // 鼠标跟随图片地址
        mouseCodeBox: true,
        coordinate: {
          x: '',
          y: ''
        },
        countDownNumber: {
          a: 0,
          b: 0
        },
        setCountDown: '', // 定时器名字
        recharge: {
          rechargeIndex: 0,
          rechargeList: [{
            img: '../../static/img/recharge1.png'
          }, {
            img: '../../static/img/recharge2.png'
          }, {
            img: '../../static/img/recharge3.png'
          }, {
            img: '../../static/img/recharge4.png'
          }]
        },
        helpTips: {
          helpTipsIndex: 0,
          helpTipsList: [{
            img: '../../static/img/helpTips1.png'
          }, {
            img: '../../static/img/helpTips2.png'
          }, {
            img: '../../static/img/helpTips3.png'
          }, {
            img: '../../static/img/helpTips4.png'
          }]
        },
        isVoiceHover: false,
        voice: {
          voiceIndex: 0,
          voiceStatus: true,
          voiceList: [{
            img: '../../static/img/voice1.png'
          }, {
            img: '../../static/img/voice2.png'
          }, {
            img: '../../static/img/voice3.png'
          }, {
            img: '../../static/img/voices.png'
          }]
        },
        voiceh: {
          voicehIndex: 0,
          voicehStatus: false,
          voicehList: [{
            img: '../../static/img/voiceh1.png'
          }, {
            img: '../../static/img/voiceh2.png'
          }, {
            img: '../../static/img/voiceh3.png'
          }, {
            img: '../../static/img/voicehs.png'
          }]
        },
        voiceTime: '', // 声音图标的三帧动画定时器
        degree: 90, // 屏幕整体旋转的角度, 可取 -90,90,180等值
        historyList: [1, 2, 3, 4, 5, 6, 7, 8, 3, 5, 2],
        setTopStatus: true,
        setRightStatus: true
      }
    },
    methods: {
      checkPassword () {
        let that = this
        axios({
          url: '/api/user.dealer.info/unlock',
          method: 'POST',
          data: {
            operation_password: that.value // 管理密码
          }
        }).then((response) => {
          if (response.error_code === 'SUCCESS') {
            that.$router.push({
              name: 'settingsRevise', // 跳转到该页面
              params: {
                key: response.result.operation_key
              }
            })
          } else {
            that.$vux.toast.text(response.reason, that.toastPosition)
          }
        })
      },
      getHorizontalStyle () {
        console.log(11111)
        let that = this
        const d = document
        const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
        const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
        let width = w
        let height = h
        let lHeight = (w / 640) * 1008
        let length = (h - w) / 2
        let length2 = length - (h - lHeight) / 2
        switch (this.degree) {
          case -90:
            length = -length
            break
          case 90:
            width = h
            height = w
            break
          default:
            length = 0
        }
        console.log(width)
        let data = {
          transform: `rotate(${this.degree}deg) translate(${length}px,${length2}px)`,
          width: `${lHeight}px`,
          height: `${height}px`,
          transformOrigin: 'center center'
        }
        console.log(data)
        that.boxStyle = data
        return data
      },
      setBox () {
        let that = this
        const d = document
        const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
        const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight
        if (w < h) {
          let height = (w / 640) * 1008
          console.log(w, h, height)
          let data = {
            width: `${height}px`,
            height: `${w}px`,
            top: `${(h - w) / 2}px`,
            left: `${0 - (height - w) / 2}px`,
            transform: `rotate(90deg)`,
            transform_origin: `50% 50%`
          }
          that.boxStyle = data
        }
        // let height = h
        // let lHeight = (h / 640) * 1008
        // let left = (w - lHeight) / 2
        // let data = {
        //   width: `${lHeight}px`,
        //   height: `${height}px`,
        //   marginLeft: `${left}px`
        //   top: `${(lHeight - height) / 2}px`

        // }
        // that.boxStyle = data
        // if( width < height ){
        //   console.log(width + " " + height);
        //   $print =  $('#print');
        //   $print.width(height);
        //   $print.height(width);
        //   $print.css('top',  (height-width)/2);
        //   $print.css('left',  0-(height-width)/2 );
        //   $print.css('transform' , 'rotate(90deg)');
        //   $print.css('transform-origin' , '50% 50%');
        // }
      },
      // numberConvert (number) {
      //   if (number === 0) {
      //     return ''
      //   }
      //   let nub = number.toString()
      //   console.log(nub.length)
      //   let str = ''
      //   for (let i = 0; i < nub.length; i++) {
      //     str = str + "<img src = '../static/img/nb" + nub[i] + ".png'>"
      //   }
      //   console.log(str)
      //   return str
      // },
      // 下注注码数
      numberConvert (number) {
        if (number === 0) {
          return []
        }
        let nub = number.toString()
        let arr = []
        for (let i = 0; i < nub.length; i++) {
          arr.push(nub[i])
        }
        return arr
      },
      betMouseover () {
      },
      // 点击筹码 鼠标按下时
      codeDown (i, index) {
        let that = this
        i.keyDown = true
        that.codeIndex = index
        for (let i = 0; i < that.codeList.length; i++) {
          that.codeList[i].status = false
        }
        i.status = true
        that.mouseCodeImg = that.codeList[index].img
      },
      // 点击筹码时 鼠标抬起时
      codeUp () {
        let that = this
        if (that.codeIndex === undefined || that.codeIndex === '') {
          return false
        }
        that.codeList[that.codeIndex].keyDown = false
        // mouseCode 鼠标上的注码跟随
        that.mouseCodeImg = that.codeList[that.codeIndex].img
        // console.log(that.mouseCodeImg)
      },
      // 跑马灯
      codeRun () {
        let that = this
        that.codeInterval = setInterval(function () {
          if (that.code === 32) {
            that.code = 0
          }
          that.code++
          if (that.times < 150) {
            that.times = that.times + 1
          } else if (that.times < 200) {
            that.times = that.times + 5
          } else if (that.times < 300) {
            that.times = that.times + 10
          } else if (that.times < 400) {
            that.times = that.times + 15
          } else if (that.times < 500) {
            that.times = that.times + 20
          } else if (that.times < 600) {
            that.times = that.times + 30
          }
          clearInterval(that.codeInterval)
          if (that.times < 500) {
            that.codeRun()
          }
        }, that.times)
      },
      // 在投注去 鼠标移动时
      mouseCodeMove () {
        let that = this
        let e = event || window.event
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop
        let x = e.pageX || e.clientX + scrollX
        let y = e.pageY || e.clientY + scrollY
        that.coordinate.x = x
        that.coordinate.y = y
        if (y < 208 || y > 453 || x > 640 || x < 115 || that.mouseCodeImg === '') {
          that.mouseCodeBox = false
        } else {
          that.mouseCodeBox = true
        }
        // console.log(that.coordinate)
      },
      // 在筹码区堆叠筹码
      betAdd (i) {
        let that = this
        console.log(that.mouseCodeImg)
        if (that.mouseCodeImg === '') {
          return false
        }
        let x = parseInt(Math.random() * 149) / 100 + 'rem'
        let y = parseInt(Math.random() * 140) / 100 + 'rem'
        i.codeList.push({
          img: that.mouseCodeImg,
          left: x,
          top: y
        })
        console.log(x)
        that.mouseCodeImg = ''
        that.mouseCodeBox = false
        console.log(i)
      },
      // 下注及开奖倒计时
      setTimeDown (time) {
        let that = this
        // let time = 20
        that.setCountDown = setInterval(function () {
          time--
          if (time === 0) {
            clearInterval(that.setCountDown)
          }
          that.countDownSet(time)
        }, 1000)
      },
      // 下注及开奖倒计时数字
      countDownSet (num) {
        let that = this
        if (num === '') {
          return false
        }
        let a = parseInt(num / 10)
        let b = parseInt(num % 10)
        that.countDownNumber.a = a * 0.26
        that.countDownNumber.b = b * 0.26
        console.log(that.countDownNumber.a, that.countDownNumber.b)
      },
      // 筹码区筹码的随机位置
      randomPosition () {
        console.log(13131)
      },
      // 声音开关
      soundToggle () {
        let that = this
        console.log(11111)
        that.voice.voiceStatus = !that.voice.voiceStatus
        that.voiceh.voicehStatus = !that.voiceh.voicehStatus
        console.log(that.voice.voiceStatus, 'voice')
        if (that.voice.voiceStatus === false) {
          that.voice.voiceIndex = 3
          that.voiceh.voicehIndex = 3
          clearInterval(this.voiceTime)
        } else {
          that.voice.voiceIndex = 0
          that.voiceh.voicehIndex = 0
          that.soundCarousel()
        }
      },
      // 三帧轮播图
      soundCarousel () {
        let that = this
        that.voiceTime = setInterval(function () {
          if (that.voice.voiceIndex < 2) {
            that.voice.voiceIndex++
            that.voiceh.voicehIndex++
          } else {
            that.voice.voiceIndex = 0
            that.voiceh.voicehIndex = 0
          }
        }, 100)
      },
      consoleText () {
        console.log('测试成功')
      },
      // 显示头部信息栏
      showTopMessage () {
        let that = this
        that.setTopStatus = !that.setTopStatus
        that.setRightStatus = true
      },
      // 显示右侧排行榜
      showRanking () {
        let that = this
        that.setRightStatus = !that.setRightStatus
        that.setTopStatus = true
      },
      // 鼠标移出屏幕时触发事件
      mouseOut () {
        // let that = this
        // that.codeList[that.codeIndex].keyDown = false
      },
      // 鼠标抬起时触发事件
      mouseup () {
        // let that = this
        // if (that.codeIndex !== '') {
        //   // that.codeList[that.codeIndex].keyDown = false
        // }
      }
    },
    mounted () {},
    activated () {
      let that = this
      // that.getHorizontalStyle()
      that.setBox()
      // that.codeRun()
      // that.setTimeDown(26)
    },
    components: {
      Group,
      Cell,
      Popup,
      XInput
    }
  }
</script>
<style type="text/css" scoped>
  .challenger {
    width: 70%;
    color: #b1afac;
    line-height: 1;
    width: 1.5rem;
    height: 0.6rem;
    position: absolute;
    top: 0.12rem;
    right: 0.1rem;
    font-size: 10px;
  }
  .challenger>div {
    line-height: 0.23rem;
    height: 0.23rem;
  }
  .rankingBox {
    color: #fff;
    font-size: 10px;
    line-height: 1;
    width: 2.6rem;
    position: absolute;
    left: 0.1rem;
    top: 22.8%;
    height: 52.5%;
  }
  .rankingBox table {
    width: 100%;
    height: 100%;
    color: #494949;
  }
  .rankingBox table tr {
    height: 10%;
  }
  .rankingBox td {
    font-size: 0.2rem;
    text-align: center;
  }
  .rankingBox tr {
    color: #bfbfbf;
  }
  .rankingBox table thead {
    color: #b8b8b8;
  }
  .rankingBox tbody tr:nth-child(1) {
    color: #ea0202;
  }
  .rankingBox tbody tr:nth-child(2) {
    color: #ff7e00;
  }
  .rankingBox tbody tr:nth-child(3) {
    color: #ffea00;
  }
  .rankingBox tr td:nth-child(4) {
    max-width: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .jiaP {
    position: relative;
  }
  .jiaP img {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.14rem;
  }
  .recharge {
    width: 1.4rem;
    height: 0.28rem;
    position: absolute;
    top: 5.34rem;
    right: 0.5rem;
  }
  .recharge img {
    width: 1.4rem;
    height: 0.28rem;
  }
  .helpTips {
    width: 1.4rem;
    height: 0.28rem;
    position: absolute;
    top: 5.78rem;
    right: 0.5rem;
  }
  .helpTips img {
    width: 1.4rem;
    height: 0.28rem;
  }
</style>
<style type="text/css" scoped>
  .phoneBox-top-box {
    width: 100%;
    height: 0.83rem;
    position: absolute;
    top: 0.01rem;
    left: 0;
    background: url(../../static/img/bc_top.png);
    background-size: 100%;
    z-index: 100;
  }
  .phoneTop {
    position: absolute;
    bottom: -0.26rem;
    left: 50%;
    margin-left: -0.32rem;
    width: 0.65rem;
    height: 0.26rem;
  }
  .phoneTop img {
    padding: 0;
    margin: 0;
    width: 0.65rem;
    height: 0.26rem;
    position: absolute;
  }
  .phoneBox-right-box {
    width:2.8rem;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: url(../../static/img/phone_right.jpg) no-repeat 0 0 / 100% 100%;
    z-index: 100;
  }
  .phoneRight {
    width: 0.65rem;
    height: 0.30rem;
    position: absolute;
    top: 50%;
    margin-top: -0.13rem;
    left: -0.48rem;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);   
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
  }
  .phoneRight img{
    padding: 0;
    margin: 0;
    width: 0.65rem;
    height: 0.26rem;
    position: absolute;
  }
  .shopownerMessage {
    width: 2.2rem;
    height: 0.82rem;
    padding: 0.04rem 0 0 0.1rem;
    float: left;
  }
  .shopownerMessage>div {
    color: #fff;
    line-height: 0.24rem;
    font-size: 0.1rem;
  }
  .headMessage {
    float: left;
    width: 4.1rem;
    height: 0.82rem;
    color: #e6e14f;
  }
  .tipsBox {
    width: 50%;
    overflow: hidden;
    float: left;
  }
  .tips {
    white-space: nowrap;
  }
  .AutoPat {
    width: 45%;
    float: right;
    font-size: 0.2rem;
    line-height: 1;
  }
  .pat {
    position: relative;
    padding-left: 0.3rem;
    padding-top: 0.02rem;
  }
  .pat input[type = 'checkbox'] {
    position: absolute;
    top: 0.04rem;
    left: 0;
  }
  .gamesNumberBox {
    position: relative;
    overflow: hidden;
  }
  .voiceBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 0.3rem;
    height: 0.3rem;
  }
  .voiceBox img {
    width: 0.3rem;
    height: 0.3rem;
    margin-top: 0.02rem;
  }
  .gamesNumber {
    width: 75%;
    float: right;
  }
  .beShopownerBox {
    position: absolute;
    top: 0;
    right: 0;
    width: 3.8rem;
    height: 0.83rem;
  }
  .beShopownerBox .beShopowner {
    width: 0.8rem;
    height: 0.72rem;
    position: relative;
    position: absolute;
    top: 0.1rem;
    left: 0.04rem;
  }
  .beShopownerBox .beShopowner img {
    width: 0.8rem;
    height: 0.72rem;
    position: absolute;
  }
  .lineUp {
    position: absolute;
    top: 0.1rem;
    right: 0;
    width: 2.9rem;
    height: 0.7rem;
    color: #fff;
    line-height: 1;
    font-size: 0.2rem;
  }
  .lineUp ul li {
    line-height: 0.22rem;
  }
  .operationBox {
    width: 0.32rem;
    height: 0.64rem;
    float: right;
    position: absolute;
    top: 0.1rem;
    right: 0.05rem;
  }
  .operationBox>span {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    overflow: hidden;
  }
  .pageUp {
    background: url(../../static/img/operation.png) no-repeat top;
    background-size: 100%;
  }
  .pageUpClick {
    background: url(../../static/img/left.png) no-repeat 0 0;
    background-size: 100%;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);             /* IE 9 */
    -webkit-transform: rotate(90deg);      /* Safari and Chrome */
    -o-transform: rotate(90deg);              /* Opera */
    -moz-transform: rotate(90deg);         /* Firefox */
  }
  .pageDown {
    background: url(../../static/img/operation.png) no-repeat bottom;
    background-size: 100%;
  }
  .pageDownClick {
    background: url(../../static/img/left.png) no-repeat 0 0;
    background-size: 100%;
    transform: rotate(270deg);
    -ms-transform: rotate(270deg);             /* IE 9 */
    -webkit-transform: rotate(270deg);      /* Safari and Chrome */
    -o-transform: rotate(270deg);              /* Opera */
    -moz-transform: rotate(270deg);         /* Firefox */
  }
  .topHidden {
    -webkit-animation: topHidden .35s forwards;
    -o-animation: topHidden .35s forwards;
    animation: topHidden .35s forwards;
  }
  .topShow {
    -webkit-animation: topShow .35s forwards;
    -o-animation: topShow .35s forwards;
    animation: topShow .35s forwards;
  }
  @keyframes topHidden {
    from {
      height: 0.83rem;
    }
    100% {
      height: 0rem;
    }
  }
  @-webkit-keyframes topHidden {
    from {
      height: 0.83rem;
    }
    100% {
      height: 0rem;
    }
  }
  @keyframes topShow {
    from {
      height: 0rem;
    }
    100% {
      height: 0.83rem;
    }
  }
  @-webkit-keyframes topShow {
    from {
      height: 0rem;
    }
    100% {
      height: 0.83rem;
    }
  }
  .rightHidden {
    -webkit-animation: rightHidden .35s forwards;
    -o-animation: rightHidden .35s forwards;
    animation: rightHidden .35s forwards;
  }
  .rightShow {
    -webkit-animation: rightShow .35s forwards;
    -o-animation: rightShow .35s forwards;
    animation: rightShow .35s forwards;
  }
  @keyframes rightHidden {
    from {
      width: 2.8rem;
    }
    100% {
      width: 0rem;
    }
  }
  @-webkit-keyframes rightHidden {
    from {
      width: 2.8rem;
    }
    100% {
      width: 0rem;
    }
  }
  @keyframes rightShow {
    from {
      width: 0rem;
    }
    100% {
      width: 2.8rem;
    }
  }
  @-webkit-keyframes rightShow {
    from {
      width: 0rem;
    }
    100% {
      width: 2.8rem;
    }
  }
</style>
<style type="text/css" scoped>
  .phoneBox {
    /*transform: rotate(90deg);
    -ms-transform: rotate(90deg);   
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -moz-transform: rotate(90deg);*/
  }
  * {
    font-size: 10px;
  }
  li {
    list-style: none;
  }
  .phoneBox {
    position: relative;
  }
  .phoneBox-main-box {
    width:100%;
    height: 100%;
    background: url(../../static/img/bc_main.jpg) no-repeat 0px 0px;
    background-size: 100%;
  }
  .winningBox {
    width: 100%;
    height: 5.6rem;
    position: relative;
    box-sizing: border-box;
    padding: 0.06rem 0.1rem;
  }
  .winningBox ul li {
    background: url(../../static/img/winBc1.png) no-repeat;
    background-size: 100%;
  }
  .winningBox ul li .img1 {
    background: url(../../static/img/imgList.png) no-repeat 0px -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img2 {
    background: url(../../static/img/imgList.png) no-repeat -1.06rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img3 {
    background: url(../../static/img/imgList.png) no-repeat -2.12rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img4 {
    background: url(../../static/img/imgList.png) no-repeat -3.18rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img5 {
    background: url(../../static/img/imgList.png) no-repeat -4.24rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img6 {
    background: url(../../static/img/imgList.png) no-repeat -5.30rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img7 {
    background: url(../../static/img/imgList.png) no-repeat -6.36rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img8 {
    background: url(../../static/img/imgList.png) no-repeat -7.42rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .imgChoose1 {
    background: url(../../static/img/imgChoose.png) no-repeat 0.04rem 0px;
    transform: scale(1.2);
    background-size: 840%;
    width: 100%;
  }
  .winningBox ul li .imgChoose2 {
    background: url(../../static/img/imgChoose.png) no-repeat -1.1rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winningBox ul li .imgChoose3 {
    background: url(../../static/img/imgChoose.png) no-repeat -2.2rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winningBox ul li .imgChoose4 {
    background: url(../../static/img/imgChoose.png) no-repeat -3.3rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winningBox ul li .imgChoose5 {
    background: url(../../static/img/imgChoose.png) no-repeat -4.44rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winningBox ul li .imgChoose6 {
    background: url(../../static/img/imgChoose.png) no-repeat -5.56rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winningBox ul li .imgChoose7 {
    background: url(../../static/img/imgChoose.png) no-repeat -6.68rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winningBox ul li .imgChoose8 {
    background: url(../../static/img/imgChoose.png) no-repeat -7.8rem 0px;
    transform: scale(1.2);
    background-size: 840%;
  }
  .winingMain {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .winingMain li {
    width: 1.06rem;
    height: 0.58rem;
    float: left;
    position: relative;
  }
  .winningBox ul li>div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .wTop li,.wBottom li {
    margin-left: 0.04rem;
  }
  .wTop{
    width: 7.7rem;
    height: 0.58rem;
    position: absolute;
    top: 0;
    left: 1.1rem;
  }
  .wBottom {
    width: 7.7rem;
    height: 0.58rem;
    position: absolute;
    bottom: 0;
    left: 1.1rem;
  }
  .wLeft {
    width: 1.06rem;
    height: 100%;
    position: absolute;
    left: 0.04rem;
    top: 0;
  }
  .wLeft li, .wRight li {
    margin-bottom: 0.03rem;
  }
  .wRight {
    width: 1.06rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .wTop li:nth-child(2n+1),
  .wBottom li:nth-child(2n+1){
    background: url(../../static/img/winBc2.png) no-repeat center;
    background-size: 100%;
  }
  .wLeft li:nth-child(2n),
  .wRight li:nth-child(2n){
    background: url(../../static/img/winBc2.png) no-repeat center;
    background-size: 100%;
  }
  .bettingBox {
    width: 7.74rem;
    height: 4.28rem;
    position: absolute;
    top: 0.66rem;
    left: 1.18rem;
  }
  .bettingTop {
    width: 1.7rem;
    height: 0.4rem;
    position: absolute;
    top: 0.02rem;
    left: 50%;
    margin-left: -0.85rem;
    color: #45fe00;
    font-size: 14px;
  }
  .bettingTop span {
    display: inline-block;
  }
  .bettingTop .countDown{
    color: transparent;
    width: 0.25rem;
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .bettingMain {
    position: absolute;
    top: 0.6rem;
    width: 100%;
    left: 3px;
    height: 3.7rem;
  }
  .bettingMain li{
    width: 1.89rem;
    height: 1.80rem;
    float: left;
    background: url(../../static/img/bet_bc2.jpg) no-repeat center;
    margin-left: 1px;
    margin-bottom: 2px;
    position: relative;
    border: 2px solid transparent;
  }
  .bettingMain li:hover {
    border: 2px solid #e0ce0b;
  }
  .numberBox {
    position: absolute;
    top: 0.4rem;
    width: 100%;
    z-index: 10;
  }
  .numberBox>div {
    text-align: center;
  }
  .rateBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .betCodeBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .betCodeBox img{
    width: 0.4rem;
    height: 0.4rem;
    opacity: 1;
  }
  .main-bottom {
    left: 0;
    bottom:2px;
    height: 0.85rem;
    position: relative;
  }
  .myMessage {
    width: 2.06rem;
    height: 0.85rem;
    background:url(../../static/img/myMessage.png) no-repeat;
    background-size: 100%;
    color: #f4f401;
    box-sizing: border-box;
    padding-top: 0.08rem;
    padding-left: 0.22rem;
    float: left;
  }
  .myMessage>div {
    font-size: 10px;
    line-height: 1;
  }


  .betNumber {
    width: 5.1rem;
    height: 0.85rem;
    position: absolute;
    left: 2.1rem;
  }
  .noteCode {
    width: 100%;
    height: 0.55rem;
    box-sizing: border-box;
  }
  .noteCode ul li {
    float: left;
    width: 0.52rem;
    height: 0.52rem;
    margin-right: 0.2rem;
    position: relative;
    opacity: 0.7;
  }
  .noteCode ul li>img {
    width: 0.52rem;
    height: 0.52rem;
  }
  .noteCode .betAgain {
    position: absolute;
    width: 0.67rem;
    height: 0.52rem;
    top: 0.02rem;
    right: 0px;
    background: url(../../static/img/repeat.png) no-repeat;
    background-size: 100%;
  }
  .noteCode .betAgain img{
    width: 100%;
  }
  .hisBox {
    width: 100%;
    height: 0.26rem;
    box-sizing: border-box;
    padding: 0 0.32rem;
    overflow: hidden;
  }
  .historicalRecords {
    height: 0.26rem;
    background:url(../../static/img/history.png) no-repeat 0px -1px;
    background-size: 100%;
    position: absolute;
    bottom: 2px;
    width: 100%;
  }
  .historicalRecords ul {
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
  .historicalRecords ul li {
    text-align: center;
    float: left;
    height: 100%;
    width: 0.396rem;
    float: left;
    text-align: center;
    position: relative;
  }
  .historicalRecords img{
    /*width: 16px;
    margin-top: 8px;*/
  }
  .pageLeftBox {
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    top: -0.01rem;
    left: 0;
  }
  .pageRightBox {
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    top: -0.01rem;
    right: 0.02rem;
  }
  .pageLeftBox>span.pageLeftClick, .pageRightBox>span.pageRightClick{
    width: 100%;
    height: 100%; 
    display: block;
  }
  .pageLeftClick {
    background: url(../../static/img/left.png) no-repeat 0px 0;
    background-size: 100%;
  }
  .pageRightClick {
    background: url(../../static/img/left.png) no-repeat 0 0;
    background-size: 100%;
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);             /* IE 9 */
    -webkit-transform: rotate(180deg);      /* Safari and Chrome */
    -o-transform: rotate(180deg);              /* Opera */
    -moz-transform: rotate(180deg);         /* Firefox */
  }
  .codeNumber {
    width: 120%;
    position: absolute;
    top:50%;
    margin-top: -0.08rem;
    text-align: center;
    text-align: center;
  }
  .codeNumber img {
    float: left;
    height: 0.16rem;
    /*z-index: 2;*/
  }
  .warning {
    width: 2.8rem;
    height: 0.85rem;
    position: absolute;
    top: 0;
    right: 0;
    background: url(../../static/img/warningPhone.png) no-repeat 0 0;
    background-size: 100%;
  }
  .noteCode ul>li.codeMargin {
    margin-top: 0.02rem;
  }
  .noteCode ul>li.codeOpacity {
    opacity: 1;
  }
  .noteCode ul>li:hover img{
  }
  @keyframes setMagin {
    from {
      margin-top: 0.0rem;
    }
    50% {
      margin-top: 0.02rem;
    }
    100% {
      margin-top: 0.0rem;
    }
  }
  @-webkit-keyframes setMagin {
    from {
      margin-top: 0.0rem;
    }
    50% {
      margin-top: 0.02rem;
    }
    100% {
      margin-top: 0.0rem;
    }
  }
  /*.clickBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }*/

</style>

