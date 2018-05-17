<template>
  <div class="temp">
    <div class="">
      <radio-group class="radio-group" @change="radioChange">
       <label class="radio">
         <div class="clomoun">
           <radio value="0"/> 收款码满减优惠活动
         </div>
         <div class="lists">
            <div class="list" v-for="(item,index) in items_m" >
               消费满
               <input  type="number" v-model.lazy="item.full" >
               减
               <input type="number" v-model.lazy="item.subtract">
            </div>
            <i v-if="items_m.length<3" class="add" @click="add">+</i>
         </div>
       </label>
       <label class="radio">
         <div class="clomoun">
           <radio value="1"/> 收款码打折优惠活动
         </div>
         <div class="lists">
           <div class="list">
             <input type="number" v-model.lazy="items_d">折
           </div>
         </div>
       </label>
      </radio-group>
    </div>
    <div class="tips">
      提示：可不选，满减和打折活动二选一，请先选择后完成设置
    </div>
    <div class="btn">
       <button @click="sum">确定</button>
    </div>
  </div>
</template>

<script>
var Default = require("../../api//Default.js");
export default {
    data(){
      return{
        items_m:[{full:'',subtract:''}],
        items_d:'',
        choose:'',
        token:''
      }
    },
    onLoad:function(){
      this.token=wx.getStorageSync('token');
    },
    methods:{
      radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.mp.detail.value)
        this.choose=e.mp.detail.value;
      },
      add:function(){
        console.log(this.items_m.length)
        this.items_m.push({m:'',j:''})
        console.log(this.items_m)
      },
      sum:function(){
        let checkdata=true,msg='',type='';
        if(this.choose==0){
          type='MD';
          for (var i = 0; i < this.items_m.length; i++) {
             if(!this.items_m[i].full||!this.items_m[i].subtract){
               checkdata=false;
               msg='请填写完整的满减优惠规则';
               break;
             }
             if(!/^[0-9]*$/.test(this.items_m[i].subtract)||!/^[0-9]*$/.test(this.items_m[i].full)){
               checkdata=false;
               msg='请填写数字';
               break;
             }
             if(this.items_m[i].subtract>= this.items_m[i].full){
               checkdata=false;
               msg='满减额度不能大于目标额度';
               break;
             }
          }
        }else{
          type='MR';
          if(!this.items_d||!/^[0-9]*$/.test(this.items_d)){
            checkdata=false;
            msg='请填写正确的打折优惠规则';
          }
        }
        if(!checkdata){
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        const data={
          sessionKey:this.token,
          discountMode:type,
          discounts:type=='MD'?JSON.stringify(this.items_m):null,
          rebate:this.items_d
        }
        console.log(data)
        wx.request({
          url: Default.HOST+'mxcx/MerchantController/merchantActivities',
          data:data,
          method:'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(res) {
            if(res.data.code==1){
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function(){
                wx.navigateBack();
              },1000)
            }else{
              wx.showToast({
                title: '网络错误请稍后再试',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    }
}
</script>

<style scoped="true">
.btn button{margin-top: 56rpx;width: 634rpx;line-height: 84rpx;border-radius: 4px;background-color: rgba(46, 46, 46, 1);color: rgba(255, 255, 255, 1);font-size: 14px; text-align: center;}
.tips{color:rgba(16, 16, 16, 1);font-size: 22rpx;text-align: center;}
.lists{position: relative;font-size: 28rpx;}
.add{position: absolute;bottom:48rpx;right: 188rpx;width: 48rpx;height: 48rpx;line-height: 42rpx;font-weight: 600;border-radius: 50%;background: rgba(130, 127, 130, 1);text-align: center;font-size: 44rpx;color: #fff;}
.clomoun{padding: 32rpx 0;border-bottom:1px solid #e6e6e6;}
.temp{
  background-color: rgba(240, 240, 240, 1);height: 100%;padding-top:24rpx;font-size: 32rpx;color:#101010;

 }
.radio-group{}
.radio{
 background: #fff;display:block;padding: 0 28rpx;margin-bottom: 50rpx;
}
.list{padding: 50rpx 84rpx;}
.list input{
   display: inline-block;width: 110rpx;border-bottom: 1px solid #444;text-align: center;vertical-align: bottom;
}
</style>
