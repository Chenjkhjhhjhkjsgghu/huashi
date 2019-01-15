<!-- 车行争霸 -->
<template>
    <div class="Box" ref="container">
      <div class="main box_top" style="margin-top: 8px;">
        <div class="mbf_top">
            <ul>
                <li :class="index === tabIndex ? 'on' : ''" v-for='(i,index) in tabList' @click='changeTab(i)' :key='index'><h2>{{i}}</h2></li>
            </ul>
        </div>
        <div id="t0" class="main_bankframe" v-if='tabIndex === "兑换欢乐豆"'>
            <div class="mbf_banks">
                <table border="0" cellspacing="0" cellpadding="0" class="regtable">
                    <tbody>
                      <tr>
                          <td class="td_w1"><h2>账户币余额</h2></td>
                          <td class="td_w2">{{myBeanMessage.glod_coin}}</td>
                          <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                          <td class="td_w1"><h2>兑换欢乐豆数量：</h2></td>
                          <td class="td_w2"><input class="td_input" name="dou_money" v-model='exchangeMessage.bean' id="dou_money"></td>
                          <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                          <td class="td_w2"><input @click='exchangeBean(0)' type="submit" name="btnHD" class="btn_submit" value="确定兑换" /></td>
                          <td class="td_w2"><input @click='exchangeBean(1)' type="submit" name="btnYJHD" class="btn_submit" value="一键兑换" /></td>
                          <td class="td_w2"><input @click='getMessage()' type="submit" name="btnCX" class="btn_submit" value="刷新" /></td>
                          <td><h3 style="color: red"></h3></td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="t1" class="main_bankframe" v-else-if='tabIndex === "欢乐豆兑换喇叭"'>
            <div class="mbf_banks">
                <table border="0" cellspacing="0" cellpadding="0" class="regtable">
                    <tr>
                        <td class="td_w1"><h2>欢乐豆余额</h2></td>
                        <td class="td_w2">{{myBeanMessage.bean}}</td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w1"><h2>兑换喇叭数量：</h2></td>
                        <td class="td_w2"><input class="td_input" name="laba_money" v-model='exchangeMessage.glod_coin' id="laba_money"></td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w2"><input @click='exchangeCoin(0)' type="submit" name="btnHB" class="btn_submit" value="确定兑换" /></td>
                        <td class="td_w2"><input @click='exchangeCoin(1)' type="submit" name="btnYJHB" class="btn_submit" value="一键兑换" /></td>
                        <td class="td_w2"><input @click='getMessage()' type="submit" name="btnCX" class="btn_submit" value="刷新" /></td>
                        <td><h3 style="color: red"></h3></td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="t2" class="main_bankframe" v-else-if='tabIndex === "存欢乐豆"'>
            <div class="mbf_banks">
                <table border="0" cellspacing="0" cellpadding="0" class="regtable">
                    <tr>
                        <td class="td_w1"><h2>欢乐豆余额</h2></td>
                        <td class="td_w2">{{myBeanMessage.bean}}</td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w1"><h2>我要存入 </h2></td>
                        <td class="td_w2"><input class="td_input" name="ck_money" v-model='exchangeMessage.saveBean' id="ck_money"></td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w2"><input type="submit" name="btnCK" @click='saveBean' class="btn_submit" value="确定存入" /></td>
                        <td class="td_w2"><input @click='getMessage()' type="submit" name="btnCX" class="btn_submit" value="刷新" /></td>
                        <td><h3 style="color: red"></h3></td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="t3" class="main_bankframe" v-else-if='tabIndex === "取欢乐豆"'>
            <div class="mbf_banks">
                <table border="0" cellspacing="0" cellpadding="0" class="regtable">
                    <tr>
                        <td class="td_w1" style="width:90px"><h2 style="width:90px">银行存款</h2></td>
                        <td class="td_w2">{{myBeanMessage.bankBean}}</td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w1" style="width:90px"><h2 style="width:90px">我要取款 </h2></td>
                        <td class="td_w2"><input class="td_input" name="qk_money" v-model='exchangeMessage.getBean' id="qk_money"></td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w1" style="width:90px"><h2 style="width:90px">取款密码</h2></td>
                        <td class="td_w2"><input class="td_input" name="qk_pwd" id="qk_pwd" type="password"></td>
                        <td class="td_w3"><h3><span class="check_w"></span></h3></td>
                        <td class="td_w2"><input type="submit" name="btnQK" @click='getBean' class="btn_submit" value="确定取款" /></td>
                        <td class="td_w2"><input @click='getMessage()' type="submit" name="btnCX" class="btn_submit" value="刷新" /></td>
                        <td><h3 style="color: red"></h3></td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
      <div class="box-container chzbBox" ref='box' v-if='showLoadPage'>
        <div v-show='isShowIndex'>
          <div class="main-box">
            <div class="main-box-left" style="background: url(/static/img/bc_left.jpg) no-repeat center">
                <div class="imgArea">
                    <div class="mouseImgBox" v-if = 'mouseCodeBox && gameStatus === 0' :style="'position: absolute;left:' + coordinate.x + 'px;top:' + coordinate.y + 'px'">
                        <img :src="mouseCodeImg">
                        <div class="mouseImgNumber">
                            <div style="text-align:center;overflow:hidden;">
                                <!-- <img :src="'/static/img/nb' + j + '.png'" v-for = 'j in i.numList'> -->
                                <img :src="'/static/img/nb' + i + '.png'" v-for = 'i in mouseImgNumber'>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 头部 -->
                <div class="header_box">
                    <div class="shopownerMessage">
                        <div>当前店长：[{{shopownerMessage.siteid.split('')[0]}}]{{shopownerMessage.id}}</div>
                        <div>担任届数：{{bankerNum}}</div>
                        <div>店长财富：{{shopownerMessage.glod_coin}}</div>
                    </div>
                    <div class="headMessage">
                        <div class="left tipsBox">
                            <div class="tips">
                                <p class="textScroll">友情提示：官方不以任何方式回收游戏豆，并严厉打击金币回收，一经发现将严肃处理!</p>
                            </div>
                            <div class="gamesNumberBox" >
                                <div class="voiceBox">
              <span class="voice" v-show='!isVoiceHover' :style="'background: url(static/img/voiceList.png) no-repeat -' + 24 * voiceIndex + 'px 0 / 500% 100%;;'">
              </span>
                                    <span class="voice" v-show='isVoiceHover' :style="'background: url(static/img/voiceHoverList.png) no-repeat -' + 24 * voiceIndex + 'px 0 / 500% 100%;;'">
              </span>
                                    <!-- <span class="voice" v-for='(i,index) in voiceHoverList' v-show='index === voiceIndex && isVoiceHover' :style="'background: url(' + voiceHoverList[voiceIndex].img + ') no-repeat center center / cover;'">
                                    </span> -->
                                    <div style="" @click = 'soundToggle' @mouseover = 'isVoiceHover = true' @mouseout = 'isVoiceHover = false'>
                                    </div>
                                    <audio loop="loop" v-if = 'voice.voiceStatus' autoplay="autoplay">
                                        <source src="/static/sounds/sound5.wav" type="audio/mpeg" />
                                    </audio>
                                    <audio v-if = 'voice.voiceStatus && timeOver' autoplay="autoplay">
                                        <source src="/static/sounds/sound2.wav" type="audio/mpeg" />
                                    </audio>
                                </div>
                                <div class="gamesNumber" >
                                    第
                                    <span class="">{{gamesNumber}}</span>
                                    局
                                </div>
                            </div>
                        </div>
                        <div class="right AutoPat">
                            <p>{{remark}}</p>
                            <div class="pat" @click='automatic'>
                                <span class="input" v-if='isAutomatic'><img src="static/img/checked.png"></span>
                                <span class="input" v-else><img src="static/img/checkBox.png"></span>
                                <div class="patText">自动排庄</div>
                                <div class="automaticTips" style="background:url(/static/img/automaticTips.png) no-repeat 0 0">
                                    <div class="tipsText">
                                        勾选此选项，可在下庄后自动提交申请
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="beShopownerBox">
                        <div class="beShopowner" v-if='isApply' @click='abandon' >
                            <img src="/static/img/abandon.png">
                        </div>
                        <div class="beShopowner" v-else  @click='apply' :class="{'gray' : !isQualified}">
                            <img src="/static/img/beShopowner.png">
                        </div>
                        <div class="lineUp">
                            <ul :style="'margin-top: -' + bankerIndex * 17+ 'px'">
                                <li v-for = '(i, index) in bankerList' :key="index"><span v-if="bankerList[index+1]"  class="nickName">[{{bankerList[index+1].siteid.split('')[0]}}]{{bankerList[index+1].id}}</span><span v-if="bankerList[index+1]" style="float:right;">{{bankerList[index+1].glod_coin}}</span></li>
                            </ul>
                        </div>
                        <div class="operationBox">
                            <span style="" :class="direction.pageUp ? 'pageUp' : 'pageUpClick'" @mouseup = 'bankerListPage(1)' @mousedown = 'direction.pageUp = false' @mouseleave = 'direction.pageUp = true' @click=''></span>
                            <span style="margin-top:-4px;" :class="direction.pageDown ? 'pageDown' : 'pageDownClick'" @mouseup = 'bankerListPage(2)' @mousedown = 'direction.pageDown = false' @mouseleave = 'direction.pageDown = true'></span>
                        </div>
                    </div>
                </div>
                <!-- 头部 -->
                <div class="container">
                    <!-- 转盘区 -->
                    <div class="winningBox">
                        <div class="wTop">
                            <ul>
                                <li>
                                    <div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 2'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 2' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 3'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 3' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 4'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 4' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 5'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 5' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 6'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 6' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 7'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 7' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 8'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 8' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                            </ul>
                        </div>
                        <div class="wRight">
                            <ul>
                                <li>
                                    <div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 9'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 9' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 10'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 10' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 11'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 11' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 12'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 12' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 13'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 13' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 14'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 14' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 15'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 15' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li style="margin-bottom:4px;">
                                    <div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 16'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 16' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 17'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 17' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                            </ul>
                        </div>
                        <div class="wBottom">
                            <ul>
                                <li>
                                    <div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 24'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 24' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 23'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 23' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 22'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 22' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 21'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 21' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 20'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 20' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 19'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 19' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 18'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 18' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                            </ul>
                        </div>
                        <div class="wLeft">
                            <ul>
                                <li>
                                    <div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 1'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 1' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img8"></div><div class="imgChoose imgChoose8" v-if = 'code === 32'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 32' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img7"></div><div class="imgChoose imgChoose7" v-if = 'code === 31'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 31' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img6"></div><div class="imgChoose imgChoose6" v-if = 'code === 30'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 30' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img5"></div><div class="imgChoose imgChoose5" v-if = 'code === 29'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 29' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img4"></div><div class="imgChoose imgChoose4" v-if = 'code === 28'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 28' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img3"></div><div class="imgChoose imgChoose3" v-if = 'code === 27'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 27' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img2"></div><div class="imgChoose imgChoose2" v-if = 'code === 26'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 26' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                                <li>
                                    <div class="img1"></div><div class="imgChoose imgChoose1" v-if = 'code === 25'></div>
                                    <audio v-if = 'voice.voiceStatus && code === 25' autoplay="autoplay"><source src="/static/sounds/sound3.wav" type="audio/mpeg" /></audio>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 转盘区 -->
                    <!-- 投注区 -->
                    <div class="bettingBox">
                        <div class="bettingTop">
                            <span  v-if = 'gameStatus === 0' class="timeTitle">下注时间</span>
                            <span  v-else-if = 'gameStatus === 1' class="timeTitle">开奖时间</span>
                            <span  v-else-if = 'gameStatus === 2' class="timeTitle">空闲时间</span>
                            <span  v-else-if = 'gameStatus === 3' class="timeTitle">休息时间</span>
                            <span class="countDown countDown1" v-for='(i,index) in countDownNumberList' v-show='countDownNumber.a === index' :style="'background:url(' + countDownNumberList[index].img + ') no-repeat 0px 5px / 100%;'">1</span>
                            <span class="countDown countDown2" v-for='(i,index) in countDownNumberList' v-show='countDownNumber.b === index' :style="'background:url(' + countDownNumberList[index].img + ') no-repeat 0px 5px / 100%;'">1</span>
                            <!-- <span class="countDown countDown2" :style="'background:url(' + countDownNumberList[countDownNumber.b].img + ') no-repeat 0px 5px / 100%'">1</span> -->
                        </div>
                        <!-- <div class="bettingTop" v-else-if = 'gameStatus === 1'>
                          <span>开奖时间</span>
                          <span class="countDown countDown1" :style="'background:url(' + countDownNumberList[countDownNumber.a].img + ') no-repeat 0px 5px / 100%'">1</span>
                          <span class="countDown countDown2" :style="'background:url(' + countDownNumberList[countDownNumber.b].img + ') no-repeat 0px 5px / 100%'">1</span>
                        </div>
                        <div class="bettingTop" v-else-if = 'gameStatus === 2'>
                          <span>空闲时间</span>
                          <span class="countDown countDown1" :style="'background:url(' + countDownNumberList[countDownNumber.a].img + ') no-repeat 0px 5px / 100%'">1</span>
                          <span class="countDown countDown2" :style="'background:url(' + countDownNumberList[countDownNumber.b].img + ') no-repeat 0px 5px / 100%'">1</span>
                        </div> -->
                        <!-- 投注区域筹码数量及统计 -->
                        <div class="bettingMain" @mousemove = 'mouseCodeMove'>
                            <ul>
                                <li style="background" v-for = '(i,index) in bettingList' @click = 'betAdd(i, index, 1)' :class = "index === betIndex ? 'transformWin' : ''">
                                    <div class="numberBox" v-if = "i.jetonNumberList.length === 0 || i.jetonNumberList.length === 1 && i.jetonNumberList[0] === '0'">
                                        <div>
                                            <img :src="betNumberList[0].img">
                                        </div>
                                    </div>
                                    <div class="numberBox" v-else>
                                        <div>
                                            <img v-for = '(j,index3) in i.jetonNumberList' :src="betNumberList[j].img" :key = 'index3'>
                                            <img :src="betNumberList[10].img" style="margin-left:-2px;width:16px;">
                                        </div>
                                    </div>
                                    <div class="myNumberBox">
                                        <div>
                                            <div class="myNumberList">
                                                <span v-for = '(j,index4) in i.MyjetonNumberList' :style="'background: url(/static/img/playerBetNum.png) no-repeat -' + j * 15 + 'px 0px;'"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -4px -2px'" class="rateBox" v-if='index===0'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -284px -2px'" class="rateBox" v-else-if='index===1'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -565px -2px'" class="rateBox" v-else-if='index===2'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -847px -2px'" class="rateBox" v-else-if='index===3'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -145px -2px'" class="rateBox" v-else-if='index===4'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -425px -2px'" class="rateBox" v-else-if='index===5'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -704px -2px'" class="rateBox" v-else-if='index===6'>
                                    </div>
                                    <div :style="'background:url(' + rateImgUrl+ ') no-repeat -990px -2px'" class="rateBox" v-else-if='index===7'>
                                    </div>
                                    <div class="betCodeBox">
                                        <div v-for = '(j,index2) in i.codeList' :style = "'position: absolute;left:' + j.left + ';top:' + j.top">
                                            <img :src="j.img">
                                            <audio autoplay="autoplay" v-if = 'voice.voiceStatus && gameStatus === 0'>
                                                <source src="/static/sounds/sound6.wav" type="audio/mpeg" />
                                            </audio>
                                        </div>
                                    </div>
                                    <div class="betMainBck">
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 投注区 -->
                </div>
                <div class="main-bottom">
                    <!-- 我的信息 -->
                    <div class="myMessage">
                        <!-- <div>昵称：[{{myMessage.siteid.split('')[0]}}]{{myMessage.id}}</div> -->
                          <div>昵称：[{{myMessage.siteid.split('')[0]}}]{{myMessage.nickname}}</div>
                        <div>财富：{{myMessage.glod_coin}}</div>
                        <div>成绩：{{ myMessage.jetonNumber }}</div>
                    </div>
                    <!-- 我的信息 -->
                    <!-- 注码区 -->
                    <div class="betNumber">
                        <div class="noteCode">
                            <ul>
                                <li @mousedown = 'codeDown(i, index)' @mouseup = 'codeUp' v-for = '(i,index) in chipList' :class="{ 'codeMargin' :i.keyDown ,'gray' : gameStatus !== 0}" @mouseleave = 'codeUp'>
                                    <img :src="i.img" :style = ''>
                                    <div class="imgHover" v-if = 'gameStatus === 0'>

                                    </div>
                                    <div class="codeNumber">
                                        <div style="text-align:center;overflow:hidden;">
                                            <img :src="'/static/img/nb' + j + '.png'" v-for = 'j in i.numList' >
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="betAgain" @click = 'repeatBet'>
                                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIgp4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCnhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgp4bWxuczphdXRob3I9Imh0dHA6Ly93d3cuc290aGluay5jb20iCndpZHRoPSI3OHB4IiBoZWlnaHQ9IjYxcHgiCnhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZyBpZD0iNDciIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIDIuNSwgMi41KSI+CjxsaW5lYXJHcmFkaWVudAppZD0iTGluZWFyR3JhZElEXzY0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLCAwLjAzOTAwMTUsIC0wLjAzNjg2NTIsIDAsIDM2LjI1LCAyNy43KSIgc3ByZWFkTWV0aG9kID0icGFkIiB4MT0iLTgxOS4yIiB5MT0iMCIgeDI9IjgxOS4yIiB5Mj0iMCIgPgo8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkQ0O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCAgb2Zmc2V0PSIwLjQ5MDE5NiIgc3R5bGU9InN0b3AtY29sb3I6I0IxNzkzRTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0YxQzI4MjtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNMaW5lYXJHcmFkSURfNjQpICIgZD0iTTU5LjQsLTIuNVE3NSAtMi41IDc1IDEzLjFMNzUgNDIuM1E3NSA1Ny45IDU5LjQgNTcuOUwxMy4xIDU3LjlRLTIuNSA1Ny45IC0yLjUgNDIuM0wtMi41IDEzLjFRLTIuNSAtMi41IDEzLjEgLTIuNUw1OS40IC0yLjVNNzAsMTMuMVE3MCAyLjUgNTkuNCAyLjVMMTMuMSAyLjVRMi41IDIuNSAyLjUgMTMuMUwyLjUgNDIuM1EyLjUgNTIuOSAxMy4xIDUyLjlMNTkuNCA1Mi45UTcwIDUyLjkgNzAgNDIuM0w3MCAxMy4xIiAvPgo8bGluZWFyR3JhZGllbnQKaWQ9IkxpbmVhckdyYWRJRF82NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMCwgLTAuMDM0NTkxNywgMC4wMzM4MTM1LCAwLCAzNi4yNSwgMjcuNykiIHNwcmVhZE1ldGhvZCA9InBhZCIgeDE9Ii04MTkuMiIgeTE9IjAiIHgyPSI4MTkuMiIgeTI9IjAiID4KPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAxNkQwQztzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzAwMTEwNjtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNMaW5lYXJHcmFkSURfNjUpICIgZD0iTTcwLDQyLjNRNzAgNTIuOSA1OS40IDUyLjlMMTMuMSA1Mi45UTIuNSA1Mi45IDIuNSA0Mi4zTDIuNSAxMy4xUTIuNSAyLjUgMTMuMSAyLjVMNTkuNCAyLjVRNzAgMi41IDcwIDEzLjFMNzAgNDIuMyIgLz4KPGxpbmVhckdyYWRpZW50CmlkPSJMaW5lYXJHcmFkSURfNjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAsIDAuMDM3NTIxNCwgLTAuMDI4OTAwMSwgMCwgMzcuOCwgNC4zKSIgc3ByZWFkTWV0aG9kID0icGFkIiB4MT0iLTgxOS4yIiB5MT0iMCIgeDI9IjgxOS4yIiB5Mj0iMCIgPgo8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI0xpbmVhckdyYWRJRF82NikgIiBkPSJNNjcuMywxNi4xTDY3LjMgMjkuNzVMNS4yNSAyOS43NUw1LjI1IDE2LjFRNS4yNSA0LjkgMTYuNDUgNC45TDU2LjA1IDQuOVE2Ny4zIDQuOSA2Ny4zIDE2LjEiIC8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7ZmlsbC1vcGFjaXR5OjEiIGQ9Ik01OCw5UTU3Ljk1IDEwLjMgNTYuOSAxMC4zTDQyLjQ1IDEwLjNMNDEuOCAxMC45TDU0LjU1IDEwLjlRNTYuNiAxMC45IDU2LjY1IDEyLjlMNTYuNjUgMTYuNzVRNTYuNyAxOC45NSA1NC42NSAxOC43NUw0NS42NSAxOC43NUw0NSAxOS41TDU1IDE5LjVRNTYuMjUgMTkuNiA1Ni43IDIwLjNRNTcuMSAyMS4xNSA1Ni40IDIyLjA1UTU1LjQ1IDIzLjA1IDUyLjQgMjVMNTIuMSAyNS4yTDU0LjY1IDI1LjdMNTcuNSAyNS45UTU4LjYgMjUuOTUgNTguNDUgMjcuMlE1OC4yNSAyOC4zNSA1Ny4xNSAyOC40NVE1My43IDI4LjMgNDguMyAyNi43NVE0MyAyOC4zIDM4Ljg1IDI4LjQ1UTM3LjY1IDI4LjQ1IDM3LjQ1IDI3LjI1UTM3LjM1IDI1Ljk1IDM4LjU1IDI1LjlMNDQuNzUgMjUuMlE0My4yIDI0LjQ1IDQxLjUgMjIuOUwzOS4zNSAyNC4wNVEzOC4xIDI0LjYgMzcuNTUgMjMuNFEzNy4yNSAyMi4zIDM4LjQ1IDIxLjZRNDEuMDUgMjAuMyA0Mi4zIDE4Ljc1TDQxLjk1IDE4Ljc1UTQwIDE4Ljk1IDQwLjA1IDE2LjZMNDAuMDUgMTIuMVEzOS41NSAxMi43NSAzOS4wNSAxMi44NVEzNi42IDEyLjQ1IDM3LjkgMTAuNFEzOS42IDkuMyA0MiA3UTQzLjYgNi4wNSA0NC4xIDcuN0w1Ni45IDcuN1E1Ny45NSA3LjggNTggOU00OC4yNSwyMy45NVE1MC40IDIzLjM1IDUyLjE1IDIyTDQ0LjU1IDIyUTQ2LjA1IDIzLjE1IDQ4LjI1IDIzLjk1TTQyLjc1LDEzLjk1TDU0IDEzLjk1TDU0IDEzLjJMNDIuNzUgMTMuMkw0Mi43NSAxMy45NU00Mi43NSwxNi42TDU0IDE2LjZMNTQgMTUuOEw0Mi43NSAxNS44TDQyLjc1IDE2LjZNMzQuODUsMTEuOFEzNC44IDEzIDMzLjk1IDEzTDI2LjEgMTNMMjYuMSAxMy43NUwzMS45NSAxMy43NVEzMy43IDEzLjY1IDMzLjY1IDE1LjM1TDMzLjY1IDIwLjA1UTMzLjc1IDIyLjI1IDMxLjkgMjJMMjYuMSAyMkwyNi4xIDIyLjdMMzIuOCAyMi43UTMzLjY1IDIyLjc1IDMzLjY1IDIzLjhRMzMuNjUgMjQuOSAzMi44IDI0LjlMMjYuMSAyNC45TDI2LjEgMjUuN0wzMy45NSAyNS43UTM0Ljg1IDI1Ljg1IDM1IDI2Ljc1UTM0Ljg1IDI3LjkgMzQuMSAyNy45NUwxNS4xNSAyNy45NVExNC4xNSAyNy45IDE0LjA1IDI2LjhRMTQuMTUgMjUuODUgMTUuMTUgMjUuN0wyMy4zIDI1LjdMMjMuMyAyNC45TDE2LjU1IDI0LjlRMTUuNSAyNC45IDE1LjMgMjMuOVExNS40NSAyMi43NSAxNi40IDIyLjdMMjMuMyAyMi43TDIzLjMgMjJMMTcuMyAyMlExNS42NSAyMi4xIDE1Ljc1IDIwLjVMMTUuNzUgMTUuM1ExNS43IDEzLjc1IDE3LjQ1IDEzLjc1TDIzLjMgMTMuNzVMMjMuMyAxM0wxNS4xNSAxM1ExNC4xNSAxMyAxNC4wNSAxMS44UTE0LjE1IDEwLjYgMTUuMTUgMTAuNTVMMjMuMyAxMC41NUwyMy4zIDkuODVMMTcuMDUgOS44NVExNS43NSA5Ljk1IDE1Ljc1IDguNlExNS43IDcuNDUgMTcgNy40NUwzMS42IDYuOFEzMi44NSA2LjcgMzMuMDUgNy45NVEzMy4yNSA5LjQ1IDMxLjUgOS40NUwyNi4wNSA5LjdMMjYuMDUgMTAuNTVMMzMuOSAxMC41NVEzNC44IDEwLjYgMzQuODUgMTEuOE0yMy4zLDE1Ljk1TDE4LjggMTUuOTVRMTguMzUgMTYgMTguMzUgMTYuNEwxOC4zNSAxNi45TDIzLjMgMTYuOUwyMy4zIDE1Ljk1TTI2LjEsMTYuOUwzMS4wNSAxNi45TDMxLjA1IDE2LjRRMzEuMDUgMTYgMzAuNiAxNS45NUwyNi4xIDE1Ljk1TDI2LjEgMTYuOU0yMy4zLDE4Ljk1TDE4LjM1IDE4Ljk1TDE4LjM1IDE5LjRRMTguMjUgMTkuODUgMTguOCAxOS44NUwyMy4zIDE5Ljg1TDIzLjMgMTguOTVNMjYuMSwxOS44NUwzMC41IDE5Ljg1UTMxLjA1IDIwIDMxLjA1IDE5LjRMMzEuMDUgMTguOTVMMjYuMSAxOC45NUwyNi4xIDE5Ljg1IiAvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGO2ZpbGwtb3BhY2l0eToxIiBkPSJNNTMuNTUsMzMuMlE1NCAzMi41NSA1NC45IDMyLjk1TDU2LjYgMzQuMTVRNTcuMjUgMzQuOTUgNTYuOSAzNS43UTU2LjMgMzYuNSA1NS41IDM1Ljg1TDUzLjggMzQuNTVRNTMuMSAzNCA1My41NSAzMy4yTTUxLjc1LDM0LjQ1UTUxLjc1IDM1LjM1IDUwLjk1IDM1LjM1TDQ0Ljc1IDM1LjM1TDQ0Ljc1IDM2LjhRNDcuMjUgMzguMzUgNDkuNiA0MC41NVE1MC41IDQxLjUgNDkuOTUgNDIuM1E0OS4zIDQyLjg1IDQ4LjMgNDEuOTVMNDQuNzUgMzguOTVMNDQuNzUgNDYuNDVRNDQuNjUgNDcuMiA0My44IDQ3LjI1UTQyLjkgNDcuMiA0Mi45IDQ2LjQ1TDQyLjkgMzUuMzVMMzcuOCAzNS4zNVEzNyAzNS4zNSAzNi45NSAzNC40NVEzNi45NSAzMy41NSAzNy43NSAzMy41TDUwLjg1IDMzLjVRNTEuNjUgMzMuNTUgNTEuNzUgMzQuNDVNNTguMSwzNC4xNUw2MS4yIDM0LjE1TDYxLjEgMzMuNjVRNjAuNzUgMzIuODUgNjEuNjUgMzIuNDVRNjIuNTUgMzIuMjUgNjIuOSAzMy4wNUw2My4zIDM0LjE1TDY3LjA1IDM0LjE1UTY3LjggMzQuMiA2Ny44NSAzNS4xUTY3LjggMzYgNjcuMDUgMzZMNjMuNDUgMzZMNjMuNDUgMzkuNEw2Ni45IDM5LjRRNjcuNiAzOS40NSA2Ny42NSA0MC4zNVE2Ny42IDQxLjI1IDY2LjkgNDEuMjVMNjMuNDUgNDEuMjVMNjMuNDUgNDUuMkw2Ny4xNSA0NS4yUTY3Ljg1IDQ1LjMgNjcuOTUgNDZRNjcuODUgNDYuOSA2Ny4xNSA0Ni45TDU3LjA1IDQ2LjlRNTYuMiA0Ni45IDU2LjE1IDQ2UTU2LjIgNDUuMyA1Ny4wNSA0NS4yTDYxLjYgNDUuMkw2MS42IDQxLjI1TDU4LjIgNDEuMjVRNTcuNCA0MS4yNSA1Ny4zNSA0MC4zNVE1Ny40IDM5LjQ1IDU4LjIgMzkuNEw2MS42IDM5LjRMNjEuNiAzNkw1OC4xIDM2UTU3LjI1IDM2IDU3LjIgMzUuMVE1Ny4yNSAzNC4yIDU4LjEgMzQuMTVNNTYuNSw0MC4yNUw1NS4yNSA0MC4yTDUzLjQ1IDM4LjY1UTUyLjcgMzguMDUgNTMuMTUgMzcuM0w1NC40NSAzNy4yTDU2LjQ1IDM4LjhRNTcuMDUgMzkuNiA1Ni41IDQwLjI1TTU3LjEsNDIuN1E1Ni4yIDQ1LjM1IDU0Ljc1IDQ3LjA1UTU0LjA1IDQ3Ljc1IDUzLjMgNDcuMzVRNTIuNjUgNDYuNzUgNTMuMiA0NS45NVE1NC41NSA0NCA1NS4zNSA0MS44UTU1LjcgNDEgNTYuNiA0MS4zNVE1Ny4zNSA0MS44IDU3LjEgNDIuN00xMi4wNSwzNi44TDE3LjU1IDM2LjhRMTguMzUgMzYuOSAxOC40NSAzNy43NVExOC4zNSAzOC43IDE3LjU1IDM4LjdMMTIuMDUgMzguN0wxMi4wNSA0NC45TDE4LjQ1IDQ0LjlRMTkuMiA0NSAxOS4yNSA0NS43UTE5LjIgNDYuNiAxOC40NSA0Ni43TDUuNDUgNDYuN1E0LjcgNDYuNiA0LjYgNDUuN1E0LjcgNDUgNS40NSA0NC45TDEwLjA1IDQ0LjlMMTAuMDUgMzMuN1ExMC4wNSAzMi45NSAxMSAzMi45UTExLjk1IDMyLjk1IDEyLjA1IDMzLjdMMTIuMDUgMzYuOE0yMi41LDM0LjJMMjIuOCAzMy4yNVEyMi45NSAzMi41IDIzLjg1IDMyLjZRMjQuNyAzMi44NSAyNC41IDMzLjU1TDI0LjMgMzQuM0wyNi42NSAzNC4zUTI3LjM1IDM0LjMgMjcuNDUgMzUuMlEyNy4zNSAzNiAyNi42NSAzNkwyMy45IDM2TDIzLjA1IDM5LjQ1TDIzLjg1IDM5LjQ1TDIzLjg1IDM3LjdRMjMuODUgMzcuMDUgMjQuNyAzN1EyNS41IDM3LjEgMjUuNiAzNy43NUwyNS42IDM5LjQ1TDI2LjU1IDM5LjQ1UTI3LjM1IDM5LjU1IDI3LjQ1IDQwLjM1UTI3LjM1IDQxLjE1IDI2LjU1IDQxLjE1TDI1LjYgNDEuMTVMMjUuNiA0M0wyNi43IDQyLjg1UTI3LjQ1IDQyLjg1IDI3LjY1IDQzLjY1UTI3Ljc1IDQ0LjQ1IDI3IDQ0LjY1TDI1LjYgNDQuODVMMjUuNiA0Ni45UTI1LjUgNDcuNTUgMjQuNyA0Ny42NVEyMy44NSA0Ny41NSAyMy44NSA0Ni45TDIzLjg1IDQ1TDIxLjcgNDUuMlEyMC44IDQ1LjM1IDIwLjcgNDQuNDVRMjAuNyA0My42IDIxLjYgNDMuMzVMMjMuODUgNDMuMkwyMy44NSA0MS4xNUwyMi4yIDQxLjE1UTIwLjYgNDEuMyAyMS4yIDM5LjY1TDIyLjIgMzZMMjEuNiAzNlEyMC44IDM2IDIwLjc1IDM1LjJRMjAuNzUgMzQuMyAyMS41NSAzNC4yTDIyLjUgMzQuMk0yOC43LDM4LjM1UTI5LjU1IDM4LjM1IDI5LjY1IDM5TDI5LjY1IDQxLjM1UTMxLjE1IDQwLjU1IDMyLjIgMzkuMjVRMzIuODUgMzguNSAzMy42IDM5UTM0LjIgMzkuNiAzMy43IDQwLjRRMzIuMTUgNDIuMiAyOS42NSA0My40NUwyOS42NSA0NC43NVEyOS42NSA0NS4zIDMwLjE1IDQ1LjJMMzIuOSA0NS4yUTMzLjUgNDUuNSAzMy41NSA0My42NVEzMy41NSA0Mi45NSAzNC40NSA0Mi44NVEzNS4yNSA0Mi45NSAzNS4zIDQzLjY1UTM1LjMgNDUuNjUgMzQuOTUgNDYuMjVRMzQuNjUgNDYuOSAzMy4zNSA0Ni45TDI5LjU1IDQ2LjlRMjcuOCA0Ni45IDI3Ljg1IDQ1LjM1TDI3Ljg1IDM5LjFRMjcuODUgMzguNDUgMjguNyAzOC4zNU0yNi4xLDM4LjhRMjUuNSAzOC4xNSAyNi4xIDM3LjVMMjYuNCAzNy4yNVEyOC4zNSAzNS41NSAyOS45NSAzMi45NVEzMC42IDMyIDMxLjU1IDMyLjk1UTMzLjU1IDM1LjggMzUuNTUgMzcuMjVRMzYgMzcuODUgMzUuNDUgMzguNVEzNC44IDM5LjEgMzQuMiAzOC42NVEzMi40IDM3LjIgMzAuOCAzNS4xTDI3LjQ1IDM4LjhRMjYuNzUgMzkuMyAyNi4xIDM4LjgiIC8+CjwvZz4KPC9zdmc+Cg==" 
                                :class="{'gray' : !isRepeatBet}">
                            </div>
                        </div>
                        <div class="historicalRecords">
                            <div class="pageLeftBox" @mouseup = 'getHistory(1)' @mousedown = 'direction.pageLeft = false' @mouseleave = 'direction.pageLeft = true'>
                                <span class="pageLeftClick" v-if = '!direction.pageLeft'></span>
                            </div>
                            <div class="pageRightBox" @mouseup = 'getHistory()' @mousedown = 'direction.pageRight = false' @mouseleave = 'direction.pageRight = true'>
                                <span class="pageRightClick" v-if = '!direction.pageRight'></span>
                            </div>
                            <div class="hisBox">
                                <ul>
                                    <li v-for = '(i,index) in chargeRecord' :style="'background: url(/static/img/historyImg.png) no-repeat -' + i.code * 40 + 'px 1px'" :key="index">
                                        <!--<img :src="imgList1[0].img">-->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- 注码区 -->
                </div>
                <div class="showTips" v-if = 'showTips.status' :class = "showTips.status ? 'showTipsEffect' : ''">
                    {{ showTips.text }}
                </div>
            </div>
            <div class="main-box-right" style="background: url(/static/img/bc_right.jpg) no-repeat center">
                <!-- 当前庄家信息 -->
                <div class="challenger" v-if='rankList.length > 0'>
                    <div v-if='rankList[0].user_nickname.length > 7'>[{{rankList[0].siteName.split('')[0]}}]{{rankList[0].user_nickname.slice(0,7)+'...'}}</div>
                    <div v-else>[{{rankList[0].siteName.split('')[0]}}]{{rankList[0].user_nickname}}</div>
                    <div>{{rankList[0].user_id}}</div>
                    <div>{{rankList[0]['sum(user_betting.profit)']}}</div>
                </div>
                <!-- 当前庄家信息 -->
                <!-- 排行榜 -->
                <div class="rankingBox">
                    <table>
                        <thead>
                        <tr>
                            <td>名</td>
                            <td>昵称</td>
                            <td>Id</td>
                            <td>金额</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for = '(i,index) in rankList' v-if='rankList.length > 0'>
                            <td>{{ index + 1 }}</td>
                            <td v-if='rankshow*1 != 1&&i.user_nickname.length>3'>[{{i.siteName.split('')[0]}}]{{i.user_nickname.slice(0,3)+'...'}}</td>
                             <td v-else-if='rankshow*1 != 1&&i.user_nickname.length<=3'>[{{i.siteName.split('')[0]}}]{{i.user_nickname}}</td>
                            <td v-else>[{{i.siteName.split('')[0]}}]</td>
                            <td v-if='rankshow*1 > 0'><div class="jiaP">{{i.user_id}}</div></td>
                            <td v-else><div class="jiaP"></div></td>
                            <td>{{i['sum(user_betting.profit)']}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 排行榜 -->
                <!-- 充值 -->
                <div class="recharge" onlick="window.open('http://pay.gzhsrj.com/pay/alipay?userid=' + userid)" @click = 'torecharge' @mouseover = 'recharge.rechargeIndex = 1' @mouseout = 'recharge.rechargeIndex = 0' @mousedown = 'recharge.rechargeIndex = 2' @mouseup = 'recharge.rechargeIndex = 0'>
                    <img :src="i.img" v-for = '(i,index) in recharge.rechargeList' v-show = 'recharge.rechargeIndex === index' :key='index'>
                </div>
                <!-- 充值 -->
                <!-- 帮助 -->
                <!-- <div class="">
                  <img src="/static/img/helpTips1.png">
                </div> -->
                <div class="helpTips" @click = '' @mouseover = 'helpTips.helpTipsIndex = 1' @mouseout = 'helpTips.helpTipsIndex = 0' @mousedown = 'helpTips.helpTipsIndex = 2' @mouseup = 'helpTips.helpTipsIndex = 0'>
                    <img :src="i.img" v-for = '(i,index) in helpTips.helpTipsList' v-show = 'helpTips.helpTipsIndex === index' :key='index'>
                </div>
                <!-- 帮助 -->
            </div>
            <div class = 'awardResults' v-if = 'awardResults'>
                <ul>
                    <li class="awardResultsHeader">
                        <div>结算</div>
                        <div style="color:#f5f503">本轮下注</div>
                        <div>得分</div>
                    </li>
                    <li>
                        <div>本方</div>
                        <div style="color:red;">{{userJeton}}</div>
                        <div>{{userProfit}}</div>
                    </li>
                    <li>
                        <div>店长</div>
                        <div></div>
                        <div>{{ shopownerProfit }}</div>
                    </li>
                </ul>
            </div>
          </div>
          <div class="footer">
              <div class="warning">
              </div>
          </div>
          <div class="backBox" v-if='!isLink'>
          </div>
        </div>
        <div class="loadPage" v-if='!isShowIndex'>
          <div class="processBox">
            <div class="process" :style="'width:' + processValue + '%'">
            </div>
            <div class="process3Box">
              <div class="process3">
              </div>
            </div>
          </div>
          <div class="loadPageText">
            <span class='loadTextTitle'>
              加载进度：
            </span>
            <span class="loadNum">
              {{processValue}}%
            </span>
          </div>
        </div>
        <div class="limitPage" v-if='islimit'>
        </div>
      </div>
      <div class="chzbBox1" v-else>
      </div>
      <div v-show='false'>
        <img :src="i" v-for='(i,index) in loadImgList' :key='index' class="loadimg">
      </div>
      <div id="mask">
        <div id="popbox">
            游戏规则<br>
            <div class="rule">一、根据国家相关规定，本游戏只收取与输赢无关的技术服务费。</div>
            <div class="rule">二、根据国家规定，游戏设置封顶消费。</div>
            <div class="rule">三、官方不以任何形式收回游戏币，并严厉打击游戏币买卖行为，一经发现严肃处理。</div>
            <span title="" id="colse"></span></br>
            <!--游戏嘎嘎网页游戏平台　京网文[2011]0211-070号 京公网安备11010802009968号 京ICP备11047423号-->
            <!-- iframe id="iframe"   width="100%" height="100%"   scrolling="no" frameborder="0" src="#"></iframe -->
        </div>
      </div>
    </div>
</template>

<script>
import { Group, Cell, Popup, XInput } from "vux";
import axios from "axios";
export default {
  data() {
    return {
      tabList: ["兑换欢乐豆",  "存欢乐豆", "取欢乐豆"],
      myBeanMessage: {}, // 豆值信息
      exchangeMessage: {
        bean: "",
        glod_coin: "",
        saveBean: "",
        getBean: "",
        password: ""
      },
      countdown: 0, //倒计时
      countdownimg: false,
      runtime: 100,
      timeToOpen: false,
      tabIndex: "兑换欢乐豆",
      isLine: false,
      value: "",
      lastOpenValue: "", //上盘跑马灯停止的位置
      isApply: false,
      isShowIndex: false, // 是否显示首页
      showLoadPage: false,
      isShopowner: false,
      isAutomatic: false,
      isQualified: false,
      mouseImgNumber: [],
      userAllProfit: 0,
      openResult:'',//开奖计时器
      imgList1: [
        {
          img: "/static/img/img1.png"
        },
        {
          img: "/static/img/img2.png"
        },
        {
          img: "/static/img/img3.png"
        },
        {
          img: "/static/img/img4.png"
        }
      ], // 历史记录列表
      code: 2, // 大转盘码
      gameStatus: 0, // 游戏阶段 0是下注阶段 1是开奖阶段 2是休息阶段
      rateImgUrl: "/static/img/rate2.png",
      bettingList: [
        {
          codeList: [], // 筹码列表
          jetonNumber: 0, // 开奖区域筹码数
          jetonNumberList: [],
          proportion: 3, // 筹码对应的开奖比重
          code: 0, // 筹码标号
          rate: 40, // 筹码倍率
          playerPump: 0, // 玩家抽水总数
          MyjetonNumber: 0, // 对应下注筹码数
          MyjetonNumberList: [0], // 玩家下注筹码数字列表
          jetonNumberActual: 0, // 当前注码区域实际注码数(抽水后的)
          noJetonNumber: 0 // 当前注码区域注码数(未抽水的)
        },
        {
          codeList: [],
          jetonNumber: 0,
          proportion: 4,
          jetonNumberList: [],
          code: 1,
          rate: 30,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        },
        {
          codeList: [],
          jetonNumber: 0,
          jetonNumberList: [],
          proportion: 6,
          code: 2,
          rate: 20,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        },
        {
          codeList: [],
          jetonNumber: 0,
          proportion: 12,
          jetonNumberList: [],
          code: 3,
          rate: 10,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        },
        {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 4,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        },
        {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 5,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        },
        {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 6,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        },
        {
          codeList: [],
          jetonNumber: 0,
          proportion: 24,
          jetonNumberList: [],
          code: 7,
          rate: 5,
          playerPump: 0,
          MyjetonNumber: 0,
          MyjetonNumberList: [0],
          jetonNumberActual: 0,
          noJetonNumber: 0
        }
      ], // 投注列表
      betIndex: "",
      codeInterval: "",
      times: 100,
      direction: {
        pageUp: true,
        pageDown: true,
        pageLeft: true,
        pageRight: true
      }, // 方向键
      chipList: [
        {
          keyDown: false,
          numList: ["1", "0", "w"],
          img: "/static/img/jeton1.png",
          number: 10
        },
        {
          keyDown: false,
          numList: ["2", "0", "w"],
          img: "/static/img/jeton2.png",
          number: 20
        },
        {
          keyDown: false,
          numList: ["5", "0", "w"],
          img: "/static/img/jeton3.png",
          number: 50
        },
        {
          keyDown: false,
          numList: ["1", "0", "0", "w"],
          img: "/static/img/jeton4.png",
          number: 100
        },
        {
          keyDown: false,
          numList: ["1", "5", "0", "w"],
          img: "/static/img/jeton5.png",
          number: 150
        },
        {
          keyDown: false,
          numList: ["5", "0", "0", "w"],
          img: "/static/img/jeton6.png",
          number: 500
        }
      ], // 筹码列表
      rankList: [], // 排行榜
      setMessage: {}, // 设置信息
      islimit: false, // 是否限制进入游戏
      hisPage: 1, // 开奖码分页
      maxBetting: 50000000, // 单局最大下注数
      perwinmax: 1000000000,
      rankshow: 0, // 排行榜显示 0 昵称 1 idx 2 昵称+idx
      codeIndex: "", // 筹码的索引值
      mouseCodeImg: "", // 鼠标跟随图片地址
      mouseCodeBox: false,
      coordinate: {
        x: "",
        y: ""
      },
      countDownNumber: {
        a: 1,
        b: 2
      },
      countDownNumberList: [
        {
          img: "/static/img/timeNum0.png"
        },
        {
          img: "/static/img/timeNum1.png"
        },
        {
          img: "/static/img/timeNum2.png"
        },
        {
          img: "/static/img/timeNum3.png"
        },
        {
          img: "/static/img/timeNum4.png"
        },
        {
          img: "/static/img/timeNum5.png"
        },
        {
          img: "/static/img/timeNum6.png"
        },
        {
          img: "/static/img/timeNum7.png"
        },
        {
          img: "/static/img/timeNum8.png"
        },
        {
          img: "/static/img/timeNum9.png"
        }
      ],
      betNumberList: [
        {
          img: "/static/img/nb0.png"
        },
        {
          img: "/static/img/nb1.png"
        },
        {
          img: "/static/img/nb2.png"
        },
        {
          img: "/static/img/nb3.png"
        },
        {
          img: "/static/img/nb4.png"
        },
        {
          img: "/static/img/nb5.png"
        },
        {
          img: "/static/img/nb6.png"
        },
        {
          img: "/static/img/nb7.png"
        },
        {
          img: "/static/img/nb8.png"
        },
        {
          img: "/static/img/nb9.png"
        },
        {
          img: "/static/img/nbw.png"
        }
      ],
      winCode: "",
      setCountDown: "", // 定时器名字
      recharge: {
        rechargeIndex: 0,
        rechargeList: [
          {
            img: "/static/img/recharge1.png"
          },
          {
            img: "/static/img/recharge2.png"
          },
          {
            img: "/static/img/recharge3.png"
          },
          {
            img: "/static/img/recharge4.png"
          }
        ]
      },
      helpTips: {
        helpTipsIndex: 0,
        helpTipsList: [
          {
            img: "/static/img/helpTips1.png"
          },
          {
            img: "/static/img/helpTips2.png"
          },
          {
            img: "/static/img/helpTips3.png"
          },
          {
            img: "/static/img/helpTips4.png"
          }
        ]
      },
      isVoiceHover: false,
      voice: {
        voiceStatus: false
      },
      gamesNumber: 1, // 游戏局数
      myMessage: {
        nickname: "",
        id: "",
        glod_coin: 0,
        jetonNumber: 0,
        siteid: "",
        sid: "",
        siteidp: ""
      },
      shopownerMessage: {
        glod_coin: 0,
        profit: "",
        siteid: "",
        sid: ""
      },
      pumpShop: 0.005,
      showTips: {
        status: false,
        text: "金额不足，不能投注！"
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
      userJetonList: [],
      isLogin: true, // 是否登陆
      chargeRecordList: [], // 押中的code 码列表
      chargeRecord: [], // 显示历史记录
      historyList: [], //历史记录，保存在前端
      isRepeatBet: false,
      minBankerNum: 100000000,
      remark:`金额不足${100000000 / 10000}万不能申请做店长`,
      bankerList: [],
      bankerIndex: 0,
      bankerNum: "",
      voiceTime: "", // 语音图标定时器
      voiceIndex: 0,
      isLink: true,
      processValue: 0,
      processTime: "",
      loadImgList: [
        // '/static/sounds/sound5.wav',
        // '/static/sounds/sound6.wav',
        "/static/img/rate1.png",
        "/static/img/bet_bc2.jpg",
        "/static/img/rate2.png",
        "/static/img/loadBack.png",
        "/static/img/process1.png",
        "/static/img/process2.png",
        "/static/img/process3.png",
        "/static/img/historyImg.png",
        "/static/img/imgList.png",
        "/static/img/beShopowner.png",
        "/static/img/bc_top.png",
        "/static/img/bc_right.jpg",
        "/static/img/bc_main.jpg",
        "/static/img/bc_left.jpg",
        "/static/img/automaticTips.png",
        "/static/img/abandon.png",
        "/static/img/winBc1.png",
        "/static/img/winBc2.png",
        "/static/img/voiceHoverList.png",
        "/static/img/voiceList.png",
        "/static/img/repeat.png",
        "/static/img/imgChoosed1.png",
        "/static/img/imgChoosed2.png",
        "/static/img/imgChoosed3.png",
        "/static/img/imgChoosed4.png",
        "/static/img/imgChoosed5.png",
        "/static/img/imgChoosed6.png",
        "/static/img/imgChoosed7.png",
        "/static/img/imgChoosed8.png",
        "/static/img/nb0.png",
        "/static/img/nb1.png",
        "/static/img/nb2.png",
        "/static/img/nb3.png",
        "/static/img/nb4.png",
        "/static/img/nb5.png",
        "/static/img/nb6.png",
        "/static/img/nb7.png",
        "/static/img/nb8.png",
        "/static/img/nb9.png",
        "/static/img/nbk.png",
        "/static/img/nbw.png",
        "/static/img/jeton1.png",
        "/static/img/jeton2.png",
        "/static/img/jeton3.png",
        "/static/img/jeton4.png",
        "/static/img/jeton5.png",
        "/static/img/jeton6.png",
        "/static/img/timeNum0.png",
        "/static/img/timeNum1.png",
        "/static/img/timeNum2.png",
        "/static/img/timeNum3.png",
        "/static/img/timeNum4.png",
        "/static/img/timeNum5.png",
        "/static/img/timeNum6.png",
        "/static/img/timeNum7.png",
        "/static/img/timeNum8.png",
        "/static/img/timeNum9.png"
      ],
      count: 0, // 预加载图片数量
      loadImgLength: 50,
      scrollTop: 0,
      scrollLeft: 0
    };
  },
  mounted() {
    let that = this;
    // alert(this.OPENURL)
    that.$socket.emit("connect");
    // that.showLoadPage = true
    // that.isShowIndex = true
    // that.voice.voiceStatus = true
    // that.voiceImg()
    that.voiceImg();
    if (sessionStorage.getItem("onloadImg") !== "1") {
      that.isShowIndex = false;
      that.loadImg();
      that.voiceImg();
      let video1 = document.createElement("video");
      video1.setAttribute("src", "/static/sounds/sound5.wav");
      video1.load();
      let video2 = document.createElement("video");
      video2.setAttribute("src", "/static/sounds/sound6.wav");
      video2.load();
    } else {
      that.showLoadPage = true;
      that.isShowIndex = true;
      that.voice.voiceStatus = true;
      that.voiceImg();
    }
    // 绑定滚动
    let box = that.$refs.container;
    box.addEventListener("scroll", function() {
      that.scrollTop = box.scrollTop;
      that.scrollLeft = box.scrollLeft;
    });
  },
  sockets: {
    connect: function() {
      this.code = "";
      this.myMessage.sid = this.$route.query.sid;
      this.showTips.status = false;
      this.myMessage.siteidp = this.$route.query.sites;
      // alert(this.$route.query.sites)
      // alert('连接成功')
      // this.$socket.emit('login', {sid: this.$route.query.sid})
      if (this.isLogin) {
        this.$socket.emit("login", {
          sid: this.$route.query.sid,
          siteid: this.$route.query.sites
        });
        this.isLogin = false;
      }
    },
    //   reconnect:function(){
    //       this.$socket.emit('login', {sid: this.$route.query.sid})
    //       alert('断开重连')
    //   }
    //   ,
    setTime: function(msg) {
      clearInterval(this.countdownimg);
      this.countdownimg = "";
      console.log("收到消息");
      var that = this;
      this.gameStatus = msg.gameStatus;
      that.countdown = msg.bettingTime;
      console.log(that.countdown)
      this.countDownNumber.a = Math.floor(msg.bettingTime / 10);
      this.countDownNumber.b = msg.bettingTime % 10;
      this.countdownimg = setInterval(function() {
        if (that.bankerList.length <= 0) {
          return;
        }
        if (msg.gameStatus === 2 && msg.bettingTime === 0) {
          // that.$socket.emit("newGame");
        }
        if (that.countdown > 0) {
          //    console.log( that.countdown )
          that.countdown -= 1;
          that.countDownNumber.a = Math.floor(that.countdown / 10);
          that.countDownNumber.b = that.countdown % 10;
        }
      }, 1000);

      if (msg.gameStatus === 0 && msg.bettingTime === 0) {
        //   this.$socket.emit('open')
      } else if (msg.gameStatus === 2 && msg.bettingTime === 0) {
        // this.$socket.emit("newGame");
      }
    },
    login: function(msg) {
      // let that = this
      //   setInterval(()=>{console.log('newgame');
      //  that.$socket.emit("newGame");
      // },100)
      console.log("msg", msg);
      if (msg.error_code === "SUCCESS") {
        console.log(msg);
        this.gamesNumber = msg.result.gameNum;
        this.gameStatus = msg.result.gameStatus;
        this.isApply = msg.result.is_banker;
        this.bankerNum = msg.result.bankNum;
        this.bankerList = msg.result.bankerList;
        if (msg.result.bankerList.length > 0) {
          this.shopownerMessage = msg.result.bankerList[0];
        } else {
          this.showTips.status = true;
          this.showTips.text = "当前没有店长，无法下注";
          this.bankerNum = 1;
        }
        this.shopownerMessage.glod_coin = msg.result.bankerWealth;
        this.minBankerNum = msg.result.minBankerNum;
        this.$socket.emit("setTime");
        this.myMessage.id = msg.result.id;
        this.myMessage.glod_coin = msg.result.glod_coin;
        this.myMessage.siteid = msg.result.siteid;
        this.myMessage.nickname = msg.result.nickname;
        this.countDownNumber.a = Math.floor(msg.result.bettingTime / 10); //倒计时
        this.countDownNumber.b = msg.result.bettingTime % 10;
        this.pumpPercentage = msg.result.pumpPercentage;
        this.chipList = msg.result.chipList; //筹码列表
        this.rankList = msg.result.rankList;
        this.bettingList = msg.result.bettingList;
        console.log(msg.result.setMessage)
        if (msg.result.setMessage) {
          this.setMessage = msg.result.setMessage;
          this.minBankerNum = this.setMessage.bankerup; // 上庄最小数
          if(msg.result.setMessage.system_banker_set == true){
            this.remark = `当前为系统用户,不能申请为店长`
          }else{
            this.remark = `金额不足${this.minBankerNum / 10000}万不能申请做店长`
          }
          this.rankshow = this.setMessage.rankshow; // 排行榜显示
          // this.rankshow = this.setMessage.rankshow
          if (this.setMessage.rate === 0) {
            this.rateImgUrl = "/static/img/rate1.png";
          } else {
            this.rateImgUrl = "/static/img/rate2.png";
          }
          // console.log(this.setMessage.bankerup)
          if( this.setMessage.exchange_coin * 1 == 1) this.tabList.splice(1,0,'欢乐豆兑换喇叭')
          this.maxBetting = this.setMessage.persglmax; // 单局最大下注数
          this.perwinmax = this.setMessage.perwinmax; // 最大输赢数
          let that = this;
          setTimeout(function() {
            that.getPerwin(msg.result.id, that.setMessage.perwinmax);
            that.checkBlock(msg.result.id);
          }, 200);
        }
        // console.log(this.rankList, '222222222')
        // this.setTimeDown(msg.result.bettingTime)
        // this.countDownSet(msg.result.bettingTime)
        for (var i = 0; i < this.bettingList.length; i++) {
          this.bettingList[i].codeList = msg.result.codeList[i];
          // console.log(msg.result.jetonNumber, 'msg.result.jetonNumber')
          this.bettingList[i].jetonNumber = msg.result.jetonNumber[i] / 10000;
          // console.log(this.bettingList[i].jetonNumber)
          this.bettingList[i].jetonNumberList = String(
            Math.round(msg.result.jetonNumberBet[i] / 10000)
          ).split("");
          //   console.log(msg.result.jetonNumber[i])
          //   console.log(msg.result.jetonNumberBet[i])
          this.bettingList[i].noJetonNumber = msg.result.jetonNumberBet[i];
          this.bettingList[i].MyjetonNumberList = String(
            msg.result.userJeton1[i].jeton / 10000
          ).split("");
          if (msg.result.userJeton1[i].jeton > 0) {
            this.bettingList[i].MyjetonNumberList.push(11);
          }
        }
        msg.result.chargeRecord.sort(function(a, b) {
          return a.gameNum - b.gameNum;
        });
        this.chargeRecord = msg.result.chargeRecord;

        this.historyList = [...msg.result.chargeRecord]; //深拷贝
        this.historyList.sort(function(a, b) {
          return b.gameNum - a.gameNum;
        });
        // console.log(
        //   " this.historyList = msg.result.chargeRecord;111",
        //   this.historyList
        // );
        // console.log(" this.chargeRecord ", this.chargeRecord);
        this.code = msg.result.winCodeCopy;
        this.isLine = true;
        this.shopQualified();
      } else {
        let that = this;
        that.islimit = true;
        that.showTips.status = true;
        that.showTips.text = msg.reason;
      }
    },
    newGame: function(msg) {
      var that = this;
      that.code = "";
      this.gamesNumber = msg.gameNum;
      this.bettingList = msg.bettingList;
      this.bankerNum = msg.bankerNum;
      this.chipList = msg.chipList;
      // console.log(msg.bankerWealth, '33333')
      
      if (msg.setMessage) {
        if(msg.setMessage.exchange_coin * 1 != this.setMessage.exchange_coin *1){
          if( msg.setMessage.exchange_coin * 1 == 1) this.tabList.splice(1,0,'欢乐豆兑换喇叭')
          if(msg.setMessage.exchange_coin * 1 == 0){
            this.tabList.splice(this.tabList.indexOf('欢乐豆兑换喇叭'),1)
            this.tabIndex = '兑换欢乐豆'
          }
        }
        this.setMessage = msg.setMessage;
        this.minBankerNum = this.setMessage.bankerup;
        this.rankshow = this.setMessage.rankshow;
        this.maxBetting = this.setMessage.persglmax; // 单局最大下注数
        this.perwinmax = this.setMessage.perwinmax; //最大输赢限制
      }
      if (msg.rankList && msg.rankList.length > 0) {
        this.rankList = msg.rankList;
      }
      

      this.bankerList = msg.bankerList;
      this.shopownerMessage = msg.bankerList[0];
      this.shopownerMessage.glod_coin = msg.bankerWealth;
      if (this.bankerList.length > 0) {
        //关闭无店长不可下注提示
        this.showTips.status = false;
      }
      var isBanker = false;
      this.bankerList.forEach(value => {
        if (value.sid === that.myMessage.sid) {
          isBanker = true;
        }
      });
      that.isApply = isBanker;
      // console.log(this.bankerList, '2222')
      // console.log(msg)
      // this.setChip(msg.carSetup)
      this.canRepeatBet();
      this.shopQualified();
      if (
        this.shopownerMessage.id === this.myMessage.id &&
        this.shopownerMessage.siteid === this.myMessage.siteid
      ) {
        console.log("获取豆豆");
        this.getMessage();
      }
    },
    betting: function(msg) {
      //allJetonNumber所有区域抽水后总数,防止店长输成负
      //   var isSuccess =
      //     (that.shopownerMessage.glod_coin +
      //       allJetonNumber * (1 - that.pumpShop)) >i.rate * (i.noJetonNumber + number); // 是否超过当前区域下注最大值
      //   console.log(that.shopownerMessage.glod_coin +allJetonNumber * (1 - that.pumpShop))
      //   console.log(i.rate * (i.noJetonNumber + number))
      //   if (!isSuccess) {
      //     that.showTextTips("达到当前区域下注最大值！");
      //     return false;
      //   }
      if (msg.status == 1) {
        this.showTextTips(msg.text);
        return false;
      }
      let that = this;
      let number = msg.betNum;
      //   let e = event || window.event;
      //   let scrollX =
      //     document.documentElement.scrollLeft || document.body.scrollLeft;
      //   let scrollY =
      //     document.documentElement.scrollTop || document.body.scrollTop;
      //   let boxLeft = that.$refs.box.offsetLeft;
      //   let boxTop = that.$refs.box.offsetTop;
      //   let x = e.pageX || e.clientX + scrollX;
      //   let y = e.pageY || e.clientY + scrollY;
      //   x = x - 99 - 26 - 143 * (msg.code % 4) - boxLeft
      //   y = y - 190 - 28 - 141 * parseInt(msg.code / 4) - boxTop
      //   x = parseInt(Math.random() * 86);
      //   y = parseInt(Math.random() * 86);
      // console.log('msg.code',msg.code)
      // let x = parseInt(Math.random() * 86);
      //  let y = parseInt(Math.random() * 86);
      // console.log('this.bettingList[msg.code]',this.bettingList[msg.code])
      //   this.bettingList[msg.code].codeList.push({
      //     img: that.mouseCodeImg,
      //     left: 20 + "px",
      //     top: 20 + "px"
      //   });
      //   console.log('codeList:',this.bettingList[msg.code].codeList)
      //   that.myCodeMessage.push({
      //     jetonNumber: number,
      //     index: msg.code
      //   });
      if (msg.surplus !== undefined) {
        this.myMessage.glod_coin = msg.surplus;
      }
      this.bettingList[msg.code].codeList.push(msg.codeList);
      this.bettingList[msg.code].jetonNumberList = msg.jetonNumber;
      this.bettingList[msg.code].jetonNumber = msg.jetonNumberActual;
      this.bettingList[msg.code].noJetonNumber = msg.noJetonNumber;
      if (msg.status == 2) {
        return false;
      }
      if (this.bettingList[msg.code].MyjetonNumber === "") {
        this.bettingList[msg.code].MyjetonNumber = number / 10000;
      } else {
        this.bettingList[msg.code].MyjetonNumber =
          number / 10000 + this.bettingList[msg.code].MyjetonNumber;
      }
      let playerPump = 0;
      console.log(
        "i.MyjetonNumber",
        this.bettingList[msg.code].MyjetonNumber,
        "+END"
      );
      playerPump = this.bettingList[msg.code]["playerPump"];
      this.bettingList[msg.code]["playerPump"] =
        this.bettingList[msg.code].MyjetonNumber * 10000 * that.pumpPercentage;
      playerPump = this.bettingList[msg.code]["playerPump"] - playerPump;
      //   if (i.MyjetonNumber >= 30) {
      //     playerPump = i["playerPump"];
      //     i["playerPump"] = i.MyjetonNumber * 10000 * that.pumpPercentage;
      //     playerPump = i["playerPump"] - playerPump;
      //   } else {
      //     i.playerPump = 0;
      //   }
      this.bettingList[msg.code].jetonNumber =
        this.bettingList[msg.code].jetonNumber +
        number / 10000 -
        playerPump / 10000;
      this.bettingList[msg.code].MyjetonNumberList = String(
        this.bettingList[msg.code].MyjetonNumber
      ).split("");
      this.bettingList[msg.code].MyjetonNumberList.push("11");

      //   this.bettingList[msg.code].codeList.push(msg.codeList);
      //   this.bettingList[msg.code].jetonNumberList = msg.jetonNumber;
      //   this.bettingList[msg.code].jetonNumber = msg.jetonNumberActual;
      //   this.bettingList[msg.code].noJetonNumber = msg.noJetonNumber;
      //   this.setCodeList();
      // console.log(msg.userWealth)
    },
    outLine: function(msg) {
      console.log("断线了", msg);
    },
    open: function(msg) {
      //跑马灯
      // this.code = msg
      var that = this;
      this.isRepeatBet = false
      that.runtime =90;
      var codeStart = parseInt(Math.random() * 32);
      var SolwRuntime = 0;
      that.timeToOpen = false;
      if (that.lastOpenValue) {
        codeRun(that.lastOpenValue, msg);
      } else {
        codeRun(codeStart, msg);
      }

      function codeRun(code, winCode) {
        var codeInterval = setInterval(function() {
          if (code === 32) {
            code = 0;
          }
          code++;
          that.code = code;
          //   console.log('code',code)
          clearInterval(codeInterval);
          var codeNum = code % 8;
          if (codeNum === 0) {
            codeNum = 7;
          } else if (codeNum === 1) {
            codeNum = 0;
          } else if (codeNum === 2) {
            codeNum = 4;
          } else if (codeNum === 3) {
            codeNum = 1;
          } else if (codeNum === 4) {
            codeNum = 5;
          } else if (codeNum === 5) {
            codeNum = 2;
          } else if (codeNum === 6) {
            codeNum = 6;
          } else if (codeNum === 7) {
            codeNum = 3;
          }
          var isSlow = false;
       
          var isvarySlow = false;
          if (
            that.countdown < 8 &&
            that.gameStatus === 1 &&
            codeNum === winCode
          ) {
            isSlow = true;
          }
          if (isSlow) {
            that.runtime = that.runtime + 190;
          }
          // console.log(
          //   `that.countdown:${
          //     that.countdown
          //   },codeNum:${codeNum},winCode:${winCode}`
          // );
          if (that.countdown < 3 && codeNum === winCode) {
            // winCodeCopy = winCode;
            codeStart = code;
            that.timeToOpen = true;
            that.lastOpenValue = code;
            SolwRuntime = 0;
            // socket.emit('settle')
            // socket.broadcast.emit('settle')
          } else if (that.gameStatus === 1) {
            codeRun(code, winCode);
          } else {
            // socket.emit('settle')
            // socket.broadcast.emit('settle')
            // that.timeToOpen = true;
            SolwRuntime = 0;
          }
          return code;
        }, that.runtime);
      }
      // console.log(this.code, '开奖码')
    },
    settle: function() {
      // console.log('游戏结束，去后台请求数据')
      // this.$socket.emit("stopRun");
    },
    stopRun: function(msg) {
      var that = this;
      var openmsg = msg;
      // console.log(msg)
      // console.log('stopRun')
      clearInterval(that.openResult);
      that.openResult = setInterval(function() {
        if(that.gameStatus == 0){
          //压注时间清掉，防止用户网络卡，开出上盘结果
            clearInterval(that.openResult);
            return
        }
        if (!that.timeToOpen) {
          return false;
        }
        clearInterval(that.openResult);
        that.timeToOpen = false;
        that.shopownerProfit = openmsg.thisProfit;
        that.shopownerMessage.glod_coin = openmsg.bankerWealth;
        that.userJeton = openmsg.userWealth;
        that.userProfit = openmsg.userProfit;
        that.alluserProfit = openmsg.alluserProfit; // 玩家进入游戏后的总收益
        that.myMessage.jetonNumber = openmsg.alluserProfit; //玩家成绩
        // console.log(that.myMessage, msg.alluserProfit)
        that.awardResults = true;
        that.betIndex = openmsg.winCode;
        if (that.betIndex >= 0) {
          that.bettingList[that.betIndex].codeList = [];
        }
        that.timeOver = true;
        that.userAllProfit += openmsg.userProfit * 1;
        // console.log(that.betIndex, that.code)
        setTimeout(function() {
          that.betIndex = "";
          that.awardResults = false;
          that.code = "";
          that.userJeton = 0;
          that.userProfit = 0;
          that.timeOver = false;
          console.log("that.userAllProfit", that.userAllProfit);
          console.log("that.perwinmax", that.perwinmax);
          if (Math.abs(that.userAllProfit) > that.perwinmax * 1) {
            that.islimit = true;
            that.showTips.status = true;
            that.showTips.text = "达到当天输赢上限，禁止进入!";
            that.$socket.emit("outLine");
          }
        }, 3000);
        openmsg.chargeRecord.sort(function(a, b) {
          return a.gameNum - b.gameNum;
        });
        // that.chargeRecord = openmsg.chargeRecord;
        console.log(
          "openmsg.chargeRecord[openmsg.chargeRecord.length-1]",
          openmsg.chargeRecord[openmsg.chargeRecord.length - 1]
        );
        that.historyList.unshift(
          openmsg.chargeRecord[openmsg.chargeRecord.length - 1]
        );
        let history = that.historyList.slice(0, 11);

        that.chargeRecord = history.sort(function(a, b) {
          return a.gameNum - b.gameNum;
        });
        that.hisPage = 1;
        console.log(" that.historyList", that.chargeRecord);
        if (openmsg.surplus !== undefined) {
          that.myMessage.glod_coin = openmsg.surplus;
        }
        openmsg.userJeton.forEach(value=>{
          if( 0 != value.jeton){
              that.userJetonList = openmsg.userJeton;
          }
        })
      
        that.isApply = openmsg.isInBankerList;
        // console.log(msg.isInBankerList, '231313131')
        if (!that.isApply) {
          if (that.isAutomatic) {
            that.apply();
          }
        }
      }, 100);
    },
    lineUp: function(msg) {
      this.bankerList = msg.bankerList;
      let bankerWealth = "";
      var that = this
      if (msg.bankerWealth) {
        bankerWealth = msg.bankerWealth;
      } else {
        bankerWealth = this.shopownerMessage.glod_coin;
      }
      if (msg.bankerList.length < 2) {
        this.shopownerMessage = msg.bankerList[0];
        this.shopownerMessage.glod_coin = bankerWealth;
      }
      if (this.bankerList.length > 0) {
        //关闭无店长不可下注提示
        this.showTips.status = false;
        if (this.bankerList.length == 1) {
          this.countDownNumber.a = Math.floor(2 / 10);
          this.countDownNumber.b = 2 % 10;
          this.gameStatus = 2;
          this.countdown = 2
          clearInterval(this.countdownimg);
          this.countdownimg = setInterval(function() {
            if (that.bankerList.length <= 0) {
              return;
            }
            if( that.countdown ==0){
              return
            }
            if (that.countdown > 0) {
              //    console.log( that.countdown )
              that.countdown -= 1;
              that.countDownNumber.a = Math.floor(that.countdown / 10);
              that.countDownNumber.b = that.countdown % 10;
            }
          }, 1000);
        }
      }
      // if (!this.isLine) {
      //   this.$socket.emit('connect')
      // }
    },
    adandon: function(msg) {
      let that = this;
      that.bankerList = msg.bankerList;
      if (msg.isApply === 1) {
        that.isApply = false;
      }
      // console.log(that.isApply, 'that.isApply')
      // this.bankerNum = msg.bankerNum
    },
    start: function() {
      // this.$socket.emit("start");
    },
    gameOver: function(msg) {
      this.bankerList = msg.bankerList;
      this.shopownerMessage = {
        glod_coin: 0,
        profit: "",
        siteid: "",
        sid: ""
      };
      // this.shopownerMessage = msg.bankerList[0]
      this.isApply = false;
      this.isAutomatic = false;
      this.gamesNumber = msg.gameNum;
      this.bettingList = msg.bettingList;
      this.bankerNum = msg.bankerNum;
      this.chipList = msg.chipList;
      // console.log(msg.bankerWealth, '33333')
      if (msg.setMessage) {
        this.setMessage = msg.setMessage;
        this.minBankerNum = this.setMessage.bankerup;
        this.rankshow = this.setMessage.rankshow;
      }
      this.rankList = msg.rankList;
      this.isLine = false;
      if (this.bankerList <= 0) {
        this.showTips.status = true;
        this.showTips.text = "当前没有店长，无法下注";
      }
    },
    getHistory: function(msg) {
      // console.log(msg)
      let that = this;
      msg.chargeRecord.sort(function(a, b) {
        return a.gameNum - b.gameNum;
      });
      if (msg.chargeRecord.length < 11) {
        that.hisPage--;
      } else {
        that.chargeRecord = msg.chargeRecord;
      }
    },
    disconnect: function(msg) {
      //socket断线
      this.isLogin = true;
      if (this.showTips.status == false) {
        this.showTips.status = true;
        this.showTips.text = "与服务器的连接断开，请重新打开本页面重连";
      }

      // this.bankerNum = 0
    },
    downBanker: function(msg) {
      this.isApply = msg.isInBankerList;
      if (!this.isApply) {
        if (this.isAutomatic) {
          this.apply();
        }
      }
    }
  },
  activated() {
    let that = this;
    //   alert(this.$route.query.sites)
    that.getToken();
  },
  deactivated() {
    let that = this;
    that.showLoadPage = false;
    that.$socket.emit("disconnect");
  },
  update_setMessage(msg){
      this.setMessage = msg
      this.shopQualified()
  },
  watch: {
    count(val, oldval) {
      let that = this;
      that.processValue = parseInt((val / that.loadImgLength) * 100);
      if (val > 3) {
        that.showLoadPage = true;
      }
      if (val === that.loadImgLength) {
        setTimeout(function() {
          that.isShowIndex = true;
          sessionStorage.setItem("onloadImg", "1");
          that.voice.voiceStatus = true;
        }, 100);
      }
    }
  },
  methods: {
    loadImg() {
      let that = this;
      let imgs = document.querySelectorAll("img.loadimg");
      that.loadImgLength = imgs.length;
      Array.from(imgs).forEach(item => {
        let img = new Image();
        img.src = item.getAttribute("src");
        img.onload = () => {
          that.count++;
        };
      });
    },
    // 设置筹码列表
    setCodeList() {
      let that = this;
      for (let i = 0; i < that.bettingList.length; i++) {}
    },
    // 申请做店长
    apply() {
      let that = this;
      console.log(this.setMessage);
      
      if(this.setMessage.system_banker_set == true){
        return that.showTextTips("当前为系统用户,不能申请为店长");
      }
      if (
        this.bankerList[0] &&
        this.myMessage.sid == this.bankerList[0].sid &&
        !this.isAutomatic
      ) {
        that.showTextTips("请在下局再申请做店长");
        return false;
      }
      if (that.isQualified) {
        if(that.myMessage.glod_coin <that.minBankerNum){
            that.showTextTips("金币不足！");
            that.isAutomatic = false;
            return
        }
        that.isApply = true;
        this.$socket.emit("lineUp", {
          id: that.myMessage.id,
          glod_coin: that.myMessage.glod_coin,
          siteid: that.myMessage.siteid,
          sid: that.myMessage.sid
        });
      } else {
        that.showTextTips("金币不足！");
        that.isAutomatic = false;
      }
    },
    shopQualified() {
      let that = this;
      if(that.setMessage.system_banker_set == true){
        this.remark = `当前为系统用户,不能申请为店长`
        that.isQualified = false;
        that.isAutomatic = false;
      }else{
        this.remark = `金额不足${this.minBankerNum / 10000}万不能申请做店长`
        if (that.myMessage.glod_coin > that.minBankerNum ) {
        that.isQualified = true;
        } else {
        that.isQualified = false;
        that.isAutomatic = false;
        }
      }

    },
    // 放弃做店长
    abandon() {
      let that = this;
      // that.isApply = false
      //   if(this.myMessage.sid == this.bankerList[0].sid && this.gameStatus == 1){
      //       this.showTextTips('请不要在开奖时间放弃店长')
      //   }else{

      //   }
      this.$socket.emit("adandon", { id: that.myMessage.id });
    },
    // 自动排庄
    automatic() {
      let that = this;
      let status = that.isAutomatic;
      if (!that.isQualified) {
        if (!status) {
          if(this.setMessage.system_banker_set == true){
            return this.showTextTips('当前为系统用户,不能申请为店长')
          }
          that.showTips.status = true;
          that.showTips.text = "金币不足！";
          setTimeout(function() {
            that.showTips.status = false;
          }, 2000);
        } else {
          that.isAutomatic = false;
          // 发送取消自动拍庄请求
        }
        return false;
      }
      // that.isQualified = status
      // 发送请求 拍庄还是取消
      if (!status) {
        if (that.myMessage.glod_coin > that.minBankerNum) {
          that.isQualified = true;
          // that.$socket.emit('line in')
          if (!that.isApply) {
            that.apply();
          }
          that.isAutomatic = true;
        } else {
          that.isQualified = false;
        }
      } else {
        that.isAutomatic = false;
      }
    },
    // 点击筹码 鼠标按下时
    codeDown(i, index) {
      let that = this;
      if (that.gameStatus === 0) {
        i.keyDown = true;
        that.codeIndex = index;
        that.mouseImgNumber = that.chipList[index].numList;
      }
    },
    // 点击筹码时 鼠标抬起时
    codeUp() {
      let that = this;
      if (that.codeIndex === undefined || that.codeIndex === "") {
        return false;
      }
      that.chipList[that.codeIndex].keyDown = false;
      that.mouseCodeImg = that.chipList[that.codeIndex].img;
    },
    // 在投注区 鼠标移动时
    mouseCodeMove() {
      let that = this;
      let e = event || window.event;
      let boxLeft = that.$refs.box.offsetLeft;
      let boxTop = that.$refs.box.offsetTop;
      if (
        boxTop === 0 ||
        boxTop === undefined ||
        boxTop < 80 ||
        boxTop === ""
      ) {
        boxTop = 88;
      }
      let scrollX = that.scrollLeft;
      let scrollY = that.scrollTop;
      let x = e.pageX + scrollX || e.clientX + scrollX;
      let y = e.pageY + scrollY || e.clientY + scrollY;
      that.coordinate.x = x - boxLeft - 5;
      that.coordinate.y = y - boxTop - 23;
      if (
        y < 200 + boxTop ||
        y > 455 + boxTop ||
        x > 650 + boxLeft ||
        x < 105 + boxLeft ||
        that.mouseCodeImg === ""
      ) {
        that.mouseCodeBox = false;
      } else {
        that.mouseCodeBox = true;
      }
    },
    // 在筹码区堆叠筹码
    betAdd(i, index, codeNum) {
      let that = this;
      // console.log(this.shopownerMessage.id, this.myMessage.id)
      // if (this.bankerList.length <= 0) {
      //    that.showTextTips('当前没有店长，无法下注')
      //     return false
      // }
      if (
        this.shopownerMessage.id === this.myMessage.id &&
        this.shopownerMessage.siteid === this.myMessage.siteid
      ) {
        that.showTextTips("当前店长不能下注！");
        return false;
      }
      if (that.mouseCodeImg === "" || that.gameStatus !== 0 || codeNum === 0) {
        return false;
      }
      let number = "";
      if (codeNum > 1000) {
        number = codeNum;
      } else {
        if (that.codeIndex >= 0) {
          number = that.chipList[that.codeIndex].number;
        } else {
          number = 0;
        }
        number = number * 10000; // 单位是万
      }
      var allJetonNumber = 0;
      var allPlayerPump = 0;
      var allMybetting = 0;
      for (let k = 0; k < that.bettingList.length; k++) {
        allJetonNumber += that.bettingList[k].jetonNumber;
        allPlayerPump += that.bettingList[k].playerPump;
        allMybetting += that.bettingList[k].MyjetonNumber * 10000;
      }
      if (this.bankerList.length <= 0) {
        //当前没有店长，无法下注
        this.showTips.status = true;
        this.showTips.text = "当前没有店长，无法下注";
        return false;
      }
      if (allMybetting + number > that.maxBetting) {
        that.showTextTips("达到单局最大下注数！");
        return false;
      }
      if (number > that.myMessage.glod_coin) {
        that.showTextTips("金额不足，不能投注！");
        return false;
      }
      //  let x = parseInt(Math.random() * 86);
      //  let y = parseInt(Math.random() * 86);
      //   x = x - 99 - 26 - 143 * (msg.code % 4) - boxLeft
      //   y = y - 190 - 28 - 141 * parseInt(msg.code / 4) - boxTop

      //     console.log('i',i)
      //      i.codeList.push({
      //     img: that.mouseCodeImg,
      //     left: 20 + "px",
      //     top: 20 + "px"
      //   });
      //   console.log('codeList:',i.codeList)
      //   that.myCodeMessage.push({
      //     jetonNumber: number,
      //     index: index
      //   });
      that.$socket.emit("betting", {
        i,
        number,
        mouseCodeImg: that.mouseCodeImg
      });
    },
    // 声音开关
    soundToggle() {
      let that = this;
      that.voice.voiceStatus = !that.voice.voiceStatus;
      // console.log(that.voice.voiceStatus, '22222')
      if (!that.voice.voiceStatus) {
        clearInterval(that.voiceTime);
        that.voiceIndex = 4;
      } else {
        that.voiceImg();
      }
    },
    // 是否能重复下注
    canRepeatBet() {
      let that = this;
      let betList = that.userJetonList;
      let myCode = that.myMessage.glod_coin;
      let codeNum = 0;
      for (let i = 0; i < betList.length; i++) {
        if (betList[i].jeton >= 300000) {
          codeNum += betList[i].jeton * (1 + that.pumpPercentage);
          codeNum = parseInt(codeNum) + 1;
        } else {
          codeNum += betList[i].jeton;
        }
      }
      if (myCode >= codeNum && codeNum !== 0) {
        that.isRepeatBet = true;
      } else {
        that.isRepeatBet = false;
      }
    },
    // 重复下注
    repeatBet() {
      let that = this;
      if (that.gameStatus !== 0) {
        return false;
      }
      let betList = that.userJetonList;
      if (!that.isRepeatBet) {
        return false;
      }
      for (let i = 0; i < betList.length; i++) {
        if (betList[i].jeton > 0) {
          that.betAdd(that.bettingList[i], i, betList[i].jeton);
        }
      }
    },
    voiceImg() {
      let that = this;
      clearInterval(that.voiceTime);
      that.voiceTime = setInterval(function() {
        if (that.voiceIndex >= 3) {
          that.voiceIndex = 0;
        } else {
          that.voiceIndex++;
        }
      }, 200);
    },
    // 游戏设置
    setChip(data) {
      console.log(data, "data");
      if (data.isChanged === 0) {
        return false;
      }
    },
    changeTab(index) {
      let that = this;
      console.log(index);
      that.tabIndex = index;
    },
    bankerListPage(type) {
      let that = this;
      let length = that.bankerList.length - 1;
      // let length = 10
      if (type === 1) {
        that.direction.pageUp = true;
        if (length < 3) {
          return false;
        }
        if (that.bankerIndex > 0) {
          that.bankerIndex--;
        }
      } else {
        that.direction.pageDown = true;
        if (length < 3) {
          return false;
        }
        if (that.bankerIndex < length - 2) {
          that.bankerIndex++;
        }
      }
      console.log(that.bankerIndex);
      // if (length < 3) {
      //   return false
      // }
      // if (direction === 'pageUp') {
      //   if (that.bankerIndex > 0) {
      //     that.bankerIndex--
      //   }
      // } else if (that.bankerIndex < length - 2) {
      //   that.bankerIndex++
      // }
    },
    getToken() {
      let that = this;
      that.getMessage();
      // axios({
      //   method: 'get',
      //   url: 'this.OPENURL/money/token',
      //   data: {},
      //   withCredentials: true
      // }).then((response) => {
      //   if (response.error_code === 'SUCCESS') {
      //     that.getMessage()
      //     // console.log(32333)
      //   }
      // })
    },
    // 获取豆值信息
    getMessage() {
      let that = this;
      axios({
        method: "get",
        url:
          this.OPENURL+"/money/getMessage?sid=" +
          that.myMessage.sid +
          "&siteid=" +
          that.myMessage.siteidp,
        data: {},
        withCredentials: true
      }).then(response => {
        if (response.error_code === "SUCCESS") {
          that.myBeanMessage = response.result;
          that.myMessage.glod_coin = response.result.bean;
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    // 币换豆
    exchangeBean(type) {
      let that = this;
      // let sid = that.myMessage.sid
      let bean = that.exchangeMessage.bean;
      let coin = that.myBeanMessage.glod_coin;
      // if (bean * 10000 < coin) {
      //   bean = bean * 10000;
      // }
      if (type === 1) {
        bean = coin;
      }
      console.log(bean, "22222");
      axios({
        method: "post",
        url: this.OPENURL+"/money/exchangeBean",
        data: {
          sid: that.myMessage.sid,
          bean: bean,
          siteid: that.myMessage.siteidp
        },
        withCredentials: true
      }).then(response => {
        if (response.error_code === "SUCCESS") {
          // that.myBeanMessage.glod_coin = response.result.coin;
          // that.myBeanMessage.bean = that.myBeanMessage.bean + bean;
          that.getMessage();
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    // 豆换币
    exchangeCoin(type) {
      let that = this;
      // let sid = that.myMessage.sid
      let bean = that.myBeanMessage.bean;
      let coin = that.exchangeMessage.glod_coin;
      var isok = false;
      this.bankerList.forEach(value => {
        if (that.myMessage.sid == value.sid) {
          isok = true;
        }
      });
      if (isok) {
        return this.showTextTips("请下庄后再试");
      }

      // if (coin * 10000 < bean) {
      //   coin = coin * 10000;
      // }
      if (type === 1) {
        coin = bean;
      }
      console.log("coin:", coin);
      axios({
        method: "post",
        url: this.OPENURL+"/money/exchangeCoin",
        data: {
          sid: that.myMessage.sid,
          coin: coin,
          siteid: that.myMessage.siteidp
        },
        withCredentials: true
      }).then(response => {
        console.log(response);
        if (response.error_code === "SUCCESS") {
          // that.myBeanMessage.bean = response.result.bean
          // that.myBeanMessage.glod_coin = that.myBeanMessage.glod_coin + coin
          that.getMessage();
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    // 存豆
    saveBean() {
      let that = this;
      // let sid = that.myMessage.sid
      let bean = that.exchangeMessage.saveBean;
      if (bean > that.myBeanMessage.bean) {
        that.showTextTips("欢乐豆不足！");
        return false;
      }
      var isok = false;
      this.bankerList.forEach(value => {
        if (that.myMessage.sid == value.sid) {
          isok = true;
        }
      });
      if (isok) {
        return this.showTextTips("请下庄后再试");
      }
      bean = parseInt(bean);
      axios({
        method: "post",
        url: this.OPENURL+"/money/saveBean",
        data: {
          sid: that.myMessage.sid,
          bean: bean,
          siteid: that.myMessage.siteidp
        },
        withCredentials: true
      }).then(response => {
        if (response.error_code === "SUCCESS") {
          // that.myBeanMessage.bean = response.result.bean;
          that.getMessage();
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    // 取豆
    getBean() {
      let that = this;
      // let sid = that.myMessage.sid
      let bean = that.exchangeMessage.getBean;
      let password = that.exchangeMessage.password;
      bean = parseInt(bean);
      axios({
        method: "post",
        url: this.OPENURL+"/money/getBean",
        data: {
          sid: that.myMessage.sid,
          bean: bean,
          password: password,
          siteid: that.myMessage.siteidp
        },
        withCredentials: true
      }).then(response => {
        if (response.error_code === "SUCCESS") {
          // that.myBeanMessage.bean = response.result.bean
          // that.myBeanMessage.bankBean = that.myBeanMessage.bankBean - bean
          that.getMessage();
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    showTextTips(text) {
      let that = this;
      that.showTips.status = true;
      that.showTips.text = text;
      setTimeout(function() {
        that.showTips.status = false;
      }, 2000);
    },
    // 获取一个人当天的输赢
    getPerwin(id, maxProfit) {
      // console.log(2222222222)
      let that = this;
      let random = Math.floor(Math.random() * 1000);
      axios({
        method: "get",
        url:
          this.OPENURL+"/money/getPerwin?id=" +
          id +
          "&random=" +
          random +
          "&siteid=" +
          that.myMessage.siteidp,
        data: {},
        withCredentials: true
      }).then(response => {
        if (response.error_code === "SUCCESS") {
          that.userAllProfit = response.result.profit * 1;
          if (response.result.profit < 0) {
            response.result.profit = -response.result.profit;
          }
          if (response.result.profit * 1 > maxProfit * 1) {
            that.islimit = true;
            that.showTips.status = true;
            that.showTips.text = "达到当天输赢上限，禁止进入!";
            // that.$socket.emit('disconnect')
            that.$socket.emit("outLine");
          }
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    // 获取黑名单
    checkBlock(id) {
      let that = this;
      let random = Math.floor(Math.random() * 1000);
      axios({
        method: "get",
        url:
          this.OPENURL+"/money/checkBlock?id=" +
          id +
          "&random=" +
          random +
          "&siteid=" +
          that.myMessage.siteidp,
        data: {},
        withCredentials: true
      }).then(response => {
        console.log("response", response);
        if (response.error_code === "SUCCESS") {
          if (response.result.inBlock) {
            that.islimit = true;
            that.showTips.status = true;
            that.showTips.text = "您已被加入到黑名单中！";
            // that.$socket.emit('disconnect')
            that.$socket.emit("outLine");
          }
        } else {
          that.showTextTips(response.reason);
        }
      });
    },
    // 获取开奖码的历史记录
    getHistory(direction) {
      let that = this;
      if (direction === 1) {
        that.direction.pageLeft = true;
        that.hisPage++;
        console.log("that.historyList.length:", that.historyList.length);
        console.log("that.historyList+++:", that.historyList);
        if (that.hisPage * 11 >= this.historyList.length + 11) {
          that.hisPage--;
          return;
        } else {
          //有多少截多少
          that.chargeRecord = that.historyList
            .slice((that.hisPage - 1) * 11, that.hisPage * 11)
            .sort(function(a, b) {
              return a.gameNum - b.gameNum;
            });
          return;
        }
        // if(that.hisPage * 11>=this.historyList.length){
        //     //大于，截取最后11位
        //     console.log('大于，截取最后11位',that.chargeRecord)
        //     that.chargeRecord = that.historyList.slice(-11).sort(function(a, b) {
        //         return a.gameNum - b.gameNum;
        //     });
        // }else{
        //     //小于，则截取对应的
        //     that.chargeRecord = that.historyList.slice((that.hisPage-1)*11+1,that.hisPage*11+1).sort(function(a, b) {
        //   return a.gameNum - b.gameNum;
        //     });
        // }
      } else {
        that.direction.pageRight = true;
        if (that.hisPage > 1) {
          that.hisPage--;
          //截取对应的
          if (that.hisPage == 1) {
            that.chargeRecord = that.historyList
              .slice(0, 11)
              .sort(function(a, b) {
                return a.gameNum - b.gameNum;
              });
          } else {
            that.chargeRecord = that.historyList
              .slice((that.hisPage - 1) * 11, that.hisPage * 11)
              .sort(function(a, b) {
                return a.gameNum - b.gameNum;
              });
          }
        }
      }
      // console.log(that.hisPage)
      let page = that.hisPage;
      //   that.$socket.emit("getHistory", { page });
    },
    torecharge() {
      // let sid = this.myMessage.sid
      var userid = this.myMessage.id;
      // var openurl ='http://pay.gzhsrj.com/pay/alipay?userid=' + userid
      // alert('充值')
      window.open(
        "http://pay.gzhsrj.com/pay/alipay?userid=" +
          userid +
          "&siteid=" +
          that.myMessage.siteidp
      );
      // var aa=window.open();
      //  window.location.href =openurl
      // setTimeout(function(){

      // aa.location=openurl;

      // }, 4000);
    }
  },
  components: {
    Group,
    Cell,
    Popup,
    XInput
  }
};
</script>
<style type="text/css">
.box_top {
  width: 100%;
  height: 80px;
}
.mbf_top {
  float: left;
  width: 100%;
  height: 25px;
  margin: 0px;
  padding: 4px 0px 0px;
  border-bottom: 1px solid rgb(255, 180, 99);
}
.mbf_top ul li {
  float: left;
  width: 100px;
  height: 25px;
  margin: 0px 1px 0px 0px;
  padding: 0px;
}
.mbf_top li {
  display: list-item;
  text-align: -webkit-match-parent;
}
.mbf_top ul li h2 {
  float: left;
  font-family: 宋体;
  font-size: 12px;
  color: rgb(255, 180, 99);
  font-weight: normal;
  width: 100%;
  text-align: center;
  margin: 0px;
  padding: 0px;
}
.mbf_top ul li h2 {
  float: left;
  width: 100px;
  height: 25px;
  color: rgb(255, 180, 99);
  line-height: 25px;
  padding: 0px;
  cursor: pointer;
}
.mbf_top ul li:hover h2 {
  color: rgb(255, 255, 255);
  background: rgb(255, 180, 99);
}
.mbf_top ul li.on h2 {
  color: rgb(255, 255, 255);
  background: rgb(255, 180, 99);
}
.clear {
  clear: both;
}
a {
  color: #fff;
  text-decoration: none;
}
.textalign {
  text-align: right;
}
.blank5 {
  height: 5px;
}
.blank10 {
  height: 10px;
}
.blank20 {
  height: 20px;
}
h1,
h2,
h3,
h4,
h5 {
  margin: 0px;
  padding: 0px;
}
.yellow {
  color: #ff6600;
}
.yellow a {
  color: #ff6600;
}
.yellow a:hover {
  color: #ffc446;
}
.white {
  color: #ffffff;
}
.red {
  color: #ff0000;
}
.green {
  color: #009900;
}
.blue {
  color: #0000cc;
}
a.red {
  color: #ff0000;
  font-size: 14px;
  font-weight: bold;
  font-family: "宋体";
}
a.red:hover {
  color: #ff0000;
  text-decoration: underline;
  font-size: 14px;
  font-weight: bold;
  font-family: "宋体";
}
a.white {
  color: #ffffff;
}
a.white:hover {
  color: #ffffff;
  text-decoration: underline;
}
.black {
  color: #000000;
}
a.black {
  color: #525050;
}
a.black:hover {
  color: #525050;
  text-decoration: underline;
}
.input01 {
  background: #f8f8f8;
  border: 1px solid #e2e2e2;
}
.txt_white {
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  font-family: "宋体";
}
.txt_red {
  color: #ff0000;
  font-size: 14px;
  font-weight: bold;
  font-family: "宋体";
  line-height: 20px;
}
.txt_black {
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  font-family: "宋体";
  line-height: 20px;
}

/*DIV*/
.main_bankframe {
  margin: 0;
  padding: 0;
}
.main_bankframe .mbf_bankinfo {
  margin: 0;
  padding: 0;
}
.main_bankframe .mbf_bankinfo ul {
  margin: 0;
  padding: 0;
}
.main_bankframe .mbf_bankinfo ul li {
  float: left;
  margin: 0;
  padding: 0;
  width: 340px;
  height: 40px;
  border-bottom: 1px #e0e0e0 dashed;
}
.main_bankframe .mbf_bankinfo ul li h2 {
  float: left;
  margin: 0;
  padding: 12px 10px 0 0;
  font-family: "宋体";
  font-size: 12px;
  color: #000;
  font-weight: normal;
  width: 80px;
  text-align: right;
}
.main_bankframe .mbf_bankinfo ul li h3 {
  float: left;
  margin: 0;
  padding: 10px 10px 0 0;
  font-family: "宋体";
  font-size: 14px;
  color: #ff583c;
  font-weight: bold;
  width: 150px;
  text-align: left;
}

.btn_charge {
  float: left;
  margin: 6px 0 0 0;
  padding: 5px 0 0 0;
  width: 70px;
  height: 20px;
  background: #ffa13c;
  font-family: "宋体";
  font-size: 12px;
  color: #fff;
  text-align: center;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: normal;
}

.main_bankframe .mbf_banks {
  margin: 0;
  padding: 0 0 0 0;
}
.main_bankframe .mbf_banks h2 {
  margin: 0;
  padding: 0 10px 0 0;
  font-family: "宋体";
  font-size: 12px;
  color: #2d2d2d;
  text-align: right;
  width: 140px;
  font-weight: normal;
}
.main_bankframe .mbf_banks h2 span {
  color: #ff0000;
}
.main_bankframe .mbf_banks h3 {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
  font-size: 12px;
  color: #c2c2c2;
  text-align: left;
  width: 100%;
  font-weight: normal;
}
.main_bankframe .mbf_banks h4 {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
  font-size: 12px;
  color: #c2c2c2;
  text-align: center;
  width: 100%;
  font-weight: normal;
}

.regtable tr {
  height: 37px;
}
.regtable2 tr {
  height: 55px;
} /*4line*/
.td_w1 {
  width: 140px;
}
.td_w2 {
  width: 100px;
}
.td_w3 {
  width: 20px;
}
.td_input {
  width: 138px;
  height: 28px;
  border: 1px #e3e4e8 solid;
  border-radius: 5px;
  margin: 0;
  padding: 0 5px;
  font-family: "微软雅黑";
  font-size: 16px;
  color: #000;
  font-weight: normal;
}
.td_input_hover {
  width: 138px;
  height: 28px;
  border: 1px #ffa13c solid;
  border-radius: 5px;
  margin: 0;
  padding: 0 5px;
  font-family: "微软雅黑";
  font-size: 16px;
  color: #000;
  font-weight: normal;
}
.check_w {
  color: #ff5656;
}
.check_r {
  color: #019936;
}

.main_bankframe .mbf_barea {
  float: left;
  margin: 0;
  padding: 0;
  width: 340px;
}

.input_gicheck {
  float: left;
  margin: 6px 5px 0 0;
  padding: 0;
}
.main_bankframe .mbf_barea .submitnow {
  float: left;
  margin: 0;
  padding: 0 0 0 90px;
  width: 200px;
  height: 35px;
}
.btn_submit {
  float: left;
  margin: 0;
  padding: 0;
  width: 90px;
  height: 35px;
  background: #ffa13c;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #fff;
  text-align: center;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: normal;
}
.main_bankframe .mbf_barea .submitres {
  float: left;
  margin: 0;
  padding: 0 7px;
  width: 400px;
  height: 30px;
}
.main_bankframe .mbf_barea .submitres h2 {
  float: left;
  margin: 0;
  padding: 8px 0 0 90px;
  font-family: "微软雅黑";
  font-size: 12px;
  font-weight: lighter;
  color: #000;
  font-weight: normal;
  text-align: left;
}
.main_regframe .mrf_regok {
  float: left;
  margin: 0;
  padding: 0 57px;
  width: 380px;
  height: 350px;
}
.main_regframe .mrf_regok h2 {
  float: left;
  margin: 0;
  padding: 40px 0 0 0;
  font-family: "微软雅黑";
  font-size: 24px;
  color: #ffa13c;
  text-align: center;
  width: 100%;
  font-weight: normal;
}
.main_regframe .mrf_regok h3 {
  float: left;
  margin: 0;
  padding: 25px 0;
  font-family: "微软雅黑";
  font-size: 14px;
  color: #2d2d2d;
  text-align: center;
  width: 100%;
  font-weight: normal;
}
.main_regframe .mrf_regok .rinfo {
  float: left;
  margin: 0;
  padding: 20px;
  width: 340px;
  height: 80px;
  border: 1px #ffa13c dashed;
  border-radius: 5px;
  text-align: center;
}
.main_regframe .mrf_regok h4 {
  margin: 0 auto;
  padding: 0;
  font-family: "微软雅黑";
  font-size: 12px;
  color: #2d2d2d;
  text-align: left;
  font-weight: normal;
}
.main_regframe .mrf_regok h4 span {
  color: #ffa13c;
  font-size: 30px;
}
.main_regframe .mrf_regok h5 {
  float: left;
  margin: 0;
  padding: 20px 0 0 0;
  font-family: "微软雅黑";
  font-size: 22px;
  color: #ffa13c;
  text-align: center;
  width: 100%;
  font-weight: normal;
}
.qr {
  float: left;
  width: 100px;
  height: 80px;
}
.main-margin-left {
  margin-left: 110px;
}
#popbox {
  margin-left: 10px;
  font-size: 16px;
}
#popbox .rule {
  font-size: 16px;
  line-height: 1.4;
}
</style>
<style type="text/css" scoped>
.footer {
  width: 100%;
  height: 143px;
  background: url(/static/img/footer.png) no-repeat -40px bottom;
  position: relative;
}
.warning {
  width: 380px;
  height: 100px;
  position: absolute;
  right: 0;
  top: 0;
  background: url(/static/img/warning.png) no-repeat;
}
.backBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 30;
}

.loadPage {
  width: 100%;
  height: 100%;
  background: url(/static/img/loadBack.png) no-repeat 0 0;
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
}
.processBox {
  width: 537px;
  height: 31px;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-left: -260px;
  background: url(/static/img/process1.png) no-repeat 0 0;
  background-size: 100%;
}
.process {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  background: url(/static/img/process2.png) no-repeat 0 0;
  overflow: hidden;
}
.process2 {
  animation: processLine 1.5s linear alternate;
}
.process3Box {
  width: 99%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0.5%;
  overflow: hidden;
  opacity: 0.7;
  border-radius: 10px;
}
.process3 {
  width: 200%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: url(/static/img/process3.png) no-repeat 0 13px;
  overflow: hidden;
  opacity: 0.7;
  -webkit-animation: showProcess 2s linear infinite;
  -o-animation: showProcess 2s linear infinite;
  animation: showProcess 2s linear infinite;
  background-size: 100%;
}
.loadPageText {
  position: absolute;
  top: 45%;
  left: 50%;
  margin-left: -150px;
  width: 300px;
}
.loadPageText .loadTextTitle {
  font-size: 26px;
  color: #339999;
}
.loadPageText .loadNum {
  font-size: 30px;
  color: #336600;
  font-weight: 500;
  position: absolute;
  top: -2px;
  left: 125px;
}
/*.textScroll {
        
    }*/
@keyframes showProcess {
  from {
    margin-left: 0px;
  }
  to {
    margin-left: -520px;
  }
}
@-webkit-keyframes showProcess {
  from {
    margin-left: 0px;
  }
  to {
    margin-left: -520px;
  }
}
@keyframes processLine {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
<style type="text/css" scoped>
.pageUp {
  background: url(/static/img/operation.png) no-repeat top;
}
.pageUpClick {
  background: url(/static/img/left.png) no-repeat 0 0;
  background-size: 100%;
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  -o-transform: rotate(90deg); /* Opera */
  -moz-transform: rotate(90deg); /* Firefox */
}
.pageDown {
  background: url(/static/img/operation.png) no-repeat bottom;
  cursor: pointer;
}
.pageDownClick {
  background: url(/static/img/left.png) no-repeat 0 0;
  background-size: 100%;
  transform: rotate(270deg);
  -ms-transform: rotate(270deg); /* IE 9 */
  -webkit-transform: rotate(270deg); /* Safari and Chrome */
  -o-transform: rotate(270deg); /* Opera */
  -moz-transform: rotate(270deg); /* Firefox */
}
.pageLeftBox {
  position: absolute;
  z-index: 1;
  width: 32px;
  height: 32px;
  left: 1px;
  cursor: pointer;
}
.pageRightBox {
  position: absolute;
  z-index: 1;
  width: 32px;
  height: 32px;
  right: 1px;
  cursor: pointer;
}
.pageLeftBox > span.pageLeftClick,
.pageRightBox > span.pageRightClick {
  width: 100%;
  height: 100%;
  display: block;
}
.pageLeft {
}
.pageLeftClick {
  background: url(/static/img/left.png) no-repeat 0px 0;
  background-size: 100%;
}
.pageRight {
  background: url(/static/img/operation.png) no-repeat right;
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
  -o-transform: rotate(90deg); /* Opera */
  -moz-transform: rotate(90deg); /* Firefox */
}
.pageRightClick {
  background: url(/static/img/left.png) no-repeat 0 0;
  background-size: 100%;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -webkit-transform: rotate(180deg); /* Safari and Chrome */
  -o-transform: rotate(180deg); /* Opera */
  -moz-transform: rotate(180deg); /* Firefox */
}
.codeMargin {
  margin-top: 4px;
}
</style>
<style type="text/css" scoped>
.main-bottom {
  width: 100%;
  height: 95px;
  margin-top: 5px;
  background-size: #aaa;
}
.myMessage {
  width: 206px;
  height: 82px;
  background: url(/static/img/myMessage.png) no-repeat;
  background-size: 100%;
  margin-top: 4px;
  color: #f4f401;
  box-sizing: border-box;
  padding-top: 12px;
  padding-left: 32px;
  float: left;
}
.betNumber {
  width: 505px;
  height: 95px;
  float: right;
  margin-right: 10px;
  position: relative;
}
.noteCode {
  width: 100%;
  height: 63px;
  box-sizing: border-box;
  padding: 2px 0 2px;
}
.noteCode ul li {
  float: left;
  width: 55px;
  height: 55px;
  margin-right: 18px;
  position: relative;
  cursor: pointer;
}
.noteCode ul li > img {
  width: 55px;
  height: 55px;
  opacity: 1;
}
/*.noteCode ul li:hover img {
      opacity: 1;
    }*/
.imgHover {
  width: 100%;
  height: 100%;
  background: rgba(200, 200, 200, 0.4);
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.noteCode ul li:hover .imgHover {
  display: block;
}
.noteCode .betAgain {
  position: absolute;
  width: 68px;
  height: 52px;
  top: 4px;
  right: 6px;
  cursor: pointer;
}
.noteCode .betAgain img {
  width: 100%;
  height: 100%;
}
.hisBox {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  padding: 0 34px;
  overflow: hidden;
}
.historicalRecords {
  height: 32px;
  background: url(/static/img/history.png) no-repeat 0px -1px;
  position: absolute;
  bottom: 3px;
  width: 100%;
  overflow: hidden;
}
.historicalRecords ul {
  width: 100%;
  overflow: hidden;
  height: 32px;
}
.historicalRecords ul li {
  text-align: center;
  float: left;
  height: 32px;
  width: 39.7px;
  float: left;
  text-align: center;
  position: relative;
}
.historicalRecords img {
  width: 16px;
  margin-top: 8px;
}
.codeNumber {
  width: 140%;
  position: absolute;
  top: 50%;
  left: -20%;
  margin-top: -8px;
  text-align: center;
}
.codeNumber img {
  /*width: 12px;*/
  height: 16px;
}
/* .imgArea {
       position: absolute;
       top: 0px;
       left: 0px;
       width: 100%;
       height: 100%;
     }*/
.imgArea > .mouseImgBox {
  position: absolute;
  z-index: 30;
  margin-left: -20px;
  margin-top: -20px;
  width: 40px;
  height: 40px;
}
.imgArea > .mouseImgBox > img {
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  border: 0;
}
.imgArea .mouseImgNumber {
  width: 160%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: -30%;
  height: 12px;
  margin-top: -8px;
}
.imgArea .mouseImgNumber img {
  height: 12px;
  width: ;
}
</style>
<style type="text/css" scoped>
.Box {
  /*max-width:1100px;*/
  height: 100%;
  overflow-x: auto;
}
/*抽奖部分*/
.container {
  width: 748px;
  height: 427px;
  position: relative;
}
.bettingBox {
  width: 580px;
  height: 35px;
  position: absolute;
  top: 60px;
  left: 87px;
  padding: 0 1px;
  box-sizing: border-box;
}
.bettingTop {
  color: #45fe00;
  text-align: center;
  width: 145px;
  height: 30px;
  position: absolute;
  left: 35%;
  line-height: 20px;
}
.bettingTop .timeTitle {
  margin-right: 4px;
}

.bettingBox .bettingMain ul li.transformWin {
  -webkit-animation: transformWin 0.5s infinite;
  -o-animation: transformWin 0.5s infinite;
  animation: transformWin 0.5s infinite;
  z-index: 20;
  border: 1px solid #fc0;
}
@keyframes transformWin {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes transformWin {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
.bettingTop span {
  font-size: 18px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
}
.bettingTop .countDown {
  display: inline-block;
  width: 13px;
  height: 24px;
  color: transparent;
  background-size: 100%;
}
.bettingTop .countDown1 {
}
.bettingMain {
  position: absolute;
  top: 40px;
  left: 0px;
  cursor: pointer;
}
.bettingMain ul {
  margin-left: 0px;
  padding: 2px;
}
.bettingMain li {
  width: 141px;
  height: 138px;
  float: left;
  background: url(/static/img/bet_bc2.jpg) no-repeat center;
  background-size: 100%;
  margin: 1px 1px 1px 1px;
  position: relative;
  border: 1px solid transparent;
}
/*.bettingMain li:nth-child(4n + 1) {
      margin-left: 0;
    }*/
.bettingMain li .betCodeBox {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bettingMain li .betCodeBox img {
  width: 55px;
  height: 55px;
}

.bettingMain .betMainBck {
  width: 100%;
  height: 100%;
  position: absolute;
  left: -2px;
  top: -2px;
  border: 2px solid transparent;
  border-radius: 5px;
  box-sizing: content-box;
  z-index: 30;
}
.bettingMain .betMainBck:hover {
  border: 2px solid #e0ce0b;
}
/* .bettingMain li:hover{
       border: 2px solid #e0ce0b;
     }*/
.rateBox {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.6;
}
.bettingMain .numberBox {
  position: absolute;
  top: 40px;
  width: 100%;
  z-index: 20;
}
.bettingMain .numberBox > div {
  text-align: center;
}
.bettingMain .numberBox > div img {
  height: 18px;
}
.bettingMain .myNumberBox {
  position: absolute;
  top: 70px;
  width: 100%;
  z-index: 10;
  color: #fff;
  text-align: center;
  font-size: 24px;
}
.bettingMain .myNumberBox ul.myNumberList {
  width: auto;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
.bettingMain .myNumberBox .myNumberList span {
  display: inline-block;
  width: 15px;
  height: 18px;
  margin-top: 2px;
}
.bettingMain .myNumberBox > div {
  font-size: 16px;
  text-align: center;
}
/* .bettingMain li img {
       height: 40px;
     }*/
.wTop ul,
.wBottom ul {
  display: flex;
}
.winningBox ul li {
  width: 80px;
  height: 44px;
  background: url(/static/img/winBc1.png) no-repeat;
  background-size: 100%;
  flex: 1;
  text-align: center;
  position: relative;
}
.winningBox ul li img {
  height: 40px;
  margin-top: 1px;
}
.winningBox ul li > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.winningBox ul li .img1 {
  background: url(/static/img/imgList.png) no-repeat -2px -3px;
}
.winningBox ul li .img2 {
  background: url(/static/img/imgList.png) no-repeat -83px -2px;
}
.winningBox ul li .img3 {
  background: url(/static/img/imgList.png) no-repeat -163px -3px;
}
.winningBox ul li .img4 {
  background: url(/static/img/imgList.png) no-repeat -243px -2px;
}
.winningBox ul li .img5 {
  background: url(/static/img/imgList.png) no-repeat -320px -2px;
}
.winningBox ul li .img6 {
  background: url(/static/img/imgList.png) no-repeat -400px -2px;
}
.winningBox ul li .img7 {
  background: url(/static/img/imgList.png) no-repeat -480px -3px;
}
.winningBox ul li .img8 {
  background: url(/static/img/imgList.png) no-repeat -560px -3px;
}
.winningBox ul li .imgChoose {
  width: 114%;
  height: 114%;
  left: -7%;
  z-index: 10;
  top: -7%;
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

/*.winningBox ul li .imgChoose1 {
      background: url(/static/img/imgChoose.png) no-repeat 4px 0px;
      transform: scale(1.2);
      background-size: 840%;
      width: 100%;
    }
    .winningBox ul li .imgChoose2 {
      background: url(/static/img/imgChoose.png) no-repeat -81px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }
    .winningBox ul li .imgChoose3 {
      background: url(/static/img/imgChoose.png) no-repeat -165px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }
    .winningBox ul li .imgChoose4 {
      background: url(/static/img/imgChoose.png) no-repeat -249px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }
    .winningBox ul li .imgChoose5 {
      background: url(/static/img/imgChoose.png) no-repeat -335px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }
    .winningBox ul li .imgChoose6 {
      background: url(/static/img/imgChoose.png) no-repeat -419px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }
    .winningBox ul li .imgChoose7 {
      background: url(/static/img/imgChoose.png) no-repeat -504px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }
    .winningBox ul li .imgChoose8 {
      background: url(/static/img/imgChoose.png) no-repeat -589px 0px;
      transform: scale(1.2);
      background-size: 840%;
    }*/
.wTop {
  width: 572px;
  height: 44px;
  position: absolute;
  left: 88px;
  top: 8px;
}
.wTop li,
.wBottom li {
  margin-left: 2px;
}
.wTop li:nth-child(2n + 1),
.wBottom li:nth-child(2n + 1) {
  background: url(/static/img/winBc2.png) no-repeat center;
  background-size: 100%;
  margin-top: -1px;
}
.wTop li:nth-child(2n + 1) {
  /*margin-top: -1px;*/
}
.wTop li:nth-child(2n + 1) .imgChoose,
.wBottom li:nth-child(2n + 1) .imgChoose {
}
.wLeft li:nth-child(2n),
.wRight li:nth-child(2n) {
  background: url(/static/img/winBc2.png) no-repeat center;
  background-size: 100%;
}
.wBottom {
  width: 572px;
  height: 44px;
  position: absolute;
  left: 88px;
  bottom: -2px;
}
.wLeft {
  width: 80px;
  height: 420px;
  position: absolute;
  left: 7px;
  top: 8px;
  /*overflow: hidden;*/
  display: block;
}
.wRight {
  width: 80px;
  height: 420px;
  position: absolute;
  right: 5px;
  top: 8px;
  /*overflow: hidden;*/
  display: block;
}
.winningBox .wLeft li,
.winningBox .wRight li {
  margin-bottom: 3px;
  height: 44px;
}
</style>
<style type="text/css" scoped>
* {
  padding: 0;
  margin: 0;
  font-size: 12px;
  font-family: "微软雅黑";
}
li {
  list-style: none;
}
.chzbBox {
  width: 1012px;
  height: 756px;
  padding: 23px 0 0 5px;
  box-sizing: border-box;
  background: url(/static/img/footer.png) no-repeat -40px bottom;
  position: relative;
  /*overflow-x: auto;*/
}
.chzbBox1 {
  width: 1012px;
  height: 756px;
  padding: 23px 0 0 5px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  /*overflow-x: auto;*/
}
.limitPage {
  width: 1012px;
  height: 756px;
  padding: 23px 0 0 5px;
  box-sizing: border-box;
  background: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  /*overflow-x: auto;*/
}
.main-box {
  width: 1007px;
  height: 591px;
  background: #000;
  position: relative;
}
.main-box-left {
  width: 74.5%;
  height: 100%;
  float: left;
  background-size: 100%;
  position: relative;
}
.main-box-right {
  width: 25.5%;
  height: 100%;
  float: left;
  background-size: 100%;
  position: relative;
}
.header_box {
  width: 100%;
  height: 65px;
  position: relative;
}
.left {
  float: left;
}
.right {
  float: right;
}
.clear {
  clear: both;
}
.shopownerMessage {
  width: 154px;
  height: 55px;
  position: absolute;
  left: 5px;
  top: 5px;
  padding-left: 5px;
  padding-top: 4px;
  color: #c1c1c1;
}
.shopownerMessage > div {
  line-height: 1.4;
}
.headMessage {
  position: absolute;
  left: 165px;
  width: 310px;
  overflow: hidden;
}
.tipsBox {
  width: 200px;
  color: #f5f503;
  font-weight: 800;
  padding-left: 5px;
  box-sizing: border-box;
}
.tips {
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  font-weight: 100;
  color: #e7e14e;
}
.textScroll {
  -webkit-animation: showTextTips 15s linear infinite;
  -o-animation: showTextTips 15s linear infinite;
  animation: showTextTips 15s linear infinite;
}
@keyframes showTextTips {
  from {
    margin-left: 40px;
  }
  to {
    margin-left: -450px;
  }
}
@-webkit-keyframes showTextTips {
  from {
    margin-left: 40px;
  }
  to {
    margin-left: -450px;
  }
}
.gamesNumberBox {
  width: 100%;
  overflow: hidden;
  font-weight: 100;
  font-size: 14px;
}
.voiceBox {
  overflow: hidden;
  display: inline-block;
  float: left;
  z-index: 1;
  position: relative;
}
.voiceBox > div {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 10;
  cursor: pointer;
}
.voice {
  width: 24px;
  height: 24px;
  float: left;
  margin-top: 2px;
}
.voice img {
  width: 25px;
  height: 25px;
}
.gamesNumber {
  float: left;
  width: 120px;
  display: flex;
  height: 32px;
  line-height: 32px;
  margin-left: 10px;
  font-size: 14px;
}
.gamesNumber > span {
  text-align: center;
  flex: 1;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  font-weight: bold;
}
.AutoPat {
  width: 100px;
  padding: 5px 0;
  margin-right: 5px;
  box-sizing: border-box;
  font-size: 10px;
  color: #999;
  position: relative;
}
.AutoPat p {
  line-height: 1.2;
}
.AutoPat .pat {
  position: absolute;
  top: 35px;
  left: 0;
  line-height: 2.6;
  width: 100%;
  height: 30px;
  color: #ff0;
  cursor: pointer;
}
.AutoPat .pat:hover .automaticTips {
  display: block;
}
.automaticTips {
  position: absolute;
  top: -24px;
  left: -156px;
  width: 240px;
  color: #666;
  height: 35px;
  display: none;
}
.automaticTips .tipsText {
  text-align: center;
  line-height: 26px;
}
.AutoPat .pat .input {
  position: absolute;
  top: 4px;
  left: 15px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.AutoPat .pat .input img {
  width: 100%;
  height: 100%;
}
/*.AutoPat input:checked{
      background-color: #f4a100;
    }*/
.AutoPat .pat .patText {
  position: absolute;
  top: 0px;
  left: 35px;
}
.beShopownerBox {
  position: absolute;
  right: 3px;
  top: 5px;
  width: 280px;
  height: 55px;
  padding: 3px 5px;
}
.beShopownerBox .beShopowner {
  float: left;
  cursor: pointer;
}
.lineUp {
  width: 170px;
  float: left;
  margin-top: -1px;
  max-height: 51px;
  overflow: hidden;
}
.lineUp ul {
  margin-top: 0px;
}
.lineUp li {
  list-style: none;
  color: #b8b8b8;
  line-height: 17px;
  height: 17px;
  font-size: 14px;
  overflow: hidden;
}
.operationBox {
  width: 24px;
  height: 48px;
  float: right;
  position: absolute;
  top: 3px;
  right: 5px;
}
.operationBox > span {
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  cursor: pointer;
}
.challenger {
  width: 150px;
  height: 60px;
  float: right;
  padding-top: 13px;
}
.challenger > div {
  line-height: 19px;
  height: 19px;
  color: #b8b8b8;
}
.rankingBox {
  position: absolute;
  top: 134px;
  width: 240px;
  height: 310px;
  left: 5px;
}
.rankingBox table {
  width: 100%;
  height: 100%;
  color: #b3b3b3;
}
.rankingBox table thead {
  color: #b8b8b8;
}
.rankingBox tr {
  height: 26px;
  line-height: 26px;
}
.rankingBox tr td {
  text-align: center;
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
.jiaP {
  position: relative;
}
.jiaP img {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.08rem;
}
.recharge {
  position: absolute;
  bottom: 64px;
  right: 38px;
  cursor: pointer;
}
.helpTips {
  position: absolute;
  bottom: 24px;
  cursor: pointer;
  right: 38px;
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.awardResults {
  width: 385px;
  height: 168px;
  position: absolute;
  top: 221px;
  left: 182px;
  z-index: 100;
  border: 2px solid #ccc;
  background: rgba(1, 1, 1, 0.7);
  color: #fff;
}
.awardResults div {
  font-size: 16px;
}
.awardResultsHeader > div {
  font-size: 20px;
  color: #66fe00;
}
.awardResults ul {
  width: 100%;
}
.awardResults ul li {
  width: 100%;
  float: left;
  display: flex;
  height: 56px;
  border-bottom: 1px solid #ccc;
}
.awardResults ul li:last-child {
  border-bottom: 0;
}
.awardResults ul li > div {
  flex: 1;
  border-right: 1px solid #ccc;
  text-align: center;
  height: 54px;
  line-height: 56px;
}
.showTips {
  width: 90%;
  text-align: center;
  margin-left: 5%;
  font-size: 32px;
  color: #f5f503;
  position: absolute;
  top: 277px;
  left: 0;
  z-index: 40;
}
.showTipsEffect {
  -webkit-animation: showTips 2s infinite;
  -o-animation: showTips 2s infinite;
  animation: showTips 2s infinite;
}
@keyframes showTips {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes showTips {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
