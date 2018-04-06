<template>
  <div class="wapper">
    <div class="input">
      <div>券码</div>
      <input type="text" placeholder="请输入券码" placeholder-style='font-size: 15px; color: #BFBFBF'>
    </div>
    <button>确定</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.wapper
  height 100%
  background #fff
  padding-top 20px
.input
  font-size 14px
  display flex
  width 100%
  height 45px
  align-items center
  border-top 1px solid #BBBBBB
  border-bottom 1px solid #BBBBBB
  box-sizing border-box
  div
    width 20%
    font-size 14px
    color #101010
    text-align center
  input
    flex 1
button
  width 319px
  height 40px
  color #ffffff
  background #707070
  margin-top 40px
</style>
