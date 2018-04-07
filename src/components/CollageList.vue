<template>
  <div>
    <div v-for="(item, index) in 4" :key="index" class="collage-item" @click="goDetail()">
      <div class="collage-left">
        <div class="imgs">
         </div>
      </div>
      <div class="collage-right">
        <p class="title">大盘鸡套餐</p>
        <p class="prices"><span class="price">¥90</span><span class="price-two">¥100</span></p>
        <p class="date one">有效期：2018年5月1日-2018年8月1日</p>
        <p class="date cec">创建时间：2018年3月4日</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goDetail () {
      wx.navigateTo({
        url: '/pages/collage-detail/main?id='
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.collage-item
  width 348px
  height 127px
  box-shadow 0px 0px 3px 0px rgba(217, 217, 217, 1)
  border-radius 6px
  margin auto 
  margin-top 15px
  display flex
  .collage-left 
    width 90px
    height 100%
    .imgs 
      width 70px
      height 70px
      margin auto 
      margin-top 10px
      background #ccc
  .collage-right  
    flex: 1
    font-size 14px
    color #101010
    margin-top 15px
    .title
      color #101010
    .prices
      margin-top 10px
    .price
      line-height 25px
      margin-top 20px
      font-size 18px
      margin-right 10px
    .date 
      line-height 25px
      font-size 11px
  .price-two
    text-decoration line-through
    color #979797
  .one
    color #6e6e6e
  .cec
    color #999999
</style>
