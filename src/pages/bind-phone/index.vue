<template>
  <div class="container">
    <!-- <button class="button" size="default"  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键绑定手机号</button> -->

    <div class="bind-title">手动绑定手机号</div>
    <div class="user-from">
      <div class="text" style="width: 40%">手机号</div>
      <div class="input">
        <input type="text" placeholder="输入手机号" placeholder-style='font-size: 18px' v-model="phoneNumber">
      </div>
    </div>
    <div class="user-from sec">
      <div class="input">
        <input type="text" placeholder="输入验证码" placeholder-style='font-size: 18px'>
      </div>
      <div v-if="canGetCode" class="text" @click="getCode">
        <div class="buttons">
          获取验证码
        </div>
      </div>
      <div v-else="time > 0" class="text">
        <div class="buttons" style="color: #999">
          {{time}}秒
        </div>
      </div>
    </div>
    <!-- @click="isYes = !isYes"-->
    <div class="tiaok">
      <div class="button-radio">
        <!--<img src="/static/imgs/tuoy.png" alt="" v-if="!isYes">-->
        <!--v-else-->
        <img src="/static/imgs/isyes.png" alt="" >
      </div>
      <div class="tiaokuan">
        我已阅读并同意《小确幸商户服务条款）
      </div>
    </div>
    <button class="button sub" size="default" @click="submit()">确定</button>
  </div>

</template>

<script>
  import {wxRequest} from '@/api'

  export default {
    data() {
      return {
        canGetCode: true,
        isAgree: false,
        isYes: false,
        phoneNumber: '',
        time:60,
        timer:null,
        verCode:""
      }
    },

    mounted() {

    },

    methods: {

      getPhoneNumber: function (numRes) {
        console.log(numRes);
        var that = this;
        wx.login({
          success: function(res) {
            if (res.code) {
              console.log(res);
              wx.getUserInfo({
                success: function (e) {

                  var config = {
                    code: res.code,
                    encryptedData: numRes.target.encryptedData,
                    iv: numRes.target.iv
                  };

                  wxRequest('decryptPhoneNumber', config)
                    .then(res => {
                      console.log(res);
                      // wx.setStorageSync('token', res.value);
                      wx.setStorageSync('phone', JSON.parse(res.value).phoneNumber);
                      console.log(wx.getStorageSync('phone'))
                      if (res.code == 1) {
                        wx.navigateTo({
                          url: '/pages/merchant-edit/main'
                        })
                      }
                      if (res.code == 4000) {
                        wx.navigateTo({
                          url: '/pages/bind-phone/main'
                        })
                      }
                    }).catch(err => {
                    console.log(err)
                  })
                }
              })

            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      },
      checkPhone: function (phone){

        if (!(/^1[34578]\d{9}$/.test(phone))) {
          return false
        } else {
          return true
        }
      },
      getCode: function () {
        var self = this;
        if (!this.checkPhone(this.phoneNumber)) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none',
            duration: 2000
          })
          return
        }
        self.timer = setInterval(function(){
          self.time = --self.time <= 0 ? 0 : self.time;
          self.isAgree = self.time < -0 ? true : false;
          self.canGetCode = self.time < -0 ? true : false;
          if (self.time <= 0){
            self.canGetCode = true;
            self.isAgree = false;
            self.time = 60;
            clearInterval(self.timer);
          }
        },1000);
        var config = {mark: 5, mobileNo: this.phoneNumber};
        wx.setStorageSync('phone', this.phoneNumber);
        wxRequest('getMessageCode', config)
          .then(res => {
            console.log(res)
            if (res.code == 1){
              if (res.value.verCode) {
                self.verCode = res.value.verCode
              }
            }else {
              wx.showToast({
                title: '获取失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      submit() {
        // if (this.isYes==false){
        //   wx.showToast({
        //     title: "请完整填写信息",
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   return
        // }
        var config = {verCode:this.verCode,mobileNo:this.phoneNumber}
        wxRequest('verificationCode', config)
          .then(res => {
            console.log(res)
            if (res.code == 1){
              wxRequest('useAppLoginNameQueryMerchant', { appLoginname: this.phoneNumber })
                .then(resValue => {
                  console.log(resValue)
                  if (resValue.code == 1){
                    wx.navigateTo({
                      url: '/pages/index/main'
                    })
                  } else if (resValue.code == 4000) { // 跳转到下载app页面
                    wx.navigateTo({
                      url: '/pages/download-app/main'
                    })
                  }else {
                    wx.showToast({
                      title: resValue.errorMsg || '',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            } else if (res.code == 5000) { // 跳转到下载app页面
              wx.navigateTo({
                url: '/pages/download-app/main'
              })
            }else {
              wx.showToast({
                title: res.errorMsg,
                icon: 'none',
                duration: 2000
              })
            }

          })
          .catch(err => {
            console.log(err)
          })

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container
    .button
      &.sub
        background #fea400
        margin-top 10px
      width 92%
      background #1bae23
      color #fff
      margin-top 75px
    .bind-title
      line-height 45px
      text-align center
      font-size 14px
      margin-top 100px
    .user-from
      background #fff
      display flex
      line-height 50px
      height 50px
      width 92%
      margin auto
      border-bottom 1px solid #eee
      align-items center
      .text
        width 30%
        font-size 17px
        text-align left
      .input
        flex 1
        font-size 18px
      .buttons
        width 90px
        height 30px
        line-height 30px
        text-align right
        color #fea400
    .button-radio
      img
        width 100%
        height 100%
        display block
      display inline-block
      width 20px
      height 20px
      border-radius 20px
    .tiaokuan
      display inline-block
      color #101010
      font-size 12px
      text-align center
    .tiaok
      width 66%
      margin auto
      margin-top 40px
      margin-bottom 40px
      display flex
      justify-content space-around
      align-items center
</style>
