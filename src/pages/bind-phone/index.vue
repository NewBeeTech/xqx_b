<template>
  <div class="container">
    <button class="button" size="default" @click="bindPhone">一键绑定手机号</button>
    <div class="bind-title">手动绑定手机号</div>
    <div class="user-from">
      <div class="text">手机号</div>
      <div class="input">
        <input type="text" placeholder="输入手机号" placeholder-style='font-size: 15px'>
      </div>
    </div>
    <div class="user-from sec">
      <div class="input">
        <input type="text" placeholder="输入验证码" placeholder-style='font-size: 15px'>
      </div>
      <div class="text">
        <div class="buttons">
          获取验证码
        </div>
      </div>
    </div>
    <div class="button-radio"></div>
    <div class="tiaokuan">
      我已阅读并同意《小确幸商户服务条款）
    </div>
    <button class="button sub" size="default" @click="submit">确定</button>
  </div>
</template>

<script>
export default {
  mounted () {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  methods: {
    bindPhone () {

    },
    submit () {
      wx.navigateTo({
        url: '/pages/merchant-edit/main'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  .button
    &.sub
      margin-top 10px
    width 80%
    background #616161
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
    border-bottom 1px solid #ccc
    align-items center
    &.sec
      border-color #F0F0F2
    .text
      width 25%
      font-size 13px
      text-align center 
    .input 
      flex 1
      font-size 15px
      padding-left 25px
    .buttons 
      width 90px
      height 30px
      background #616161
      line-height 30px
      text-align center 
      color #fff
      border-radius 4px
      position relative
      right 22px
  .button-radio
    width 15px
    height 15px
    border 1px solid #101010
    border-radius 20px
    margin auto
    margin-top 50px
  .tiaokuan
    color #101010
    font-size 12px
    text-align center 
    line-height 17px 
    margin-top 10px
</style>
