<template>
  <div class="warp">
    <div class="collage-wrap">
      <div class="collage-item">
        <div class="collage-left">
          <div class="imgs">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4170304738,2895518923&fm=27&gp=0.jpg" alt="">
          </div>
        </div>
        <div class="collage-right">
          <p class="title">大盘鸡套餐</p>
          <p class="prices"><span class="price">¥90</span><span>¥100</span></p>
          <p class="date">有效期：<span style="color: #6e6e6e">2018年5月1日-2018年8月1日</span></p>
          <p class="date" style="font-size: 12px">创建时间：2018年3月4日</p>
        </div>
      </div>
      <div class="bottom" @click="navGo('/pages/collage-detail-sec/main')">
        <div>查看优惠券详情</div>
        <div><img class="icon" src="/static/imgs/right.png" alt=""></div>
      </div>
    </div>
    <section>
      亲；客户到店核销优惠券后，优惠券的收入款项在按照您预设的返金比例扣除对应返金金额后才能打到您的小确幸平台账户余额中哦～
    </section>
    <div class="nav">
      <div @click="tabToggle(item)" :class="{active : current === item}" v-for="(item, index) in buttons" :key="index">{{item}}</div>
    </div>
    <div class="centers">
      <div>2018年3月</div>
      <div>数量：12份</div>
    </div>
    <collage-detail-list></collage-detail-list>
    <div class="xiajia">
      下架
    </div>
  </div>
</template>

<script>
import collageDetailList from '@/components/CollageDetailList'
export default {
  data () {
    return {
      current: '已上架',
      buttons: ['已上架', '待上架', '已下架']
    }
  },
  methods: {
    tabToggle (item) {
      this.current = item
    }
  },
  components: {
    collageDetailList
  }
}
</script>

<style lang="stylus" scoped>
.xiajia
  width 90vw
  height 45px
  line-height 45px
  color #ffffff
  text-align center 
  font-size 18px
  background #fd9326
  border-radius 4px
  position fixed
  bottom 10px 
  left 5vw
.nav
  width 278px
  height 31px
  border 1px solid #fd9326
  border-radius 5px
  display flex
  justify-content space-between
  margin auto
  margin-top 20px
  margin-bottom 23px
  div
    &.active
      background #fd9326
      color #fff
      border 1px solid #fd9326
    &:nth-child(2) 
      border-left 1px solid #fd9326
      border-right 1px solid #fd9326
    width 100px
    height 30px
    line-height 30px
    color #fd9326
    font-size 14px
    text-align center
.warp
  height 100%
  background #fff
  padding-top 15px
  .icon 
    width 11px
    height 18px
    position relative
    top 5px
.collage-wrap
  width 348px
  border-radius 6px
  box-shadow 0px 0px 3px 0px rgba(217, 217, 217, 1)
  margin auto 
.bottom
  width 97%
  border-top 1px solid #eee
  display flex
  justify-content space-between
  color #101010
  font-size 12px
  line-height 50px
  color #555
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
      width 63px
      height 63px
      margin auto 
      margin-top 17px
      background #ccc
      border-radius 4px
      img 
        width 100%;
        height 100%;
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
      color #6e6e6e
      line-height 25px
      font-size 13px
section
  width 338px
  font-size 12px 
  color #999
  margin auto
  margin-top 20px
.centers
  width 100%;
  height 45px
  display flex
  justify-content space-between
  font-size 15px
  color #666
  background #f0f0f0
  line-height 45px
  div:nth-child(1)
    margin-left 5vw
  div:nth-child(2)
    margin-right 5vw
</style>
