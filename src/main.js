import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.mixin({
  methods: {
    navGo (e) {
      wx.navigateTo({
        url: e
      })
    },
    navReturn (e) {
      wx.navigateBack({
        delta: e
      })
    }
  }
})

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main', // 首页
      'pages/bind-phone/main', // 绑定手机
      'pages/user-info/main', // 用户信息
      'pages/merchant-edit/main', // 基本信息
      'pages/set-map/main', // 地点设置
      'pages/industry-select/main', // 行业
      'pages/merchant-info/main', // 基本信息
      'pages/collage-list/main', // 优惠券列表
      'pages/collage-detail/main', // 优惠券详情
      'pages/manual-coupon/main', // 手动核销优惠券
      'pages/create-collage/main', // 创建优惠券
      'pages/spec-first/main', // 充值
      'pages/spec-success/main', // 充值成功
      'pages/gold-setting/main', // 返金比例设置
      'pages/gold-success/main', // 返金成功
      'pages/hexiao-success/main', // 核销成功
      'pages/detail-list/main', // 明细列表
      'pages/receipt-code/main', // 收款码
      'pages/my-client/main', // 我的客户
      'pages/time-checked/main', // 设置时间
      'pages/transaction-record/main', // 交易记录
      'pages/user-price/main', // 账户余额
      'pages/price-detail/main', // 余额明细
      'pages/user-detail/main' // 个人信息
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
