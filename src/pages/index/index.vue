<template>
  <div class="main">
    <header>
      <div @click="navGo('/pages/receipt-code/main')">
        <div><img src="/static/imgs/Artboard@2x.png" alt=""></div>
        <div>收款码</div>
      </div>
      
      <div @click="scanCode">
        <div><img src="/static/imgs/ArtboardCopy7@2x.png" alt=""></div>
        <div>扫一扫</div>
      </div>
      <div @click="navationTo('/pages/collage-list/main')">
        <div><img src="/static/imgs/8.png" alt=""></div>
        <div>钱包</div>
      </div>
    </header>
    <header>
      <div @click="navGo('/pages/goods-active/main')">
        <div><img src="/static/imgs/1.png" alt=""></div>
        <div>待发货</div>
      </div>
      <div @click="navGo('/pages/goods-active/main')">
        <div><img src="/static/imgs/6.png" alt=""></div>
        <div>已发货</div>
      </div>
      <div @click="navGo('/pages/goods-active/main')">
        <div><img src="/static/imgs/7.png" alt=""></div>
        <div>已完成</div>
      </div>
    </header>
    <header>
      <div @click="navGo('/pages/groups-list/main')">
        <div><img src="/static/imgs/4.png" alt=""></div>
        <div>拼团</div>
      </div>
      <div @click="navationTo('/pages/collage-list/main')">
        <div><img src="/static/imgs/2.png" alt=""></div>
        <div>砍价</div>
      </div>
      <div @click="scanCode">
        <div><img src="/static/imgs/3.png" alt=""></div>
        <div>秒杀</div>
      </div>
    </header>
    <section>
      <div @click="navGo('/pages/transaction-record/main')" class="sec-lin">
        <div class="item">
          <div>313</div>
          <div>今日营收</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>233</div>
          <div>累计营收</div>
        </div>
      </div>
      <div @click="navGo('/pages/transaction-record/main')" class="sec-lin">
        <div class="item">
          <div>434</div>
          <div>今日返金</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>555</div>
          <div>累计返金</div>
        </div>
      </div>
      <div @click="navGo('/pages/my-client/main')" class="sec-lin">
        <div class="item">
          <div>312</div>
          <div>今日新增客户</div>
        </div>
        <div class="cneter"></div>
        <div class="item">
          <div>423</div>
          <div>累计客户</div>
        </div>
      </div>
    </section>

    <section class="jiehoug">
      <div @click="navationTo('/pages/merchant-edit/main')">
        <span><img src="/static/imgs/ArtboardCopy9@2x.png" alt=""></span>
        <span>基本信息设置</span>
      </div>
      <div>
        <span><img src="/static/imgs/ArtboardCopy10@2x.png" alt=""></span>
        <span @click="navGo('/pages/gold-setting/main')">返金设置</span>
      </div>
    </section>

    <section class="footer" @click="navGo('/pages/user-price/main')">
      <div class="sec-lin">
        <div class="item">
          <span class="icon"><img src="/static/imgs/ArtboardCopy11@2x.png" alt=""></span>
          <span class="text">账户余额</span>
        </div>
        <div class="item">100</div>
      </div>
    </section>
    <footer>
      <div>您还未进行资质认证，下载小确幸商家版APP完成认证后，可体验更多营销服务哦～</div>
      <div>立即下载</div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    scanCode () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    },
    navationTo (url) {
      wx.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  padding-top 30px
header  
  width 100%
  background #ffffff
  display flex
  justify-content space-around
  div
    text-align center
    font-size 14px
    color #101010
  div:nth-child(1) 
    img 
      width 100%
      height 100%
    width 46px
    height 46px
  div:nth-child(2)
    line-height 50px
section   
  .sec-lin
    margin auto
    border-radius 4px
    margin-top 10px
    width 346px
    height 69px
    left 14px
    background #fff
    text-align center
    box-shadow 0px 0px 3px 0px rgba(217, 217, 217, 1)
    display flex
    justify-content space-between
    align-items center
    .cneter
      width 1px
      height 13px
      background #ccc
    .item
      width 49%
      text-align center
      div:nth-child(1)
        font-size 24px
        color #101010
      div:nth-child(2)
        font-size 12px
        color #A3A3A3
.jiehoug
  width 346px
  margin auto 
  margin-top 30px
  display flex
  justify-content space-between
  div
    border-radius 4px
    background #fff
    width 163px
    height 63px
    line-height 20px
    text-align center
    display flex
    align-items center
    box-shadow 0px 0px 3px 0px rgba(217, 217, 217, 1)
  span 
    font-size 14px
    color #101010
    line-height 63px
    &:nth-child(1)
      img 
        width 100%
        height 100%
        display block
      width 25px
      height 25px
      margin 20px
  .footer
    .sec-lin
      .item
        width 50%
        height 100%
        span
          display inline-block
.icon 
  img 
    width 100%
    height 100%
  display inline-block
  position relative
  top 5px
  left -17px
  width 25px
  height 25px
.text
  top -3px
  position relative
  font-size 14px
  color #101010
footer  
  width 100%
  height 58px
  position fixed
  bottom 0
  background #ffffff
  display flex
  justify-content space-around
  align-items center
  div:nth-child(1) 
    width 225px
    height 34px
    font-size 12px
    color #101010
  div:nth-child(2) 
    width 80px
    height 30px
    text-align center 
    line-height 30px
    background #fd9326
    font-size 14px
    color #fff
    border-radius 4px
</style>
