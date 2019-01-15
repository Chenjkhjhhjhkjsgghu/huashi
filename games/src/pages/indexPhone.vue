<!-- 车行争霸 -->
<template>
  <div style="width:100%;height:100%;">
    <!-- <div class="box-container phoneBox"> -->
    <div class="box-container phoneBox" :style="boxStyle">
      <div class="phoneBox-top-box" :class = "setTopStatus ? 'topHidden' : 'topShow'">
        <div class="phoneTop" @click = 'showTopMessage'>
          <img src="/static/img/phoneOpen.png">
        </div>
        <div style="overflow:hidden;position:relative;" :class = "setTopStatus ? 'topHidden' : 'topShow'">
          <div class="shopownerMessage">
            <div class="shopownerMessageBox">
              <div>当前店长: [外]35131313131</div>
              <div>担任届数: 7</div>
              <div>店长财富: 12131234211</div>
            </div>
          </div>
          <div class="headMessage">
            <div class="left tipsBox">
              <div class="tips">
                <p class="textScroll">友情提示：官方不以任何方式回收游戏豆，并严厉打击金币回收，一经发现将严肃处理!</p>
              </div>
              <div class="gamesNumberBox" >
                <div class="voiceBox">
                  <div class="voice" v-if = '!isVoiceHover' >
                    <img :src="i.img" v-for = '(i,index) in voice.voiceList' v-if = 'voice.voiceIndex === index'>
                  </div>
                  <div class="voice" v-else>
                    <img :src="i.img" v-for = '(i,index) in voiceh.voicehList' v-if = 'voiceh.voicehIndex === index'>
                  </div>
                  <div style="" @click = 'soundToggle' @mouseover = 'isVoiceHover = true' @mouseout = 'isVoiceHover = false'>
                  </div>
                </div>
                <div class="gamesNumber" >
                  第
                  <span class="">1231</span>
                  局
                </div>
              </div>
            </div>
            <div class="right AutoPat">
              <div class="AutoPatTips">金额不足10000万不能申请做店长</div>
              <div class="pat"><input type="checkbox" name=""><span class="AutoPatText">自动排庄</span></div>
            </div>
          </div>
          <div class="beShopownerBox">
              <div class="beShopowner"> 
                <img src='/static/img/dianzhang.png'>
              </div>
              <div class="lineUp">
                 <ul>
                   <li v-for = 'i in 3'><span class="nickName">[百]66666</span><span>666666666</span></li>
                 </ul>
              </div>
              <div class="operationBox">
                 <span style="" :class="direction.pageUp ? 'pageUp' : 'pageUpClick'" @touchend = 'direction.pageUp = true' @touchstart = 'direction.pageUp = false' @mouseleave = 'direction.pageUp = true'></span>
                 <span style="" :class="direction.pageDown ? 'pageDown' : 'pageDownClick'" @touchend = 'direction.pageDown = true' @touchstart = 'direction.pageDown = false' @mouseleave = 'direction.pageDown = true'></span>
              </div>
          </div>
        </div>
      </div>
      <div class="phoneBox-right-box" :class = "setRightStatus ? 'rightHidden' : 'rightShow'">
        <div class="phoneRight" @click = 'showRanking'>
          <img src="/static/img/phoneOpen.png" >
        </div>
        <div style="overflow:hidden;position:relative;width:2.8rem;height:100%;" :class = "setRightStatus ? 'rightHidden' : 'rightShow'">
          <div class="challenger">
            <div>[外]35</div>
            <div>713131</div>
            <div>11111231</div>
          </div>
          <div class="rankingBox">
            <table>
              <thead>
                <tr>
                  <td>名次</td>
                  <td>昵称</td>
                  <td>Id</td>
                  <td>金额</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for = '(i,index) in 10'>
                  <td>{{ index + 1 }}</td>
                  <td>[百]66</td>
                  <td><div class="jiaP">99<img src="/static/img/pHotel.png" v-if = 'false'></div></td>
                  <td>8938976</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 充值 -->
          <div class="recharge" @click = '' @touchstart = 'recharge.rechargeIndex = 2' @touchend = 'recharge.rechargeIndex = 0'>
            <img :src="i.img" v-for = '(i,index) in recharge.rechargeList' v-if = 'recharge.rechargeIndex === index'>
          </div>
          <!-- 充值 -->
          <!-- 帮助 -->
          <!-- <div class="">
           <img src="/static/img/helpTips1.png">
          </div> -->
          <div class="helpTips" @touchstart = 'helpTips.helpTipsIndex = 2' @touchend = 'helpTips.helpTipsIndex = 0'>
            <img :src="i.img" v-for = '(i,index) in helpTips.helpTipsList' v-if = 'helpTips.helpTipsIndex === index'>
          </div>
          <!-- 帮助 -->
        </div>
      </div>
      <div class="phoneBox-main-box">
        <div>
          <!-- 转盘区 -->
          <div class="winningBox">
            <div class="winingMain">
                <div class="wTop">
                  <ul>
                    <li><div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 2'></div></li>
                    <li><div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 3'></div></li>
                    <li><div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 4'></div></li>
                    <li><div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 5'></div></li>
                    <li><div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 6'></div></li>
                    <li><div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 7'></div></li>
                    <li><div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 8'></div></li>
                    <div class="clear"></div>
                  </ul>
                </div>
                <div class="wRight">
                  <ul>
                    <li><div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 9'></div></li>
                    <li><div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 10'></div></li>
                    <li><div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 11'></div></li>
                    <li><div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 12'></div></li>
                    <li><div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 13'></div></li>
                    <li><div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 14'></div></li>
                    <li><div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 15'></div></li>
                    <li><div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 16'></div></li>
                    <li><div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 17'></div></li>
                    <div class="clear"></div>
                  </ul>
                </div>
                <div class="wBottom">
                  <ul>
                    <li><div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 24'></div></li>
                    <li><div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 23'></div></li>
                    <li><div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 22'></div></li>
                    <li><div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 21'></div></li>
                    <li><div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 20'></div></li>
                    <li><div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 19'></div></li>
                    <li><div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 18'></div></li>
                    <div class="clear"></div>
                  </ul>
                </div>
                <div class="wLeft">
                  <ul>
                    <li><div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 1'></div></li>
                    <li><div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 32'></div></li>
                    <li><div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 31'></div></li>
                    <li><div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 30'></div></li>
                    <li><div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 29'></div></li>
                    <li><div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 28'></div></li>
                    <li><div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 27'></div></li>
                    <li><div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 26'></div></li>
                    <li><div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 25'></div></li>
                    <div class="clear"></div>
                  </ul>
                </div>
                </div>
          </div>
          <!-- 转盘区 -->
          <!-- 投注区 -->
          <div class="bettingBox">
            <div class="bettingTop">
              <span>下注时间</span>
              <span class="countDown countDown1" :style="'background:url(/static/img/countDownPhone.png) no-repeat -' + countDownNumber.a + 'rem 0.0rem / 1050% 100%;'">1</span>
              <span class="countDown countDown2" :style="'background:url(/static/img/countDownPhone.png) no-repeat -' + countDownNumber.b + 'rem 0.0rem / 1050% 100%;'">1</span>
            </div>
            <div class="bettingMain" @mousemove = 'mouseCodeMove'>
              <ul>
                <li style="" v-for = '(i,index) in bettingList' @click = 'betAdd(i)'>
                  <div class="numberBox" v-if = 'false'>
                    <div>
                      <img :src="'/static/img/nb0.png'">
                    </div>
                  </div>
                  <div class="numberBox" v-else>
                    <div>
                      <img v-for = '(i,index) in i.jetonNumberList' :src="'/static/img/nb' + i +'.png'" >
                      <img :src="'/static/img/nbw.png'">
                    </div>
                  </div>
                  <div :style="'background:url(/static/img/rate2.png) no-repeat -' + (index * 1.82 + 0.04) + 'rem 0px / 800% 100%;'" class="rateBox">
                  </div>
                  <div class="betCodeBox">
                    <img :src="j.img" v-for = '(j,index2) in i.codeList' :style = "'position: absolute;left:' + j.left + ';top:' + j.top">
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 投注区 -->
          <!-- 注码区 -->
          <div class="main-bottom">
            <!-- 我的信息 -->
            <div class="myMessage">
              <div class="myMessageBox">
                <div>昵称:[外]35</div>
                <div>财富:1</div>
                <div>成绩:12314113131</div>
              </div>
            </div>
            <!-- 我的信息 -->
            <div class="betNumber">
              <div class="noteCode">
                <ul>
                  <li v-for = '(i,index) in codeList' :class="{codeMargin : i.keyDown, codeOpacity: i.status}" @touchstart = 'codeDown(i, index)'  @touchend = 'i.keyDown = false' >
                    <img :src="i.img" :style = ''>
                    <div class="imgHover" v-if = 'gameStatus === 0 && i.status'>
                    </div>
                    <!-- <div class="codeNumber" :style="'padding-left:' + i.padding +'rem;'" >
                      <img :src="'/static/img/nb' + j + '.png'" v-for = 'j in i.numList'>
                    </div> -->
                    <div class="codeNumber">
                      <div style="text-align:center;overflow:hidden;">
                        <img :src="'/static/img/nb' + j + '.png'" v-for = 'j in i.numList'>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="betAgain">
                </div>
              </div>
              <div class="historicalRecords">
                <div class="pageLeftBox" @touchend = 'direction.pageLeft = true' @touchstart = 'direction.pageLeft = false' @mouseleave = 'direction.pageLeft = true'>
                   <span class="pageLeftClick" v-if = '!direction.pageLeft'></span>
                </div>
                <div class="pageRightBox" @touchend = 'direction.pageRight = true' @touchstart = 'direction.pageRight = false' @mouseleave = 'direction.pageRight = true'>
                  <span class="pageRightClick" v-if = '!direction.pageRight'></span>
                </div>
                <div class="hisBox">
                  <ul>
                    <li v-for = 'i in historyList' :style = "'background:url(/static/img/historyImg.png) no-repeat -' + (i * 0.4 - 0.4) + 'rem 0 / 800% 100%'">
                      <!-- <img :src="imgList1[0].img"> -->
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="warning">
              
            </div>
          </div>
          <!-- 注码区 -->
        </div>
      </div>
    </div>
    <div style="display:none;" class="roundList">
      <audio autoplay="autoplay" v-for = '(i,index) in roundList' :key = 'index'>
        <source src="/static/sounds/sound6.wav" type="audio/mpeg" />
      </audio>
      <!-- <audio loop="loop" autoplay="autoplay">
        <source src="/static/sounds/sound6.wav" type="audio/mpeg" />
      </audio>
      <audio loop="loop" autoplay="autoplay">
        <source src="/static/sounds/sound6.wav" type="audio/mpeg" />
      </audio> -->
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
          img: '/static/img/img1.png'
        }, {
          img: '/static/img/img2.png'
        }, {
          img: '/static/img/img3.png'
        }, {
          img: '/static/img/img4.png'
        }], // 历史记录列表
        code: 5, // 大转盘码
        gameStatus: 0, // 游戏阶段 0是下注阶段 1是开奖阶段 2是休息阶段
        bettingList: [{
          codeList: [], // 筹码列表
          jetonNumber: 0, // 开奖区域筹码数
          jetonNumberList: [],
          proportion: 3, // 筹码对应的开奖比重
          code: 0, // 筹码标号
          rate: 40, // 筹码倍率
          playerPump: 0, // 玩家抽水总数
          MyjetonNumber: '' // 对应下注筹码数
        }, {
          codeList: [],
          jetonNumber: 0,
          proportion: 4,
          jetonNumberList: [],
          code: 1,
          rate: 30,
          playerPump: 0,
          MyjetonNumber: ''
        }, {
          codeList: [],
          jetonNumber: 0,
          jetonNumberList: [],
          proportion: 6,
          code: 2,
          rate: 20,
          playerPump: 0,
          MyjetonNumber: ''
        }, {
          codeList: [],
          jetonNumber: 0,
          proportion: 12,
          jetonNumberList: [],
          code: 3,
          rate: 10,
          playerPump: 0,
          MyjetonNumber: ''
        }, {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 4,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: ''
        }, {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 5,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: ''
        }, {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 6,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: ''
        }, {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 7,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: ''
        }], // 投注列表
        betIndex: '',
        codeInterval: '',
        randomCodeInterval: '',
        times: 150,
        direction: {
          pageUp: true,
          pageDown: true,
          pageLeft: true,
          pageRight: true
        }, // 方向键
        codeList: [{
          keyDown: false,
          numList: ['1', '0', 'w'],
          img: '/static/img/jeton1.png',
          number: 10
        }, {
          keyDown: false,
          numList: ['2', '0', 'w'],
          img: '/static/img/jeton2.png',
          number: 20
        }, {
          keyDown: false,
          numList: ['5', '0', 'w'],
          img: '/static/img/jeton3.png',
          number: 50
        }, {
          keyDown: false,
          numList: ['1', '0', '0', 'w'],
          img: '/static/img/jeton4.png',
          number: 100
        }, {
          keyDown: false,
          numList: ['1', '5', '0', 'w'],
          img: '/static/img/jeton5.png',
          number: 150
        }, {
          keyDown: false,
          numList: ['5', '0', '0', 'w'],
          img: '/static/img/jeton6.png',
          number: 500
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
        winCode: '',
        setCountDown: '', // 定时器名字
        recharge: {
          rechargeIndex: 0,
          rechargeList: [{
            img: '/static/img/recharge1.png'
          }, {
            img: '/static/img/recharge2.png'
          }, {
            img: '/static/img/recharge3.png'
          }, {
            img: '/static/img/recharge4.png'
          }]
        },
        helpTips: {
          helpTipsIndex: 0,
          helpTipsList: [{
            img: '/static/img/helpTips1.png'
          }, {
            img: '/static/img/helpTips2.png'
          }, {
            img: '/static/img/helpTips3.png'
          }, {
            img: '/static/img/helpTips4.png'
          }]
        },
        isVoiceHover: false,
        voice: {
          voiceIndex: 0,
          voiceStatus: false,
          voiceList: [{
            img: '/static/img/voice0.png'
          }, {
            img: '/static/img/voice1.png'
          }, {
            img: '/static/img/voice2.png'
          }, {
            img: '/static/img/voice3.png'
          }, {
            img: '/static/img/voices.png'
          }]
        },
        voiceh: {
          voicehIndex: 0,
          voicehStatus: false,
          voicehList: [{
            img: '/static/img/voiceh0.png'
          }, {
            img: '/static/img/voiceh1.png'
          }, {
            img: '/static/img/voiceh2.png'
          }, {
            img: '/static/img/voiceh3.png'
          }, {
            img: '/static/img/voicehs.png'
          }]
        },
        voiceTime: '', // 声音图标的三帧动画定时器
        stage: 1,
        gamesNumber: 1,
        myMessage: {
          nickname: '',
          id: '',
          glod_coin: 0,
          jetonNumber: 0
        },
        shopownerMessage: {
          jetonNumber: 500000000,
          profit: ''
        },
        showTips: {
          status: false,
          text: '金额不足，不能投注！'
        },
        myCodeMessage: [],
        timeOver: false, // 倒计时结束时
        awardResults: false,
        winId: 921921,
        bankerId: 921920,
        pumpPercentage: 0.005,
        userJeton: 0, // 用户总的下注筹码
        userProfit: 0, // 用户当次游戏收益
        alluserProfit: 0, // 用户进入游戏后的所有收益
        degree: 90, // 屏幕整体旋转的角度, 可取 -90,90,180等值
        historyList: [1, 2, 3, 4, 5, 6, 7, 8, 3, 5, 2],
        setTopStatus: true,
        setRightStatus: false,
        roundList: []
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
        // let lWidth = (height / 1008) * 640
        console.log(height, lHeight)
        if (height > lHeight) {
          // 实际值大于计算值
          // console.log('实际值大于计算值')
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
          // console.log(width)
          let data = {
            transform: `rotate(${this.degree}deg) translate(${length}px,${length2}px)`,
            width: `${lHeight}px`,
            height: `${height}px`,
            transformOrigin: 'center center'
          }
          console.log(data)
          that.boxStyle = data
          return data
        } else {
          // console.log('计算值大于实际值,走这里')
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
            width: `${504}px`,
            height: `${320}px`,
            transformOrigin: 'center center'
          }
          console.log(data)
          that.boxStyle = data
          return data
        }
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
        } else {
          console.log(111111)
        }
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
        console.log('asdas')
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
      },
      setRoundInterval () {
        let that = this
        let i = 0
        console.log('开启定时器')
        setInterval(function () {
          that.roundList.push(i)
          if (that.roundList.length > 10) {
            that.roundList = [1]
          }
        }, 200)
      }
    },
    mounted () {

    },
    activated () {
      let that = this
      that.getHorizontalStyle()
      that.setBox()
      that.setRoundInterval()
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
    top: 0.16rem;
    right: 0.1rem;
    font-size: 0.2rem;
  }
  .challenger>div {
    line-height: 0.2rem;
    height: 0.2rem;
    font-size: 0.16rem;
  }
  .rankingBox {
    color: #fff;
    font-size: 0.2rem;
    line-height: 1;
    width: 2.6rem;
    position: absolute;
    left: 0.1rem;
    top: 23.4%;
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
  .rankingBox table tbody {
  }
  .rankingBox table thead {
    color: #b8b8b8;
  }
  .rankingBox tbody tr:nth-child(1) {
    color: #ea0202;
    margin-top: 0.06rem;
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
    background: url(/static/img/bc_top.png);
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
    background: url(/static/img/phone_right.jpg) no-repeat 0 0 / 100% 100%;
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
    width: 2.1rem;
    height: 0.82rem;
    position: absolute;
    left: 0.1rem;
    top: 0;
  }
  .shopownerMessageBox {
    height: 0.72rem;
    position: absolute;
    left: 0;
    top: 0.12rem;
    color: #fff;
    width: 2.0rem;
  }
  .shopownerMessageBox>div {
    color: #fff;
    line-height: 0.20rem;
    max-height: 0.20rem;
    font-size: 0.2rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .headMessage {
    width: 4.1rem;
    position: absolute;
    left: 2.2rem;
    height: 0.82rem;
    color: #e6e14f;
  }
  .tipsBox {
    width: 58%;
    overflow: hidden;
    float: left;
    position: relative;
  }
  .tips {
    white-space: nowrap;
    width: 100%;
    line-height: 0.4rem;
  }
  .textScroll {
    -webkit-animation: showTextTips 10s linear infinite;
    -o-animation: showTextTips 10s linear infinite;
    animation: showTextTips 10s linear infinite;
  }
  @keyframes showTextTips {
    from {
      margin-left: 40px
    }
    to {
      margin-left: -400px
    }
  }
  @-webkit-keyframes showTextTips {
    from {
      margin-left: 40px
    }
    to {
      margin-left: -400px
    }
  }
  .AutoPat {
    width: 40%;
    float: right;
    font-size: 0.2rem;
    line-height: 1;
    position: relative;
    height: 100%;
  }
  .AutoPatTips {
    margin-top: 0.1rem;
  }
  .AutoPatText {
    position: absolute;
    top: 50%;
    margin-top: -0.14rem;
    left: 0.3rem;
  }
  .pat {
    position: absolute;
    bottom: 0.02rem;
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    padding-left: 0.3rem;
  }
  .pat input[type = 'checkbox'] {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 0.08rem;
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
    top: 0.12rem;
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
    background: url(/static/img/operation.png) no-repeat top;
    background-size: 100%;
  }
  .pageUpClick {
    background: url(/static/img/left.png) no-repeat 0 0;
    background-size: 100%;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);             /* IE 9 */
    -webkit-transform: rotate(90deg);      /* Safari and Chrome */
    -o-transform: rotate(90deg);              /* Opera */
    -moz-transform: rotate(90deg);         /* Firefox */
  }
  .pageDown {
    background: url(/static/img/operation.png) no-repeat bottom;
    background-size: 100%;
  }
  .pageDownClick {
    background: url(/static/img/left.png) no-repeat 0 0;
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
    font-size: 0.2rem;
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
    background: url(/static/img/bc_main.jpg) no-repeat 0px 0px;
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
    background: url(/static/img/winBc1.png) no-repeat;
    width: 1.08rem;
    height: 0.6rem;
    background-size: 100%;
  }
  .winningBox ul li .img1 {
    background: url(/static/img/imgList.png) no-repeat 0px -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img2 {
    background: url(/static/img/imgList.png) no-repeat -1.08rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img3 {
    background: url(/static/img/imgList.png) no-repeat -2.16rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img4 {
    background: url(/static/img/imgList.png) no-repeat -3.24rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img5 {
    background: url(/static/img/imgList.png) no-repeat -4.32rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img6 {
    background: url(/static/img/imgList.png) no-repeat -5.40rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img7 {
    background: url(/static/img/imgList.png) no-repeat -6.48rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .img8 {
    background: url(/static/img/imgList.png) no-repeat -7.56rem -0.04rem;
    background-size: 800%;
  }
  .winningBox ul li .imgChoose {
    width: 110%;
    height: 110%;
    left: -5%;
    z-index: 10;
    top: -5%;
  }
  .winningBox ul li .imgChoose1 {
    background: url(/static/img/imgChoosed1.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose2 {
    background: url(/static/img/imgChoosed2.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose3 {
    background: url(/static/img/imgChoosed3.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose4 {
    background: url(/static/img/imgChoosed4.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose5 {
    background: url(/static/img/imgChoosed5.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose6 {
    background: url(/static/img/imgChoosed6.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose7 {
    background: url(/static/img/imgChoosed7.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winningBox ul li .imgChoose8 {
    background: url(/static/img/imgChoosed8.png) no-repeat center;
    /*transform: scale(1.05);*/
    background-size: 100%;
  }
  .winingMain {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .winingMain>div ul {
    width: 100%;
    height: 100%;
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
    margin-left: 0.01rem;
  }
  .wTop{
    width: 7.7rem;
    height: 0.58rem;
    position: absolute;
    top: 0;
    left: 1.14rem;
  }
  .wBottom {
    width: 7.7rem;
    height: 0.6rem;
    position: absolute;
    bottom: 0.0rem;
    left: 1.14rem;
  }
  .wLeft {
    width: 1.08rem;
    height: 100%;
    position: absolute;
    left: 0.06rem;
    top: 0;
  }
  .wLeft li, .wRight li {
    margin-bottom: 0.01rem;
  }
  .wRight {
    width: 1.08rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .wTop li:nth-child(2n+1),
  .wBottom li:nth-child(2n+1){
    background: url(/static/img/winBc2.png) no-repeat center;
    background-size: 100%;
  }
  .wLeft li:nth-child(2n),
  .wRight li:nth-child(2n){
    background: url(/static/img/winBc2.png) no-repeat center;
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
    top: 0.64rem;
    width: 100%;
    left: 0.06rem;
    height: 3.7rem;
  }
  .bettingMain li{
    width: 1.89rem;
    height: 1.80rem;
    float: left;
    background: url(/static/img/bet_bc2.jpg) no-repeat center;
    margin-left: 1px;
    margin-bottom: 1px;
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
    background:url(/static/img/myMessage.png) no-repeat;
    background-size: 100%;
    color: #f4f401;
    box-sizing: border-box;
    position: absolute;
    top: 0rem;
    left: 0.04rem;
  }
  .myMessageBox {
    width: 1.6rem;
    height: 0.6rem;
    position: absolute;
    top: 0.12rem;
    left: 0.2rem;
  }
  .myMessageBox>div {
    font-size: 0.2rem;
    line-height: 0.2rem;
    height: 0.2rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
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
    background: url(/static/img/repeat.png) no-repeat;
    background-size: 100%;
  }
  .noteCode .betAgain img{
    width: 100%;
  }
  .noteCode .imgHover {
    width: 100%;
    height: 100%;
    background: rgba(200,200,200,0.4);
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
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
    background:url(/static/img/history.png) no-repeat 0px -1px;
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
    background: url(/static/img/left.png) no-repeat 0px 0;
    background-size: 100%;
  }
  .pageRightClick {
    background: url(/static/img/left.png) no-repeat 0 0;
    background-size: 100%;
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);             /* IE 9 */
    -webkit-transform: rotate(180deg);      /* Safari and Chrome */
    -o-transform: rotate(180deg);              /* Opera */
    -moz-transform: rotate(180deg);         /* Firefox */
  }
  .codeNumber {
    width: 140%;
    position: absolute;
    top:50%;
    left: -20%;
    margin-top: -8px;
    text-align: center;
  }
  .codeNumber img {
    height: 0.16rem;
  }
  .warning {
    width: 2.8rem;
    height: 0.85rem;
    position: absolute;
    top: 0;
    right: 0;
    background: url(/static/img/warningPhone.png) no-repeat 0 0;
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

