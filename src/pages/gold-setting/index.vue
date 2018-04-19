<template>
  <div>
    <div class="c_spec3_1">
      <div class="c_spec3_2">返金比例</div>
      <div class="c_spec3_3">
        <input type="text" v-model="info.ratio" value="0.01" class="c_spec3_4"/>
        <span class="c_spec3_5">%</span>
      </div>
      <div class="c_spec3_6"><img class="icon" src="/static/imgs/jiao_height.png" alt=""></div>
    </div>
    <div class="c_spec3_7">
      <div class="c_spec3_8">会员积分兑换养老金比例</div>
      <div class="c_spec3_9">
        <input type="text" placeholder="请输入积分" class="c_spec3_10" value="100" disabled/>
        <div class="c_spec3_11">兑</div>
        <input type="text" v-model="info.integral_ratio" placeholder="请输入养老金" class="c_spec3_12"/>
      </div>
      <div class="c_spec3_13"><img class="icon" src="/static/imgs/jiao_gr.png" alt=""></div>
    </div>
    <div class="c_spec3_14">提示：反金比例和会员积分兑换养老金比例至少选择一个，可多选</div>
    <button class="c_spec3_15" @click="updateInfo()">保存</button>
  </div>
</template>

<script>

  import {wxRequest} from '@/api'

  export default {
    data() {
      return {
        info: {},
        jifen:0,
        yanlao:0
      }
    },
    methods: {
      getInfo: function () {
        var self = this;
        wxRequest('queryMerchantInfo')
          .then(res => {
            console.log(res);
            self.info = res.value;
          })
          .catch(err => {
            console.log(err)
          })
      },
      updateInfo: function (e) {

        wxRequest('merchantRegister', this.info)
          .then(res => {
            console.log(res);
            wx.navigateBack()
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .c_spec3_1, .c_spec3_7 {
    box-sizing: border-box;
    border: 1px solid white;
    width: 343px;
    height: 134px;
    margin: auto;
    margin-top: 15px;
    box-shadow: 0px 0px 10px #e5e5e5;
    position: relative;
  }

  .c_spec3_2, .c_spec3_8 {
    width: 313.5px;
    height: 50px;
    border-bottom: 1px solid #dadada;
    margin: auto;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    font-weight: bold;
  }

  .c_spec3_3, .c_spec3_9 {
    width: 313.5px;
    height: 30px;
    /*box-sizing: border-box;*/
    /*border: 1px solid black;*/
    margin: auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: #000;
    font-size: 16px;
  }

  .c_spec3_4 {
    text-align: center;
    line-height: 100%;
    width: 82px;
    height: 100%;
    border: none;
    border-bottom: 1px solid #dadada;
  }

  .c_spec3_5 {
    margin-left: 8px;
  }

  .c_spec3_6, .c_spec3_13 {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    position: absolute;
    right: 0px;
    top: 0px;
    text-align: center;
    line-height: 40px;
    color: white;
    font-size: 18px;
  }

  img.icon {
    width: 100%;
    height: 100%;
  }

  img.icon {
    width: 100%;
    height: 100%;
  }

  .c_spec3_10, .c_spec3_12 {
    width: 137px;
    border: none;
    height: 100%;
    border-bottom: 1px solid #dadada;
    font-size: 16px;
    color: #cbcbcb;
    text-align: center;
  }

  .c_spec3_11 {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid orange;
    color: orange;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
  }

  .c_spec3_9 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .c_spec3_14 {
    width: 343px;
    color: #999;
    font-size: 12px;
    margin: auto;
    margin-top: 34px;
  }

  .c_spec3_15 {
    width: 343px;
    height: 45px;
    line-height: 45px;
    background-color: #ff9400;
    border: none;
    margin: auto;
    margin-top: 40px;
    display: block;
    font-size: 15px;
    color: white;
  }
</style>
