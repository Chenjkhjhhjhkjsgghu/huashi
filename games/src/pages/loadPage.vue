<template>
  <div class="cantainerBox">
    <div class="loadPage">
      <div class="processBox">
        <div class="process">
        </div>
        <div class="process3Box">
          <div class="process3">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
    }
  }
}
</script>

<style>
  .cantainerBox {
    width: 1012px;
    height: 756px;
    position: relative;
  }
  .loadPage {
    width: 100%;
    height: 100%;
    background: url(/static/img/loadBack.png) no-repeat 0 0;
    background-size: 100%;
  }
  .processBox {
    width: 537px;
    height: 31px;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -270px;
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
    animation: processLine 2s linear alternate;
  }
  .process3Box {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
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
    -webkit-animation: showPro 2s linear infinite;
    -o-animation: showPro 2s linear infinite;
    animation: showPro 2s linear infinite;
    background-size: 100%; 
  }
  /*.textScroll {
      
  }*/
  @keyframes showPro {
      from {
          margin-left: 0px
      }
      to {
          margin-left: -520px
      }
  }
  @-webkit-keyframes showPro {
      from {
          margin-left: 0px
      }
      to {
          margin-left: -520px
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