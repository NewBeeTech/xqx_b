<template>
  <div class="wraper">
		<header>
			<p>充值金额</p>
			<p>￥<span>4.00</span></p>
		</header>
		<main>
			<ul>
				<li><span>类型</span><span>充值</span></li>
				<li><span>充值方式</span><span>微信支付</span></li>
				<li><span>时间</span><span>2018-3-12 12:00</span></li>
				<li><span>流水号</span><span>1231516564852</span></li>
			</ul>
		</main>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wraper{
  margin:0 5%;
}
header{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dadada;
  width: 100%;
}
header p{
  font-size:15.15px;
  color:#3f3f3f;
  line-height: 65px;
}
header p span{
  font-size:19px;
  line-height: 65px;
}
main ul li{
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
main ul li span:nth-child(1){
  color:#9e9e9e;
}
main ul li span{
  display: inline-block;
  line-height: 50px;
  color:#2f2f2f;
}
</style>
