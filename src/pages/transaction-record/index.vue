<template>
  <div class="wraper">
		<div class="day">
			<div style="font-size: 15px;color:#666">
				<p>2018年3月1日</p>
				<p>
					<span>营收:<span>￥40.00</span></span>
					<span>返金:<span>￥40.00</span></span>
				</p>
			</div>
			<div>
        <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
          <view class="picker">
            <img class="img" src="/static/imgs/yuefenpaizi.png">
          </view>
        </picker>
			</div>
		</div>
		<div class="back">
			<ul>
				<li>
					<p>
						<span>收款码返金</span>
						<span>3月1日 12:00</span>
					</p>
					<label>-1.00</label>
				</li>
				<li>
					<p>
						<span>优惠券订单</span>
						<span>3月1日 12:00</span>
					</p>
					<label>-1.00</label>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      date: ''
    }
  },
  methods: {
    bindDateChange (e) {
      this.date = e.mp.detail.value
    }
  }
}
</script>

<style scoped>
.back{
	margin:0 5%;
}
.back ul li {
	height: 77px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #f0f0f0;
}
.back ul li:last-child{
	border-bottom:none;
}
.back ul li p span {
	display: block;
}
.back ul li p span:nth-child(1){
	font-size: 16px;
	padding-top: 15px
}
.back ul li p span:nth-child(2){
	font-size: 14px;
	color: #ccc;
	padding-top: 5px;
}
.img{ 
  width: 25px;
  height: 25px;
}
.back ul li label{
	line-height: 77px
}
.day{
	height: 62px;
	background: #f0f0f0;
	padding: 0 5%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.day div p{
	padding-top: 8px;
}
.day div p:nth-child(2) span{
	padding-right: 10px;
}
.day div:nth-child(2){
	height: 25px;
	width: 25px;
}
.day div:nth-child(2) img{
	display: block;
	width: 100%
}
</style>
