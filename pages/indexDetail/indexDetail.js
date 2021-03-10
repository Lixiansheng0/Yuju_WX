const config = require("../../common/config");
const app = getApp()

function TuoyunState(num) {
    if (num > 0) {
        return num;
    } else {
        return '正在等待出价'
    }
}
// pages/indexDetail/indexDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexDetailList: [],
        release_date: 0,
        tuoYunStateH: '',
        token: '',
    },
    tongzhi(e){
        wx.showToast({
          title: '短信通知设置成功',
          duration: 1800,
          icon: "none",
        })
    },
    lookprice(e) {
        console.log(e.target);
        console.log(this.data.token);
        console.log(e.target.dataset.id);
        app.globalData.bidid = e.target.dataset.id//传bidid
        wx.request({
            url: config.hostName + config.lookprice,
            method: 'POST',
            data: {
                "id": e.target.dataset.id,
                "token": this.data.token
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            dataType: 'json',
            success: res => {
                console.log(res);
                console.log(res.statusCode);
                if(res.statusCode==204){
                    app.globalData.showprice = false
                }else{
                    app.globalData.showprice = true
                }
                
                 if (res.data.code == 3702) {
                    wx.showToast({
                        title: '登录之后才能查看报价噢',
                        icon: 'none',
                        duration: 1800
                    })
                    setTimeout((function () {
                        wx.switchTab({
                            url: '../me/me',
                        })
                    }), 1800)
                } else {
                    wx.navigateTo({
                        url: '../lookprice/lookprice',  
                    })
                    app.globalData.lookprice_carmodel = e.target.dataset.model;
                    app.globalData.lookprice_citystart = e.target.dataset.ori;
                    app.globalData.lookprice_cityend = e.target.dataset.des;
                    if(res.statusCode==200){
                        app.globalData.companylist = res.data.list
                    }
                    else{
                        app.globalData.showprice = false
                    }
                    
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        let id = options.codeId;
        wx.request({
            url: config.hostName + config.indexDetail,
            method: 'POST',
            data: {
                "id": id,
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            dataType: 'json',
            success: res => {
                console.log(res.data.list);
                let arr = res.data.list;
                let TYsta = TuoyunState(arr.quotationNumber)
                console.log(TYsta);
                console.log(arr.newstime);
                this.setData({
                    indexDetailList: arr,
                    release_date: arr.newstime,
                    tuoYunStateH: TYsta,
                })
            }
        })
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})