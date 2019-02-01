// pages/jobDetail/jobDetail.js
var WxParse = require('../../libs/wxParse/wxParse.js');
const app = getApp();
let id = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    that.getJobDetail(id);
  },
  getJobDetail () {
    const that = this;
    wx.request({//发送ajax
      url: app.globalUrl.jobDetail,
      method: 'GET',
      data: {
        id:id
      },
      success(res) {//请求成功，需判断是否有数据，数据是否正确
        console.log(res)
        if (res.statusCode == 200) {
          var article = res.data.content;
          WxParse.wxParse('article', 'html', article, that, 5);
        } else {

        }
      },
      fail() {//请求失败处理

      },
      complete() {}
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})