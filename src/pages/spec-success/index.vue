<template>
  <div>
    <div class="c_spec2_1"><img src="/static/imgs/success.png" alt=""></div>
		<div class="c_spec2_2">充值成功</div>
		<div class="c_spec2_3">
			<span class="c_spec2_4"> 充值金额</span>
			<span class="c_spec2_5">￥100</span>
		</div>
		<button class="c_spec2_6">完成</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  border: 1px solid white;
  box-sizing: border-box;
}	
.c_spec2_1{
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
.c_spec2_1 img {
  width: 100%;
  height: 100%;
}
.c_spec2_2{
  color: black;
  font-size: 17px;
  width: 100%;
  margin-top: 25px;
  text-align: center;
}
.c_spec2_3{
  width: 90%;
  height: 44px;
  border-bottom: 1px solid #dadada;
  margin: auto;	
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c_spec2_4{
  font-size: 15px;
  color: #999;
  border: none;
}
.c_spec2_6{
  width: 90%;
  height: 45px;
  line-height: 45px;
  background-color: #ff9400;
  border: none;
  margin: auto;
  margin-top: 72.5px;
  display: block;
  font-size: 15px;
  color: white;
}
</style>
