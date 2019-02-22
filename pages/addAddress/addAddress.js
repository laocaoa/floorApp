// pages/addAddress/addAddress.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ifcheck:false,
    region: [],
    normalTxt:'所在地区'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.insertAddress();
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({ 
      region: e.detail.value, 
      normalTxt:"",
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2]
    });
  },
  //获取用户输入名
  writeName (e) {
    this.setData({
      username:e.detail.value,
    })
  },
  //获取用户电话
  writePhoneNumber (e) {
    this.setData({
      tel: e.detail.value,
    })
  },
  //获取详细地址
  writeAddress (e) {
    this.setData({
      address: e.detail.value,
    })
  },
  checkDefault() {
    const that = this;
    that.setData({
      ifcheck: !that.data.ifcheck
    })
  },
  saveAddress () {
    const that = this;
    let isdefalt;
    if (that.data.ifcheck) {
      isdefalt = 0
    }else{
      isdefalt = 1
    }
    console.log(isdefalt)
    that.insertAddress(isdefalt);
  },
  //新增地址接口
  insertAddress(isdefalt) {
    const that = this;
    wx.request({
      url: app.globalUrl.insertAddress,
      data: {
        userId: "abb1e7ff36b6467d854fe56ba7808a9b",
        province: that.data.province,
        city: that.data.city,
        address: that.data.district + that.data.address,
        isdefalt: isdefalt,
        username: that.data.username,
        tel: that.data.tel
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res)
        if (res.statusCode == 200&&res.data.msg=="success") {
          wx.showModal({
            title: '保存成功',
            content: '请前往收货地址查看',
            showCancel:false
          })
        }else{
          wx.showModal({
            title: '保存失败',
            content: '请稍后再试',
            showCancel: false
          })
        }
      },fail () {
        wx.showModal({
          title: '保存失败',
          content: '请稍后再试',
          showCancel: false
        })
      }
    })
  }
})