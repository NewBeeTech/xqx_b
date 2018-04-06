<template>
  <div class="warp">
    <div class="collage-wrap">
      <div class="collage-item">
        <div class="collage-left">
          <div class="imgs">
          </div>
        </div>
        <div class="collage-right">
          <p class="title">大盘鸡套餐</p>
          <p class="prices"><span class="price">¥90</span><span>¥100</span></p>
          <p class="date">有效期：2018年5月1日-2018年8月1日</p>
          <p class="date">创建时间：2018年3月4日</p>
        </div>
      </div>
      <div class="bottom">
        <div>查看优惠券详情</div>
        <div>></div>
      </div>
    </div>
    <section>
      亲；客户到店核销优惠券后，优惠券的收入款项在按照您预设的返金比例扣除对应返金金额后才能打到您的小确幸平台账户余额中哦～
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.warp
  height 100%
  background #fff
  padding-top 15px
.collage-wrap
  width 348px
  border 1px solid #BBBBBB
  border-radius 6px
  margin auto 
.bottom
  width 97%
  border-top 1px solid #eee
  display flex
  justify-content space-between
  color #101010
  font-size 14px
  line-height 40px
  margin auto
  div:nth-child(1)
    margin-left 10px
.collage-item
  width 100%
  margin-bottom 15px
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
section
  width 338px
  font-size 13px 
  color #101010
  margin auto
  margin-top 10px
</style>
