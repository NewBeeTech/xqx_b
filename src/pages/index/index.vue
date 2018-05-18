<template>
  <div class="main">
    <!-- <header>
      <div @click="navGo('/pages/receipt-code/main')">
        <div><img src="/static/imgs/Artboard@2x.png" alt=""></div>
        <div>收款码</div>
      </div>

      <div @click="scanCode">
        <div><img src="/static/imgs/ArtboardCopy7@2x.png" alt=""></div>
        <div>扫一扫</div>
      </div>
      <div @click="navationTo('/pages/user-price/main')">
        <div><img src="/static/imgs/8.png" alt=""></div>
        <div>钱包</div>
      </div>
    </header> -->
    <header>
      <div @click="navGo('/pages/goods-active/main?status=1')">
        <div><img src="/static/imgs/1.png" alt=""></div>
        <div>待发货</div>
      </div>
      <div @click="navGo('/pages/goods-active/main?status=2')">
        <div><img src="/static/imgs/6.png" alt=""></div>
        <div>已发货</div>
      </div>
      <div @click="navGo('/pages/goods-active/main?status=3')">
        <div><img src="/static/imgs/7.png" alt=""></div>
        <div>已完成</div>
      </div>
    </header>
    <header>
      <div @click="navationTo('/pages/groups-list/main')">
        <div><img src="/static/imgs/4.png" alt=""></div>
        <div>拼团</div>
      </div>
      <div @click="navationTo('/pages/discount/main')">
        <div><img src="/static/imgs/2.png" alt=""></div>
        <div>砍价</div>
      </div>
      <div @click="waitMoment()">
        <div><img src="/static/imgs/3.png" alt=""></div>
        <div>秒杀</div>
      </div>
    </header>
    <section>
      <!-- @click="navGo('/pages/transaction-record/main')"-->
      <div class="sec-lin">
        <div class="item">
          <div>{{~~value.realChargeTodaySum/100==value.realChargeTodaySum/100?value.realChargeTodaySum/100:~~(value.realChargeTodaySum*100)/100}}</div>
          <div>今日营收(元)</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>{{~~value.realChargeHistorySum/100==value.realChargeHistorySum/100?value.realChargeHistorySum/100:~~(value.realChargeHistorySum*100)/100}}</div>
          <div>累计营收(元)</div>
        </div>
      </div>
      <!-- @click="navGo('/pages/transaction-record/main')"-->
      <div class="sec-lin">
        <div class="item">
          <div>{{~~value.currencyTodaySum/100==value.currencyTodaySum/100?value.currencyTodaySum/100:~~(value.currencyTodaySum*100)/100}}</div>
          <div>今日返金(元)</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>{{~~value.currencyHistorySum/100==value.currencyHistorySum/100?value.currencyHistorySum/100:~~(value.currencyHistorySum*100)/100}}</div>
          <div>累计返金(元)</div>
        </div>
      </div>
      <!--@click="navGo('/pages/my-client/main')"-->
      <div class="sec-lin" @click="navGo('/pages/my-client/main')">
        <div class="item">
          <div>{{value.personTodaySum==""?0:value.personTodaySum}}</div>
          <div>今日新增客户</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>{{value.personHistorySum==""?0:value.personHistorySum}}</div>
          <div>累计客户</div>
        </div>
      </div>

      <div class="sec-lin" @click="navGo('/pages/my-client/main')">
        <div class="item">
          <div>{{fanvalue.fanTodaySum==""?0:fanvalue.fanTodaySum}}</div>
          <div>今日新增粉丝</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>{{fanvalue.fanHistorySum==""?0:fanvalue.fanHistorySum}}</div>
          <div>累计粉丝</div>
        </div>
      </div>

      <div class="sec-lin">
        <div class="item">
          <div>￥{{getvalue.getTodaySum==""?0:getvalue.getTodaySum}}</div>
          <div>今日推广收益</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>￥{{getvalue.getHistorySum==""?0:getvalue.getHistorySum}}</div>
          <div>累计推广收益</div>
        </div>
      </div>
    </section>

    <section class="jiehoug">
      <!-- <div @click="navationTo('/pages/merchant-edit/main?type=1')">
        <span><img src="/static/imgs/ArtboardCopy9@2x.png" alt=""></span>
        <span>基本信息</span>
      </div>
      <div>
        <span><img src="/static/imgs/ArtboardCopy10@2x.png" alt=""></span>
        <span @click="navGo('/pages/gold-setting/main')">返金中心</span>
      </div> -->
    </section>

    <!--<section class="footer" @click="navGo('/pages/user-price/main')">-->
      <!--<div class="sec-lin">-->
        <!--<div class="item">-->
          <!--<span class="icon"><img src="/static/imgs/ArtboardCopy11@2x.png" alt=""></span>-->
          <!--<span class="text">账户余额</span>-->
        <!--</div>-->
        <!--<div class="item">100</div>-->
      <!--</div>-->
    <!--</section>-->
    <footer>
      <div>您还未进行资质认证，下载小确幸商家版APP完成认证后，可体验更多营销服务哦～</div>
      <div @click="navGo('/pages/download-app/main')">立即下载</div>
    </footer>
    <!-- <button type="warn" open-type="getUserInfo" @getuserinfo="getUserInfoTest">授权</button> -->
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
  </div>
</template>

