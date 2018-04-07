<template>
  <div class="container">
    <button class="button" size="default" @click="bindPhone">一键绑定手机号</button>
    <div class="bind-title">手动绑定手机号</div>
    <div class="user-from">
      <div class="text" style="width: 40%">手机号</div>
      <div class="input">
        <input type="text" placeholder="输入手机号" placeholder-style='font-size: 18px'>
      </div>
    </div>
    <div class="user-from sec">
      <div class="input">
        <input type="text" placeholder="输入验证码" placeholder-style='font-size: 18px'>
      </div>
      <div class="text">
        <div class="buttons">
          获取验证码
        </div>
      </div>
    </div>
    <div class="tiaok">
      <div class="button-radio" @click="isYes = !isYes">
        <img src="/static/imgs/tuoy.png" alt="" v-if="!isYes">
        <img src="/static/imgs/isyes.png" alt="" v-else>
      </div>
      <div class="tiaokuan">
        我已阅读并同意《小确幸商户服务条款）
      </div>
    </div>
    <button class="button sub" size="default" @click="submit">确定</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isYes: false
    }
  },
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
