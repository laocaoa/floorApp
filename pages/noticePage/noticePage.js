// pages/noticePage/noticePage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleWord:"评价成功",
    titleContent:"您的评价已提交"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //返回首页
  backIndex () {
    wx.redirectTo({
      url: '../store/store',
    })
  },
  //查看订单
  checkOrder () {
    wx.redirectTo({
      url: '../store/store',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})