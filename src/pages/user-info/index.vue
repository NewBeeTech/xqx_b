<template>
  <div class="container">
    <div class="avatar">
    </div>
    <div class="user-name">
      用户昵称
    </div>
    <section>
      <div class="main-line">
        <div class="left">手机号</div>
        <div class="right">13121132123</div>
      </div>
      <div class="main-line">
        <div class="left">手机号</div>
        <div class="right">13121132123</div>
      </div>
      <div class="main-line">
        <div class="left">手机号</div>
        <div class="right">13121132123</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  padding-top 30px
  background #fff
  .avatar
    width 80px
    height 80px
    border-radius 80px
    border 1px solid #BBB
    margin auto
    overflow hidden
  .user-name
    text-align center
    width 100%
    line-height 25px
    font-size 14px
    color #101010
  section
    margin-top 20px
    .main-line
      width 95%
      margin auto 
      line-height 50px
      font-size 14px
      display flex
      border-bottom 1px solid #ccc
      justify-content space-between
</style>
