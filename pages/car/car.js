// pages/car/car.js
const app = getApp()
const config = require('../../common/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carmodel: '',
    region: ['请选择城市'],
    region1: ['请选择城市'],
    items: [{
        name: '车辆能正常开动',
        value: '能否正常开动'
      },
      {
        name: '敞篷车',
        value: '是否是敞篷车'
      },
      {
        name: '改装车',
        value: '是否改装过'
      },
    ],
    token: '',
    model: '',
    origin: '',
    destination: '',
    amount: '',
    price: '',
    condition: '',
    name: '',
    phone: '',
    isnull: 1
  },
  isnull(e) {
    if (e.detail.value) {
      this.setData({
        isnull: 1
      })
    } else {
      this.setData({
        isnull: 0
      })
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(this.data.token);
    wx.request({
      url: config.hostName + config.fabumes,
      method: 'POST',
      data: {
        "model": e.detail.value.model,
        "origin": app.globalData.citystart,
        "destination": app.globalData.cityend,
        "amount": e.detail.value.amount,
        "price": e.detail.value.price,
        "condition": e.detail.value.checkbox.join(','),
        "name": e.detail.value.name,
        "phone": e.detail.value.phone,
        "token": this.data.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      // dataType:'json',
      success: res => {
        console.log(res);
        if (this.data.isnull = 1) {



          if (res.data.code == 3301) {
            wx.showToast({
              title: '登录之后才能发布噢',
              icon: 'none',
              duration: 1800
            })
            setTimeout((function () {
              wx.switchTab({
                url: '../me/me',
              })
            }), 1800)
          } else if (res.data.code == 3303) {
            wx.showToast({
              title: '还有必填项没有填噢',
              duration: 1800,
              icon: "none",
            })
          } else {
            wx.navigateTo({
              url: '../Release_success/Release_success',
            })
          }
        } else {
          wx.showToast({
            title: '必选项不能为空噢',
            icon: 'none',
            duration: 1800
          })
        }
      }

    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value[1]
    })
    app.globalData.citystart = e.detail.value[1]
  },
  bindRegionChange1: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region1: e.detail.value[1]
    })
    app.globalData.cityend = e.detail.value[1]
  },
  bindfocus(e) {
    console.log(e);
    wx.navigateTo({
      url: '../car_carmodellist/car_carmodellist',
    })
  },
  priceres() {
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
    if (app.globalData.carmodel) {
      this.setData({
        carmodel: app.globalData.carmodel
      })
    }
    if (app.globalData.citystart) {
      this.setData({
        region: app.globalData.citystart
      })
    }
    if (app.globalData.cityend) {
      this.setData({
        region1: app.globalData.cityend
      })
    }
  
    try {
      var value = wx.getStorageSync('token')
      if (value) {
        console.log('token获取成功');
        this.setData({
          token: value
        })
      }
    } catch (e) {
      console.log('token获取失败');
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