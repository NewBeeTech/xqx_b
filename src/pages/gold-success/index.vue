<template>
  <div>
    <div class="c_spec4_1"><img src="/static/imgs/success.png" alt=""></div>
		<div class="c_spec4_2">反金成功</div>
		<div class="c_spec4_3 c_spec4_6">
			<input type="text" placeholder="消费金额" class="c_spec4_4" />
			<span class="c_spec4_5">￥100</span>
		</div>
		<div class="c_spec4_3">
			<input type="text" placeholder="返金比例" class="c_spec4_4" />
			<span class="c_spec4_5">1%</span>
		</div>
		<div class="c_spec4_3">
			<input type="text" placeholder="返金金额" class="c_spec4_4" />
			<span class="c_spec4_5">￥1.00</span>
		</div>
		<div class="c_spec4_3">
			<input type="text" placeholder="返金对象" class="c_spec4_4" />
			<span class="c_spec4_5">137****3214</span>
		</div>
		<button class="c_spec4_7">完成</button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.c_spec4_1{
  width: 75px;
  height: 75px;
  background-color: green;
  border-radius: 50%;
  margin: auto;
  margin-top: 50px;
  text-align: center;
  line-height: 75px;
  color: white;
  font-size: 30px;
}
.c_spec4_1 img {
  width: 100%;
  height: 100%;
}
.c_spec4_2{
  color: black;
  font-size: 17px;
  width: 100%;
  margin-top: 25px;
  text-align: center;
}
.c_spec4_3{
  width: 90%;
  height: 44px;
  border-bottom: 1px solid #dadada;
  margin: auto;	
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c_spec4_6{
  margin-top: 30px;
}
.c_spec4_4{
  font-size: 15px;
  color: #999;
  border: none;
}
.c_spec4_7{
  width: 343px;
  height: 45px;
  line-height: 45px;
  background-color: #ff9400;
  border: none;
  margin: auto;
  margin-top: 75px;
  display: block;
  font-size: 15px;
  color: white;
}
</style>
