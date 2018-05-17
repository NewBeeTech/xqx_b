<template>
  <div>
    <div class="c_spec_1">
			<div class="c_spec_2">充值金额</div>
			<div class="c_spec_3">
				<!--<img src="../img/钱 .png"/ class="c_spec_4">-->
				￥
				<input type="text" v-model="price" placeholder="请输入充值金额" class="c_spec_5"  placeholder-style='font-size: 18px;'/>
			</div>
		</div>
		<button @click="sum" class="c_spec_6">确认充值</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      price:''
    }
  },
  methods:{
    sum:function(){
      console.log(this.price)
    }
  }

}
</script>

<style scoped>
html,body{
  width: 100%;
  height: 100%;
  border: 1px solid white;
  box-sizing: border-box;
}
.c_spec_1{
  box-sizing: border-box;
  border: 1px solid white;
  width: 90%;
  height: 110.5px;
  margin: auto;
  margin-top: 22px;
  box-shadow: 0px 0px 10px #e5e5e5;
}
.c_spec_2{
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin-left: 22px;
  margin-top: 22px ;
}
.c_spec_3{
  width: 85%;
  margin: auto;
  height: 45px;
  box-sizing: border-box;
  /*border: 1px solid black;*/
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.c_spec_4{
  width: 15px;
  height: 15px;
  margin-top: 2px;
}
.c_spec_5{
  width: 93%;
  height: 100%;
  border: 0;
  border-bottom: 1px solid #dadada;
  padding-left: 10px;
}
.c_spec_6{
  width: 90%;
  height: 45px;
  line-height: 45px;
  border: none;
  background-color: #ff9400;
  border: 0;
  margin: auto;
  margin-top: 75px;
  display: block;
  font-size: 15px;
  color: white;
}
</style>
