<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    wx.login({
      success: function (res) {
        console.log(res)
      }
    })
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('app created and cache logs by setStorageSync')
  },
  methods: {
    navGo (e) {
      wx.navigateTo({
        url: e
      })
    },
    getstorage (key) {
      wx.getStorage({
        key: key,
        success: function (res) {
          return res
        }
      })
    }
  }
}
</script>

<style lang="stylus">
html
  height 100%
</style>
