// pages/addAddress/addAddress.js
const app = getApp();
let messageContent = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ifcheck: false,
    region: [],
    // normalprovince: '吉林省',
    // normalCity:"白山市",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    messageContent = JSON.parse(options.content);
    this.setData({
      normalprovince: messageContent.province,
      normalCity: messageContent.city,
      province: messageContent.province,
      city: messageContent.city,
      address: messageContent.address,
      username: messageContent.username,
      tel: messageContent.tel,
      id: messageContent.id,
      ifcheck: !!Number(messageContent.isdefalt)
    })
    console.log(this.data.ifcheck)
  },
  onShow: function () {
 
  },
  // 选择省市区函数
  changeRegin(e) {
    this.setData({
      normalprovince:"",
      normalCity: "",
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2]
    });
  },
  //获取用户输入名
  writeName(e) {
    this.setData({
      username: e.detail.value,
    })
  },
  //获取用户电话
  writePhoneNumber(e) {
    this.setData({
      tel: e.detail.value,
    })
  },
  //获取详细地址
  writeAddress(e) {
    this.setData({
      address: e.detail.value,
    })
  },
  //是否默认
  checkDefault() {
    const that = this;
    that.setData({
      ifcheck: !that.data.ifcheck
    })
  },
  //保存修改
  saveAddress() {
    const that = this;
    let isdefalt;
    if (that.data.ifcheck) {
      isdefalt = 1
    } else {
      isdefalt = 0
    }
    console.log(isdefalt)
    that.updateAddress(isdefalt);
  },
  //修改地址接口
  updateAddress(isdefalt) {
    const that = this;
    wx.request({
      url: app.globalUrl.updateAddress,
      data: {
        id:that.data.id,
        userId: "abb1e7ff36b6467d854fe56ba7808a9b",
        province: that.data.province,
        city: that.data.city,
        address: that.data.address,
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
        if (res.statusCode == 200 && res.data.msg == "success") {
          wx.showModal({
            title: '修改成功',
            content: '请前往收货地址查看',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '修改失败',
            content: '请稍后再试',
            showCancel: false
          })
        }
      }, fail() {
        wx.showModal({
          title: '修改失败',
          content: '请稍后再试',
          showCancel: false
        })
      }
    })
  },
  //删除地址
  deleteAddress () {
    const that = this;
    console.log(111111111111111111111)
    wx.request({
      url: app.globalUrl.deleteAddress,
      data: {
        id: that.data.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.msg == "success") {
          wx.showModal({
            title: '删除成功',
            content: '请前往收货地址查看',
            showCancel: false
          })
        } else {
          wx.showModal({
            title: '删除失败',
            content: '请稍后再试',
            showCancel: false
          })
        }
      }, fail() {
        wx.showModal({
          title: '删除失败',
          content: '请稍后再试',
          showCancel: false
        })
      }
    })
  }
})