<script>
  import {wxRequest} from '@/api'

  export default {
    data() {
      return {
        value: {
          realChargeTodaySum: '',
          realChargeHistorySum: '',
          currencyTodaySum: '',
          currencyHistorySum: '',
          personTodaySum: '',
          personHistorySum: ''
        },
        fanvalue:{
          fanTodaySum:'',
          fanHistorySum:''
        },
        getvalue:{
          getTodaySum:'',
          getHistorySum:''
        }
      }
    },
    created() {

      // wxRequest('useAppLoginNameQueryMerchant', {appLoginname:"18612962314"})
      //   .then(res => {
      //     console.log(res);
      //   }).catch(err => {
      //   console.log(err)
      // })

      let that = this;

      let token = wx.getStorageSync('token');
      console.log(".............",token)
      if (!token) {
        // 登录
        wx.login({
          success: function (res) {
            console.log(res.code)
            let code = res.code;
            wx.getUserInfo({
              withCredentials: true,
              success: function (res) {
                console.log(res)
                var config = {
                  code: code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                };
                console.log(config);
                wxRequest('userLogin', config)
                  .then(res => {
                    console.log(res);
                    wx.setStorageSync('token', res.value);
                    if (res.code == 1) {
                      console.log(res.code);
                      that.getHomeMsg();
                      that.getFan();
                      that.getGet();
                    }
                    if (res.code == 4000) {
                      wx.navigateTo({
                        url: '/pages/bind-phone/main'
                      })
                    }
                  }).catch(err => {
                  console.log(err)
                })
              },
              fail: function (err) {
                console.log(err)
                // 	wx.navigateTo({
                //   url: '/pages/bind-phone/main'
                // })
              }
            })

          }
        })
      }
    },
    onShow: function () {

      if (wx.getStorageSync('token')){
        this.getHomeMsg();
        this.getFan();
        this.getGet();
        this.getInfo();
        // this.getUserInfo();
      }

    },
    methods: {
      getUserInfoTest:function(e){
        console.log(e)

      },
      waitMoment: function() {
        wx.showToast({
          icon: 'none',
          title: '敬请期待',
          duration:2000
        })
      },
      getFan:function(){
        var self = this;
        wxRequest('getFan')
          .then(res => {
            console.log(res);
            that.fanvalue=res.value
          })
          .catch(err => {
            console.log(err)
          })
      },
      getGet:function(){
        var self = this;
        wxRequest('getGet')
          .then(res => {
            console.log(res);
            that.getvalue=res.value
          })
          .catch(err => {
            console.log(err)
          })
      },
      getInfo: function () {
        var self = this;
        wxRequest('getShopInfo')
          .then(res => {
            console.log(res);
            // self.name = res.value.name;
            // self.value = res.value;

            wx.setNavigationBarTitle({
              title:res.value.name
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      getUserInfo:function(){
        var phone = wx.getStorageSync('phone');
        if (phone){
          wxRequest("useAppLoginNameQueryMerchant",{appLoginname:phone}).then(function (res) {
            console.log(res);
            wx.setNavigationBarTitle({
              title: res.value.name
            })
          }).catch(function (err) {
            console.log(err);
          })
        }
      },
      scanCode() {
        wx.scanCode({
          success: (res) => {
            console.log(res)
            if (res.errMsg == "scanCode:ok") {

            }
          }
        })
      },
      getHomeMsg() {
        let that = this;
        //		获取首页信息
        wxRequest('homeMsg')
          .then(res => {
            if (res.code == 1) {
              console.log(res);
              if (res.value){
                that.value = res.value
              }
            }
            if (res.code == 4000) {
              wx.navigateTo({
                url: '/pages/bind-phone/main'
              })
            }
            ;

          }).catch(err => {
          console.log(err)
        })
      },
      navationTo(url) {
        wx.navigateTo({
          url: url
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main
    padding 30px 0 120rpx

  header
    width 100%
    background #ffffff
    display flex
    justify-content space-around
    div
      text-align center
      font-size 14px
      color #101010
    div:nth-child(1)
      img
        width 100%
        height 100%
      width 46px
      height 46px
    div:nth-child(2)
      line-height 50px

  section
    .sec-lin
      border-radius 8rpx
      margin 10rpx auto 0
      width 692rpx
      height 138rpx
      /*left 28rpx*/
      background #fff
      text-align center
      box-shadow 0px 0px 3px 0px rgba(217, 217, 217, 1)
      display flex
      justify-content space-between
      align-items center
      .cneter
        width 1px
        height 13px
        background #ccc
      .longh
        height 35px
      .item
        width 49%
        text-align center
        div:nth-child(1)
          font-size 24px
          color #101010
        div:nth-child(2)
          font-size 12px
          color #A3A3A3

  .jiehoug
    width 346px
    margin auto
    margin-top 30px
    display flex
    justify-content space-between
    div
      border-radius 4px
      background #fff
      width 163px
      height 63px
      line-height 20px
      text-align center
      display flex
      align-items center
      box-shadow 0px 0px 3px 0px rgba(217, 217, 217, 1)
    span
      font-size 14px
      color #101010
      line-height 63px
      &:nth-child(1)
        img
          width 100%
          height 100%
          display block
        width 25px
        height 25px
        margin 20px
    .footer
      .sec-lin
        .item
          width 50%
          height 100%
          span
            display inline-block

  .icon
    img
      width 100%
      height 100%
    display inline-block
    position relative
    top 5px
    left -17px
    width 25px
    height 25px

  .text
    top -3px
    position relative
    font-size 14px
    color #101010

  footer
    width 100%
    height 58px
    position fixed
    bottom 0
    background #ffffff
    display flex
    justify-content space-around
    align-items center
    div:nth-child(1)
      width 225px
      height 34px
      font-size 12px
      color #101010
    div:nth-child(2)
      width 80px
      height 30px
      text-align center
      line-height 30px
      background #fd9326
      font-size 14px
      color #fff
      border-radius 4px
</style>
