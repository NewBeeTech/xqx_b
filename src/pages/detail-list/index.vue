<template>
  <div>
    <div class="c_spec6_1">
      <div @click="selecd = item" :class="{c_spec6_2 : item === selecd}" v-for="(item, index) in title" :key="index">{{item}}</div>
		</div>
		<div @click="navGo('/pages/price-detail/main')" class="c_spec6_3">
			<div class="c_spec6_4">
				<div class="c_spec6_6">充值</div>
				<div class="c_spec6_7">2018-03-28  13:23</div>
			</div>
			<div class="c_spec6_5">+1.00</div>
		</div>
		<div class="c_spec6_3">
			<div class="c_spec6_4">
				<div class="c_spec6_6">提现</div>
				<div class="c_spec6_7">2018-03-28  13:23</div>
			</div>
			<div class="c_spec6_5">-1.00</div>
		</div>
		<div class="c_spec6_3">
			<div class="c_spec6_4">
				<div class="c_spec6_6">收款码收款</div>
				<div class="c_spec6_7">2018-03-28  13:23</div>
			</div>
			<div class="c_spec6_5">+1.00</div>
		</div>
		<div class="c_spec6_3">
			<div class="c_spec6_4">
				<div class="c_spec6_6">返金</div>
				<div class="c_spec6_7">2018-03-28  13:23</div>
			</div>
			<div class="c_spec6_5">-1.00</div>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selecd: '全部',
      title: ['全部', '充值', '提现', '收入', '支出']
    }
  }
}
</script>

<style scoped>
.c_spec6_1{
  width: 343px;
  height: 46px;
  margin: auto;
  border-bottom: 1px solid #dadada;
  color: #333;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.c_spec6_1>div{
  height: 100%;
  line-height: 46px;
  width: 41.5px;
  text-align: center;
}
.c_spec6_2{
  color: #fea400;
  box-sizing: border-box;
  border-bottom: 5px solid #fea400;
}
.c_spec6_3{
  width: 343px;
  height: 72.5px;
  border-bottom: 1px solid #dadada;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c_spec6_4{
  height: 36px;
}
.c_spec6_6{
  font-size: 16px;
  color: #000;
}
.c_spec6_7{
  font-size: 14px;
  color: #a3a3a3;
}
.c_spec6_5{
  font-size: 16px;
  color: #000;
}
</style>
