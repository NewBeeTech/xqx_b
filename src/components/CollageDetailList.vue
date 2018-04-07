<template>
  <div class="wrapper">
    <div @click="navGo('/pages/collage-order-detail/main')" class="item" v-for="item in 4" :key="item">
      <div class="left"><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4170304738,2895518923&fm=27&gp=0.jpg" alt=""></div>
      <div class="right">
        <div class="lefts" style="margin-left: 10px">
          <div class="top">小文文</div>
          <div>1312131231</div>
        </div>
        <div>
          <div class="top" style="text-align: right">1份</div>
          <div style="text-align: right">2018-22-32 33-32</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.wrapper
  padding-bottom 80px
  background #ffffff
  width 100%
  .item
    width 92%
    height 75px
    border-bottom 1px solid #a3a3a3
    margin auto
    display flex
    align-items center
    .left
      width 45px
      height 45px
      border-radius 44px
      border 1px solid #cccccc
      overflow hidden
      img   
        width 100%
        height 100%
    .right
      line-height 27px
      flex 1
      display flex
      justify-content space-between
      div
        text-align left
        div:nth-child(1)
          font-size 16px
          color #000
        div:nth-child(2)
          font-size 13px
          color #a3a3a3
      .top
        margin-top 3px
</style>
