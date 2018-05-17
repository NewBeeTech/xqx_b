<template>
  <div class="page">
    <div class="serch">
      <div class="serch-in">
        <input type="text" placeholder="搜索地点" @blur="search">
      </div>
    </div>
    <div class="map">
      <map id="map"
           scale="14"
           show-location
           style="width: 100%; height: 40vh;">
      </map>
    </div>
    <scroll-view class="result_contaniner" scroll-y style="height: 60vh; background: #fff">
      <div class="scorll-item" v-for="item in list" @click="chooseLocation(item)">
        <div>{{item.title}}</div>
        <div>{{item.address}}</div>
      </div>

    </scroll-view>
    <button class="button">确定</button>
  </div>
</template>

<script>
  import {wxRequest} from '@/api'
  import {qqMap} from "../../api/qqmap-wx-jssdk";

  var qqmapsdk = new qqMap({
    key: 'OHQBZ-YF2R4-3ZAUK-DWK4H-YV6IZ-J3BD7'
  });
  export default {
    data() {
      return {
        list: [],
        loc: {}
      }
    },
    onLoad() {
      var self = this;
      this.mapCtx = wx.createMapContext('map')
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          self.loc.latitude = res.latitude;
          self.loc.longitude = res.longitude;
          self.mapCtx.moveToLocation();
        }
      })
    },
    methods: {
      search(e) {
        console.log(e)

        var self = this;
        qqmapsdk.search({
          keyword: e.target.value,
          location: {latitude: this.loc.latitude, longitude: this.loc.longitude},
          success: function (res) {
            console.log(res.data);
            self.list = res.data;
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      },
      chooseLocation: function (e) {
        console.log(e)
        wx.setStorageSync("chooseAddress",JSON.stringify(e));
        wx.navigateBack();
      }
    }
  }
</script>

<style lang="stylus">
.page
  height 100%
  overflow hidden
  .serch
    width 100%
    height 88rpx
    background #E6E6E6
    display flex
    align-items center
    .serch-in
      width 94%
      margin auto
      height 56rpx
      background #fff
      border-radius 10rpx
      font-size 28rpx
      color #888
      line-height 56rpx
      text-align center
  .result_contaniner
    width 100%

    .scorll-item
      background #fff
      margin-left 30rpx
      border-bottom 2rpx solid #B0B0B0

    div
      padding-top 20rpx
    div:nth-child(1)
      color #101010
      font-size 28rpx
    div:nth-child(2)
      color #B0B0B0
      font-size 24rpx

  .button
    position fixed
    bottom 20rpx
    left 10%
    width 80%
    background #2E2E2E
    color #fff
</style>
