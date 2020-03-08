//index.js
//获取应用实例
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var localData=require('../../utils/tsconfig.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    testText:"",
    discussShow:false,
    textValue:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  discussAction:function(e){
    console.log('点击评论');
    wx.showToast({
      title: '评论成功'

    })
  },
  bindTextarea:function(){
    this.setData({
      discussShow:!this.data.discussShow
    });

  },
  bindbtn:function(e){
    console.log(e.detail.value);
  },
  onLoad: function () {
    console.log(localData);
    var _this=this;
    var m_=localData.testJson.compilerOptions.title;
    WxParse.wxParse("article","html",m_,_this,0);
    _this.setData({testText:localData.testJson.compilerOptions.title});
    //wx.request({
    //  url: '../../utils/tsconfig.json',//json数据地址
    //  headers: {
    //    'Content-Type': 'application/json'
    //  },
    //  success: function (res) {
    //    console.log('chenggong')
    //    console.log(res)
    //  }
    //});
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
