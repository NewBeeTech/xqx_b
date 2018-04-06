<template>
  <div>
    <div class="serch">
      <div class="serch-in">
        搜索地点
      </div>
    </div>
    <div class="map">
      <map id="map"
        longitude="113.324520"
        latitude="23.099994"
        scale="14"
        :controls="controls"
        @controltap="moveChange"
        :markers="markers"
        :polyline="polyline"
        @regionchange="regionchange"
        show-location
        style="width: 100%; height: 30vh;">
      </map>
    </div>
    <scroll-view scroll-y style="height: 63vh; background: #fff">
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
      <div class="scorll-item">
        <div>老上海城隍庙小吃（知春路分店）</div>
        <div>北京市海淀区知春路17-1</div>
      </div>
    </scroll-view>
    <button class="button">确定</button>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      markers: [{
        iconPath: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4157100854,154011290&fm=27&gp=0.jpg',
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4157100854,154011290&fm=27&gp=0.jpg',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
  },
  methods: {
    regionchange (e) {
      console.log(111)
      console.log(e.type)
    },
    moveChange (e) {
      console.log(111)
      console.log(e.controlId)
    }
  }
}
</script>

<style lang="stylus">
.serch
  width 100%
  height 7vh
  background #E6E6E6
  display flex
  align-items center
  .serch-in
    width 94%
    margin auto 
    height 28px
    background #fff
    border-radius 5px
    font-size 14px
    color #888
    line-height 28px
    text-align center
.scorll-item
  background #fff
  margin-left 15px
  border-bottom 1px solid #B0B0B0
  height 70px
  div
    padding-top 10px
  div:nth-child(1)
    color #101010
    font-size 14px
  div:nth-child(2)
    color #B0B0B0
    font-size 12px
.button
  position fixed
  bottom 10px
  left 10%
  width 80%
  background #2E2E2E
  color #fff
</style>
