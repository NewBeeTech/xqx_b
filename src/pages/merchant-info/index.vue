<template>
  <div>
    <div class="edit">
      <div class="user-from">
        <div class="text">返金设置</div>
        <div class="text-button">
          默认0.1% >
        </div>
      </div>
      <div class="user-from sec">
        <div class="text">客服电话</div>
        <div class="input">
          <input style="margin-right: 15px" type="text" placeholder="请输入客服电话" placeholder-style='font-size: 15px; text-align: right; padding-right: 15px'>
        </div>
      </div>
    </div>
    <div class="tips">商户联系人／联系方式</div>
    <div class="edit">
      <div class="user-from">
        <div class="text">联系人</div>
        <div class="input">
          <input style="margin-right: 15px" type="text" placeholder="请输入联系人姓名" placeholder-style='font-size: 15px; text-align: right; padding-right: 15px'>
        </div>
      </div>
      <div class="user-from sec">
        <div class="text">联系人电话</div>
        <div class="input">
          <input style="margin-right: 15px" type="text" placeholder="请输入联系人电话" placeholder-style='font-size: 15px; text-align: right; padding-right: 15px'>
        </div>
      </div>
    </div>
    <button class="button" @click="navGo('/pages/gold-setting/main')">确定</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.user-from
    background #fff
    display flex
    line-height 50px
    height 50px
    border-bottom 1px solid #ccc
    justify-content space-between
    align-items center
    &.sec
      border-color #F0F0F2
    &.top
      margin-top 10px
    .text
      width 26%
      font-size 16px
      text-align left
      padding-left 20px
    .input
      width 40%
      font-size 15px
      padding-left 25px
    .logo
      margin-right 15px
      width 34px
      height 34px
      border-radius 30px
      border 1px solid #ccc
      overflow hidden
    .text-button
      margin-right 15px
      font-size 16px
      color #8F8E94
      width 60%
      text-align right
.edit
  margin-top 15px
.tips
  font-size 14px
  color #B8B8B8
  margin-left 6%
  margin-top 20px
.button
  margin-top 50px
  margin-bottom 10px
  width 80%
  background #2E2E2E
  color #fff
</style>
