// pages/me/me.js
const config = require('../../common/config.js')
let app= getApp();
function phonejiami(num){
  let str = String(num);
  let str0 = str.slice(0,3);
  let str1 = '****';
  let str2 = str.slice(7,)
  return str0+str1+str2
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username_data:'',
        password:'',
        isshow:true,
        userInfo:{},//存储头像和昵称
        userpho:'',
        getyzm:'获取验证码',
        token:'',
        begin:0,
        count:25,
        mycarlist:[],
        showbox:true,
    },
    lookprice(e){
      app.globalData.bidid = e.target.dataset.id
      wx.navigateTo({
        url: '../lookprice/lookprice',
      })

      console.log(e.target.dataset.carmodel);

      app.globalData.lookprice_carmodel = e.target.dataset.carmodel,
      app.globalData.lookprice_citystart = e.target.dataset.startcity,
      app.globalData.lookprice_cityend = e.target.dataset.endcity
    },

    quxiao(e){
      console.log(e.target.dataset.id);
      wx.request({
        url: config.hostName+config.cancelConsignment,
        method:'POST',
          data:{
            "token":this.data.token,
            "id":e.target.dataset.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          dataType:'json',
          success:res=>{
            console.log(res);
            if(res.data.code==200){
              wx.showToast({
                title: '取消托运成功',
              })
              wx.request({
                url: config.hostName+config.mycar,
                method:"POST",
                data:{
                  "token":this.data.token,
                  "begin":this.data.begin,
                  "count":this.data.count
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                },
                dataType:'json',
                success:res=>{
                  console.log('我的轿车',res);
                  if(res.statusCode==204){
                    console.log('能个啥！????');
                    this.setData({
                      boxshow:false
                    })
                  }
                  else{
                    console.log('能！！！！！！！！！！！！！！！');
                    this.setData({
                      mycarlist:res.data.list,
                    })
                  }
                }
              })
            }
          }
      })
      // 我的轿车
      
    },
    phone(e){
      // console.log(e.detail.value,e.detail.value.length);
      this.setData({
        username_data:e.detail.value
      })
    },
    password(w){
      this.setData({
        password:w.detail.value
      })
    },
    getUserInfo(e){
      this.setData({
        userInfo:e.detail.userInfo,
        // isshow:false
      })
      app.globalData.userInfo = e.detail.userInfo
    },
    yanzhengFn(){
      wx.showToast({
        title: '验证码已经发送',
      })
      if(this.data.username_data.length==11){
        this.setData({
          userpho:phonejiami(this.data.username_data)
        })
        
        wx.request({
          url: config.hostName+config.yanzhengUrl,
          method:'POST',
          data:{
            "phone":this.data.username_data,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          dataType:'json',
          success:res=>{
            // wx.hideToast({
            //   success: (res) => {},
            // })
              console.log(res);
          }
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '请输入合法的手机号',
          showCancel: false
      })
      }
    },
    login(e){
      wx.request({
        url: config.hostName+config.denglu,
        method:'POST',
        data:{
          "phone":this.data.username_data,
          "password":this.data.password,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        dataType:'json',
        success:res=>{
            console.log(res);
            console.log(res.data.code);
            if(res.data.code==200){
              wx.setStorage({
                key:"userphone",
                data:phonejiami(this.data.username_data)
              })
              wx.showToast({
                title: '登陆成功',
              })
              wx.setStorage({
                key:"token",
                data:res.data.token
              })
              this.setData({
                isshow:false,
                token:res.data.token,
                userpho:phonejiami(this.data.username_data)
              })

              // 我的轿车
              wx.request({
                url: config.hostName+config.mycar,
                method:"POST",
                data:{
                  "token":this.data.token,
                  "begin":this.data.begin,
                  "count":this.data.count
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                },
                dataType:'json',
                success:res=>{
                  console.log('我的轿车',res);
                  this.setData({
                    mycarlist:res.data.list
                  })
                }
              })
            }
            else{
              wx.showToast({
                title: '账号密码错误',
                image:'../../images/error.png',
                icon:'error',
                duration: 2000
              })
            }
        }
      })
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that = this;
      wx.getStorage({
        key: 'userphone',
        success (res) {
          console.log(res.data)
          that.setData({
            userpho:res.data
          })
        }
      })
      // try {
      //   var value = wx.getStorageSync('userphone')
      //   if (value) {
      //     console.log('userphone获取成功');
      //     this.setData({
      //       userpho:value,
      //     })
      //   }
      // } 
      // catch (e) {
      //   console.log('userphone获取失败');
      // }
      // phonejiami(this.data.username_data)
      if(app.globalData.token){
        this.setData({
          isshow:false,
          userInfo:app.globalData.userInfo,
        })
      }else{
        app.getCallbackData=res=>{
          this.setData({
            isshow:true,
            userInfo:res,
          })
        }
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
      if(app.globalData.token){
        console.log(app.globalData.userInfo);
        this.setData({
          isshow:false,
          userInfo:app.globalData.userInfo,
        })
      }else{
        app.getCallbackData=res=>{
          this.setData({
            isshow:true,
            userInfo:res,
          })
        }
      }
      try {
        var value = wx.getStorageSync('token')
        if (value) {
          console.log('token获取成功');
          this.setData({
            token:value,
            isshow:false,
            userInfo:app.globalData.userInfo
          })
        }
      } 
      catch (e) {
        console.log('token获取失败');
      }
      console.log(app.globalData.userInfo);
      try {
        var value = wx.getStorageSync('userphone')
        if (value) {
          console.log('userphone获取成功');
          this.setData({
            userpho:value,
          })
          
        }
      } 
      catch (e) {
        console.log('userphone获取失败');
      }
      // 我的轿车
      wx.request({
        url: config.hostName+config.mycar,
        method:"POST",
        data:{
          "token":this.data.token,
          "begin":this.data.begin,
          "count":this.data.count
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        dataType:'json',
        success:res=>{
          console.log('我的轿车',res);
          if(res.statusCode==204){
            console.log('能个啥！????');
            this.setData({
              boxshow:false
            })
          }
          else{
            console.log('能！！！！！！！！！！！！！！！');
            this.setData({
              boxshow:true,
              mycarlist:res.data.list,
            })
          }
        }
      })
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