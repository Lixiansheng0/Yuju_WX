// pages/search/search.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      carmodel:'',
      region: ['请选择城市'],
      region1: ['请选择城市'],

    },
    bindRegionChange: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value[1]
      })
      app.globalData.citystart= e.detail.value[1]
    },
    bindRegionChange1: function (e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({

        region1: e.detail.value[1]
      })
      app.globalData.cityend= e.detail.value[1]
    },
    bindfocus(e){
        console.log(e);
        wx.navigateTo({
          url: '../carsearch/carsearch',
        })
    },
    priceres(){
      wx.navigateTo({
        url: '../priceres/priceres',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      if(app.globalData.carmodel){
        this.setData({
          carmodel:app.globalData.carmodel
        })
      }
      if(app.globalData.citystart){
        this.setData({
          region:app.globalData.citystart
        })
      }
      if(app.globalData.cityend){
        this.setData({
          region1:app.globalData.cityend
        })
      }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})