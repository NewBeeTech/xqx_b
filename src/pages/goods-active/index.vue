<template>
	<div class="main">
		<div v-if="showModal" class ="modal">
			<div class="modal-form">
				<input v-model="expressNumber" v-bind="expressNumber" class="form-input" placeholder="请输入快递单号" />
				<div class="group-btns">
					<div class="fahuo" @click="cancelModal">取消</div>
					<div class="fahuo" @click="updateGoodsGroupOrderExpressNumber">确定</div>
				</div>
			</div>
		</div>
		<scroll-view scroll-y='true'>
			<div class="orderList" v-for="item in list">
				<div class="orderMsg">
					<label>订单号</label>
					<p>{{item.serialNumber}}</p>
					<!--<span>发货</span>-->
					<text @click="fahuoClick(item.id)" class="fahuo" style="color: #fff; width: 100rpx;" v-if="item.orderState==1">发货</text>
					<text v-if="item.orderState==2">已发货</text>
					<text v-if="item.orderState==3">已完成</text>
				</div>
				<div class="orderMsg">
					<label>商品名称</label>
					<p>{{item.commodityName}}</p>
				</div>
				<div class="orderMsg">
					<label>用户名</label>
					<p>{{item.name}}</p>
				</div>
				<div class="orderMsg">
					<label>联系电话</label>
					<p>{{item.phone}}</p>
				</div>
				<div class="orderMsg" v-if="item.expressNumber">
					<label>快递单号</label>
					<p>{{item.expressNumber}}</p>
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
				goodsGroupOrderId: "",
				expressNumber: '',
        list:[],
				showModal: false,
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
      },
			updateGoodsGroupOrderExpressNumber (){
				this.showModal = false;
				console.log(this.expressNumber, this.goodsGroupOrderId);
        let that = this;
        //		获取首页信息
        wxRequest('updateGoodsGroupOrderExpressNumber',{
					goodsGroupOrderId:that.goodsGroupOrderId,
					expressNumber: that.expressNumber
				})
          .then(res => {
            console.log(res)
            if (res.code == 1) {
              // that.list = res.value
              // console.log(res);
							wx.showToast({
                title: "发货成功",
                icon: 'none',
                duration: 2000
              });
							this.searchGroup(1);
            } else {
							wx.showToast({
                title: res.errorMsg,
                icon: 'none',
                duration: 2000
              });
						}

          }).catch(err => {
          console.log(err)
        })
      },
			fahuoClick(id) {
				this.showModal = true;
				this.goodsGroupOrderId = id;
			},
			cancelModal() {
				this.expressNumber = '';
				this.showModal = false;
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
.modal {
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.5);
}
.fahuo {
	background: #fd9326;
	text-align: center;
	font-size: 14px;
	color: #fff;
	border-radius: 4px;
	width: 100rpx;
	height: 50rpx;
	line-height: 50rpx;
}
.modal-form {
	width: 80vw;
	height: 300rpx;
	margin-top: 200rpx;
	border-radius: 10rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.form-input {
	margin-top: 60rpx;
	width: 500rpx;
	border: 1rpx solid #ddd;
	border-radius: 5rpx;
	padding: 0 5rpx;
}
.group-btns {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 500rpx;
	margin-top: 50rpx;
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
