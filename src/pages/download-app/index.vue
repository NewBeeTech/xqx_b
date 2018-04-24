<template>
  <div class="container">
    <img class="download-app-icon" src="/static/imgs/download-app.png" />
    <div class="download-app-desc">https://bmini.xqx.com/download/success.html 点击复制按钮，在手机浏览器打开进行下载或者在各大应用市场搜索下载！</div>
    <div class="download-app-btn" @click="copyLink">复制链接</div>
  </div>
</template>
<script>
import { wxRequest } from '@/api'
export default {
  methods: {
    copyLink: function() {
      wx.setClipboardData({
        data: 'https://bmini.xqx.com/download/success.html',
        success: function() {
          wx.showToast({
            title: '复制成功',
            icon: 'success',
            duration: 2000
          });
        }
      })
    },
  }
}
</script>
<style scoped>
.download-app-icon {
  width: 150rpx;
  height: 150rpx;
  margin-top: 150rpx;
}
.download-app-desc {
  font-size: 26rpx;
  max-width: 500rpx;
  text-align: center;
  margin: 50rpx 0;
  color: grey;
}
.download-app-btn {
  width: 600rpx;
  text-align: center;
  background-color: #FEA401;
  height: 90rpx;
  border-radius: 10rpx;
  color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
