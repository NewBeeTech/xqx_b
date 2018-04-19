<template>
  <div class="wraper">
		<div class="balance">
			<p>账户余额</p>
			<p>{{info.avail_money}}</p>
		</div>
		<div class="dj">冻结金额￥<span>{{info.blocked_money}}</span> <mark @click="show"><img class="icon1" src="/static/imgs/wenhao.png"></mark></div>
		<div class="main">
			<div @click="navGo('/pages/spec-first/main')">充值</div>
			<div @click="download()">提现</div>
		</div>
		<div class="footer" @click="navGo('/pages/detail-list/main')">
			<div><p><img src="/static/imgs/yuefenpaizi.png"></p><span class="minxi">查看明细</span></div>
			<div><img src="/static/imgs/right.png"></div>
		</div>
	</div>
</template>

<script>

  import {wxRequest} from '@/api'
  import {toDoubleNum} from "../../api";

  export default {
    data() {
      return {
        info: {}
      }
    },
    created() {

    },
    onLoad(){
      this.getInfo();
    },
  methods: {

    getInfo: function () {
      var self = this;
      wxRequest('getShopInfo')
        .then(res => {
          console.log(res);
          self.info = res.value;
          self.info.blocked_money = toDoubleNum(self.info.blocked_money);
          self.info.avail_money = toDoubleNum(self.info.avail_money);
        })
        .catch(err => {
          console.log(err)
        })
    },
    show () {
      wx.showModal({
        showCancel: false,
        content: '冻结金额是指已经创建生效但未被领取的红包总额，若红包到期未被领取，则将退回您的账户余额',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    download () {
      wx.showModal({
        cancelText: '知道了',
        confirmText: '去下载',
        content: '请下载“小确幸商家版APP”进行提现哦',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.wraper{
  background: #fff;
  text-align: center;
  margin:0 25px;
}
img{
  width: 100%;
  height: 100%;
}
.icon1 {
  width: 100%;
  height: 100%;
  position: relative;
  top: 3px;
  left: 5px
}
.balance{
  margin:auto;
  width: 127px;
  height: 127px;
  margin-top: 44px;
  border-radius: 127px;
  background-color: #fea400;
}
.minxi {
  position: relative;
  top: -4px;
  right: -3px
}
.balance p:nth-child(1){
  color: #fff;
  padding-top: 35px;
  font-size:13px;
  text-align: center;
}
.balance p:nth-child(2){
  color: #fff;
  padding-top: 10px;
  font-size:20px;
  font-weight: bold;
  text-align: center;
}
.dj{
  margin-top: 56px;
  text-align: center;
  font-size:14.33px;
  line-height: 20px;
}
.dj mark{
  width: 18px;
  height:18px;
  display:inline-block;
}
.main{
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
}
.main div{
  width: 47%;
  height: 45px;
  text-align: center;
  line-height: 45px;
  border-radius: 5px;
}
.main div:nth-child(1){
  color:#fff;
  background-color: #fea400;
  border:1px solid #ff9400;
}
.main div:nth-child(2){
  color:#fea400;
  background-color: #fff;
  border:1px solid #ff9400;
}
.footer{
  width: 100%;
  height: 55px;
  border-top:1px solid #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer div:nth-child(1){
  margin-left: 5%;

}
.footer div:nth-child(1) p {
  display: inline-block;
  height: 25px;
  width: 25px;
  margin-top: 5px;
}
.footer div:nth-child(1) p img{
  width: 100%
}
.footer div:nth-child(1) span:nth-child(2) {
  font-size:15px;

}
.footer div:nth-child(2){
  height: 20px;
  width: 15px;
  margin-right: 5%
}
.footer div:nth-child(2) img{
  display: block;
  width: 100%;
}
</style>
