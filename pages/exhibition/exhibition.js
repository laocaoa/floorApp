// pages/exhibition/exhibition.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selfData: app.globalData.selfData,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  jumpexiList (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../exhibitionList/exhibitionList?type='+id,
    })
  }
})