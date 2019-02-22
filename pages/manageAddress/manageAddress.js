// pages/manageAddress/manageAddress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNormal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取我的收货地址
  getMyAddress () {
    const that = this;
    wx.request({
      url: app.globalUrl.myAddress,
      data:{
        id:"abb1e7ff36b6467d854fe56ba7808a9b"
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            addressList:res.data.data.list
          })
        }
      }
    })
  },
  jumpEditAddress (e) {
    console.log(e.currentTarget.dataset.content)
    let content = JSON.stringify(e.currentTarget.dataset.content)
    wx.navigateTo({
      url: '../editAddress/editAddress?content=' + content,
    })
  },
  jumpAddAddress () {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  choseAddress (e) {
    const that = this;
    console.log(e.currentTarget.dataset.id)
    that.setData({
      isNormal: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMyAddress();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})