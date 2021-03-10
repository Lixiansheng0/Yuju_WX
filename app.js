// app.js
function formatDuring(mss) {
  mss = Number(mss);
  let days = parseInt(mss / (1000 * 60 * 60 * 24));
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (mss % (1000 * 60)) / 1000;
  console.log(days);
  if(days==0&hours==0&minutes ==0){
      let sec = Math.ceil(seconds)
      return sec + " 秒前 "
  }
  else if(days==0&hours==0){
      return minutes + " 分钟前"
  }
  else if(days==0){
      return hours + " 小时 " + minutes + " 分钟前"
  }
  return days + " 天 " + hours + " 小时 " + minutes + " 分钟前" ;
}
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: result => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = result.userInfo

              
              if(this.getCallbackData){
                this.getCallbackData(result.userInfo)
              }
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    carmodel:'',
    citystart:'',
    cityend:'',
    userphone:'',
    lookprice_carmodel:'',
    lookprice_citystart:'',
    lookprice_cityend:'',
    indexarr:[],
    companylist:[],
    showprice:true,
    bidid:0
  },
})
