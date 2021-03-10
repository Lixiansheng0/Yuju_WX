// pages/lookprice/lookprice.js
const app = getApp();
const config = require("../../common/config.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oricity: '',
        deccity: '',
        carmodel: '',
        showprice: true,
        companylist: [],
        token: '',
        buttonshow: true
    },

    accept(e) {
        console.log(e);
        console.log(e.target.dataset.id);
        console.log(app.globalData.bidid);
        console.log(this.data.token, '：token');
        wx.request({
            url: config.hostName + config.acceptprice,
            method: 'POST',
            data: {
                "bidid": e.target.dataset.id, //公司的id
                "id": app.globalData.bidid,
                "decide": '1',
                "token": this.data.token
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            dataType: 'json',
            success: res => {
                console.log(res);
                if (res.data.code == 200) {
                    wx.showToast({
                        title: res.data.msg,
                    })
                    wx.request({
                        url: config.hostName + config.lookprice,
                        method: 'POST',
                        data: {
                            "id": app.globalData.bidid,
                            "token": this.data.token
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                        },
                        dataType: 'json',
                        success: res => {
                            console.log(res);
                            console.log(res.statusCode);
                            if (res.statusCode == 200) {
                                console.log(200,'了');
                                this.setData({
                                    companylist:res.data.list
                                })
                            }
                        }
                    })

                }

            }
        })
    },

    refuse(e) {
        console.log(app.globalData.bidid);
        wx.request({
            url: config.hostName + config.acceptprice,
            method: 'POST',
            data: {
                "bidid": e.target.dataset.id, //公司的id
                "id": app.globalData.bidid,
                "decide": '2',
                "token": this.data.token
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            dataType: 'json',
            success: res => {
                console.log(res);
                if (res.data.code == 200) {
                    wx.showToast({
                        title: res.data.msg,
                    })
                    wx.request({
                        url: config.hostName + config.lookprice,
                        method: 'POST',
                        data: {
                            "id": app.globalData.bidid,
                            "token": this.data.token
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                        },
                        dataType: 'json',
                        success: res => {
                            console.log(res);
                            console.log(res.statusCode);
                            if (res.statusCode == 200) {
                                console.log(200,'了');
                                this.setData({
                                    companylist:res.data.list
                                })
                            }
                        }
                    })
                    
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData.bidid);
        
        if (app.globalData.lookprice_citystart) {
            this.setData({
                oricity: app.globalData.lookprice_citystart,
            })
        }
        if (app.globalData.lookprice_cityend) {
            this.setData({
                deccity: app.globalData.lookprice_cityend,
            })
        }
        if (app.globalData.lookprice_carmodel) {
            this.setData({
                carmodel: app.globalData.lookprice_carmodel
            })
        }

        this.setData({
            showprice: app.globalData.showprice
        })
        try {
            var value = wx.getStorageSync('token')
            if (value) {
                console.log('token获取成功', value);
                this.setData({
                    token: value,
                })
            }
        } catch (e) {
            console.log('token获取失败');
        }

        wx.request({
            url: config.hostName + config.lookprice,
            method: 'POST',
            data: {
                "id": app.globalData.bidid,
                "token": this.data.token
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            dataType: 'json',
            success: res => {
                console.log(res);
                console.log(res.statusCode);
                if (res.statusCode == 200) {
                    
                    console.log(200,'了');
                    console.log(res.data);
                    console.log(res.data.list);
                    if(res.data.list){
                        this.setData({
                            companylist:res.data.list
                        })
                    }
                    
                }
                else{
                    this.setData({
                        showprice:false
                    })
                }
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
        try {
            var value = wx.getStorageSync('token')
            if (value) {
                console.log('token获取成功');
                this.setData({
                    token: value,
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