const config = require('../../common/config.js')
const app = getApp()
// pages/carsearch/carsearch.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        carlist:[],
        begin:0,
        count:25,
        moreInfo:''
    },
    bindKeyInput: function (e) {
        console.log(e.detail.value);
        let keywords = e.detail.value
        if(keywords){
            this.setData({
                carlist:[]
            })
            wx.request({
                url: config.hostName+config.carlist,
                method:'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                },
                data:{
                    "begin":this.data.begin,
                    "count":this.data.count,
                    "model":keywords,
                },
                success:res=>{
                    console.log(res.data.list);
                    this.setData({
                        carlist:res.data.list
                    })
                }
                
            })
        }
        else{
            wx.request({
                url: config.hostName+config.carlist,
                method:'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                },
                dataType:'json',
                data:{
                    "begin":this.data.begin,
                    "count":this.data.count,
                    "model":"",
                },
                success:res=>{
                    console.log(res.data.list);
                    this.setData({
                      carlist:res.data.list
                    })
                }
                
              })
        }
        
      },
      carlist(e){
          console.log(e.currentTarget.dataset.name);
          wx.switchTab({
            url: '../car/car',
          })
          app.globalData.carmodel= e.currentTarget.dataset.name
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: config.hostName+config.carlist,
          method:'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          dataType:'json',
          data:{
              "begin":this.data.begin,
              "count":this.data.count,
              "model":"",
          },
          success:res=>{
              console.log(res.data.list);
              this.setData({
                carlist:this.data.carlist.concat(res.data.list)
              })
          }
          
        })
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
      this.data.begin+=25
      this.data.count+=25
      wx.request({
        url: config.hostName+config.carlist,
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        dataType:'json',
        data:{
            "begin":this.data.begin,
            "count":this.data.count,
            "model":"",
        },
        success:res=>{
          console.log(res);
          console.log(res.data.list);
          if(res.statusCode==200){
            this.setData({
              carlist:this.data.carlist.concat(res.data.list)
            })
          }
          else{
            this.setData({
              moreInfo:'-----我的有底线的-----'
            })
          }
            
        }
        
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})