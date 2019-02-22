// pages/projectDetail/projectDetail.js
const app = getApp();
var WxParse = require('../../libs/wxParse/wxParse.js');
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
    const that = this;
    let id = options.id
    if(options.type == 3){
      that.setData({
        name:"工程展示"
      })
      that.getMessage(id)
    }else{
      that.setData({
        name: "产品展示"
      })
      that.getMesage(id)
    }
    
  },
  getMesage(id) {
    const that = this;
    wx.request({
      url: app.globalUrl.projectDetail,
      method: 'GET',
      data: {
        productId: id
      },
      success(res) {
        console.log(res)
        that.setData({
          img_url: res.data.product.img_url
        })
        var article = res.data.product.details;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
  },
  getMessage(id) {
    const that = this;
    wx.request({
      url: app.globalUrl.projectDetail,
      method: 'GET',
      data: {
        productId: id
      },
      success(res) {
        that.setData({
          img_url: res.data.sysCase.img_url
        })
        var article = res.data.sysCase.details;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})