<template>
	<div class="main">
		<scroll-view scroll-y='true'>
			<div class="orderList">
				<div class="orderMsg">
					<label>订单号</label>
					<p>123456789</p>
					<!--<span>发货</span>-->
					<text>已发货</text>
				</div>
				<div class="orderMsg">
					<label>商品名称</label>
					<p>老干妈</p>
				</div>
				<div class="orderMsg">
					<label>用户名</label>
					<p>老干妈</p>
				</div>
				<div class="orderMsg">
					<label>联系电话</label>
					<p>老干妈</p>
				</div>
				<div class="orderMsg">
					<label>地址</label>
					<p>北京市朝阳区望京国际,北京市朝阳区望京国际北京市朝阳区望京国际北京市朝阳区望京国际</p>
				</div>
			</div>
			<div class="orderList">
				<div class="orderMsg">
					<label>订单号</label>
					<p>123456789</p>
					<!--<span>发货</span>-->
					<text>已发货</text>
				</div>
				<div class="orderMsg">
					<label>商品名称</label>
					<p>老干妈</p>
				</div>
				<div class="orderMsg">
					<label>用户名</label>
					<p>老干妈</p>
				</div>
				<div class="orderMsg">
					<label>联系电话</label>
					<p>老干妈</p>
				</div>
				<div class="orderMsg">
					<label>地址</label>
					<p>北京市朝阳区望京国际,北京市朝阳区望京国际北京市朝阳区望京国际北京市朝阳区望京国际</p>
				</div>
			</div>
		</scroll-view>
	</div>

</template>

<script>
	
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