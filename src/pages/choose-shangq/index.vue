<template>
  <div>
    <div @click="chooseItem(item)" :class="{c_3 : choose === item}" class="c_1" v-for="(item, index) in selectList" :key="index">
			{{item.name}}
			<span v-if="choose === item" class="c_2"><img src="/static/imgs/duidui.png" alt=""></span>
		</div>
  </div>
</template>

<script>
  import {wxRequest} from '@/api'
export default {
  data () {
    return {
      choose: '',
      selectList: []
    }
  },
  onLoad (){

    var self = this;
    wxRequest('getBusinessCircle',{businessCircleKey:"130702"})
      .then(res => {

        self.selectList = res.value;

      })
      .catch(err => {
        console.log(err)
      })
  },
  onShow () {
    let that = this
    wx.getStorage({
      key: 'shangQuan',
      success: function (res) {
        that.choose = res.data
      }
    })
  },
  methods: {
    chooseItem (v) {
      let that = this
      wx.setStorage({
        key: 'shangQuan',
        data: v
      })
      wx.getStorage({
        key: 'shangQuan',
        success: function (res) {
          that.choose = res.data.value
        }
      })
      setTimeout(() => {
        this.navReturn(-1)
      }, 80)
    }
  }
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  border: 1px solid white;
  box-sizing: border-box;
}
.c_1{
  width: 343px;
  margin: auto;
  height: 40px;
  color: #333;
  font-size: 14px;
  line-height: 40px ;
  position: relative;
}
.c_2{
  position: absolute;
  right: 0;
  width: 23px;
  height: 16px
}
.c_2 img {
  width: 100%;
  height: 100%;
}
.c_3{
  color: #ff990c;
}
</style>
