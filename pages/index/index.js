// pages/index/index.js
const config = require('../../common/config.js')
let app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      listArr:[],
      begin:0,
      count:50,
      moreInfo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: config.hostName +config.indexUrl,
          method:'POST',
          data:{
            "begin":this.data.begin,
            "count":this.data.count
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          dataType:'json',
          success:res=>{
            console.log(res.data.list);
            let arr = res.data.list;
            app.globalData.indexarr = arr
            this.setData({
              listArr:app.globalData.indexarr
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
      console.log("重新加载");
      wx.request({
        url: config.hostName +config.indexUrl,
        method:'POST',
        data:{
          "begin":0,
          "count":50
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        dataType:'json',
        success:res=>{
          console.log(res.data.list);
          let arr = res.data.list;
          app.globalData.indexarr = arr
          this.setData({
            listArr:app.globalData.indexarr
          })
        }
      })
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
      this.data.begin+=50
      this.data.count+=50
      wx.request({
        url: config.hostName+config.indexUrl,
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
          console.log(res.data);
          // console.log(res);
          // console.log(res.data.list);
          if(res.statusCode==200){
            app.globalData.indexarr=this.data.listArr.concat(res.data.list)
              this.setData({
                listArr: app.globalData.indexarr 
              })
          }
          else{
              this.setData({
                moreInfo:'-----我是有底线的-----'
              })
            }
        }
      })
    },
})