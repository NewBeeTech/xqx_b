<template>
  <div class="wraper">
		<div class="user">
			<img src="https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/dmas/pic/item/e982b9014a90f603edc354d23112b31bb051ed31.jpg">
		</div>
		<div class="name">
			<p>K - S - H</p>
			<p>135****3241</p>
		</div>
		<div class="main">
			<div>
				<p class="mony">￥<span>123.00</span></p>
				<p>累计消费</p>
			</div>
			<div>
				<p class="mony">￥<span>123.00</span></p>
				<p>累计反金</p>
			</div>
		</div>
		<div class="kong"></div>
		<div class="jilu">
			<p :class="{active : current === item}" @click="current = item" v-for="(item, index) in itemL" :key="index">{{item}}</p>
		</div>
		<div class="back b-block" style="display: none">
			<ul>
				<li>
					<p>
						<span>预存款返金</span>
						<span>3月1日 12:00</span>
					</p>
					<label>-1.00</label>
				</li>
				<li>
					<p>
						<span>收款码返金</span>
						<span>3月1日 12:00</span>
					</p>
					<label>-1.00</label>
				</li>
			</ul>
		</div>
		<div class="back b-none">
			<ul>
				<li>
					<p>
						<span>预存款返金</span>
						<span>3月1日 12:00</span>
					</p>
					<label>-1.00</label>
				</li>
				<li>
					<p>
						<span>收款码返金</span>
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
      current: '消费记录',
      itemL: ['消费记录', '返金记录']
    }
  }
}
</script>

<style>
.wraper{
  text-align: justify;
}
.user{
  height: 60px;
  width: 60px;
  margin: 0 auto;
  margin-top: 25px;
  background: #ccc;
  border-radius: 30px;
  overflow: hidden;
}
.user img {
  width: 100%;
  height: 100%;
}
.name{
  margin-top: 13px;
}
.name p:nth-child(1){
  font-size:20.33px;
  font-weight: bold;
  text-align: center;
}
.name p:nth-child(2){
  font-size: 15.22px;
  text-align: center;
  color: #5a5a5a;
  margin-top: 8px;
}
.main{
  display: flex;
  margin:0 8%;
  margin-top:35px;
}
.main div{
  width: 50%
}
.main div:nth-child(1) .mony{
  font-size:15px;
  text-align: center;
  color: #000;
}
.main div:nth-child(1) .mony span{
  font-size:22px;
}
.main div:nth-child(1) p{
  font-size: 13px;
  color: #ccc;
  text-align: center;
}
.main div:nth-child(2) .mony{
  font-size:15px;
  text-align: center;
  color: #000;
}
.main div:nth-child(2) .mony span{
  font-size:22px;
}
.main div:nth-child(2) p{
  font-size: 13px;
  color: #ccc;
  text-align: center;
}
.kong{
  height: 10px;
  background: #f0f0f0;
  margin-top: 23px;
}
.jilu{
  width: 60%;
  height: 30px;
  margin:0 auto;
  margin-top: 25px;
  display: flex;
  border: 1px solid #ff9400;
  border-radius: 5px;
  overflow: hidden;
}
.jilu p{
  width: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
}
.jilu p.active{
  background-color: #ff9400;
  color:#fff;
}
.back{
  margin:0 5%;
}
.back ul li {
  height: 77px;
  display: flex;
  justify-content: space-between;
}
.back ul li p span {
  display: block;
}
.back ul li p span:nth-child(1){
  font-size: 16px;
  padding-top: 25px
}
.back ul li p span:nth-child(2){
  font-size: 14px;
  color: #ccc;
  padding-top: 5px;
}
.back ul li label{
  line-height: 77px
}
</style>
