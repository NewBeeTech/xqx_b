<template>
	<div class="main">
		<scroll-view scroll-y='true'>
			<div class="orderList" v-for="item in list">
				<div class="orderMsg">
					<label>订单号</label>
					<p>{{item.serialNumber}}}</p>
					<!--<span>发货</span>-->
					<text v-if="item.orderState==1">待发货</text>
					<text v-if="item.orderState==2">已发货</text>
					<text v-if="item.orderState==3">已完成</text>
				</div>
				<div class="orderMsg">
					<label>商品名称</label>
					<p>{{item.commodityName}}</p>
				</div>
				<div class="orderMsg">
					<label>用户名</label>
					<p>{{item.personName}}</p>
				</div>
				<div class="orderMsg">
					<label>联系电话</label>
					<p>{{item.phone}}</p>
				</div>
				<div class="orderMsg">
					<label>地址</label>
					<p>{{item.address}}</p>
				</div>
			</div>

		</scroll-view>
	</div>

</template>

<script>
  import {wxRequest} from '@/api'

  export default {
    data () {
      return {
        current: 0,
        list:[]
      }
    },
    mounted () {

    },
    onLoad (options) {
      console.log(options.status)
      this.status = options.status

      this.searchGroup(1);
    },
		onShow() {
			if (this.status == 1) {
				wx.setNavigationBarTitle({
					title: '待发货'
				});
			} else if (this.status == 2) {
				wx.setNavigationBarTitle({
					title: '已发货'
				});
			} else if (this.status == 3) {
				wx.setNavigationBarTitle({
					title: '已完成'
				});
			}
		},
		unLoad() {
			this.status = '';
		},
    methods: {
      searchGroup (page){

        let that = this;
        //		获取首页信息
        wxRequest('queryGoodsGroupOrderState',{status:this.status,pageNum:page,pageSize:10})
          .then(res => {
            console.log(res)
            if (res.code == 1) {
              that.list = res.value
              console.log(res);
            }

          }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.main{
	height: 100%;
	font-size: 24rpx;
	background: #f0f0f0;
	border-top: 1rpx solid #efefef;
}
.main>scroll-view{
	height: 100%;
}
.orderList{
	padding:35rpx 30rpx;
	background: white;
	margin-bottom: 20rpx;
}
.orderMsg{
	display: flex;
	line-height: 50rpx;
}
.orderMsg>view{
	flex: 1;
}
.orderMsg label{
	display: block;
	width: 190rpx;
	color: #999;
}
.orderMsg span{
	display:block;
	border: 1rpx solid #FEA401;
	color: #FEA401;
	padding: 0 20rpx;
	border-radius: 10rpx;
}
.orderMsg text{
	color: #999;
}
</style>
