// pages/companyDetail/companyDetail.js
const app = getApp();
var WxParse = require('../../libs/wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:'1',
    emptyImg:false,
    emptyImg1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let id = options.id;
    that.getMesage(id);
  },
  getMesage(id) {
    const that = this;
    wx.request({
      url: app.globalUrl.companyContent,
      method: 'GET',
      data: {
        id: id
      },
      success(res) {
        console.log(res)
        if (res.data.data.productList.length == 0){
          that.setData({
            emptyImg:true
          })
        }
        if (res.data.data.sysCaseList == 0){
          that.setData({
            emptyImg1: true
          })
        }
        that.setData({
          bannerList: res.data.data.bannerList,
          business_name: res.data.data.business.business_name,
          describe: res.data.data.business.describe,
          productList: res.data.data.productList,
          sysCaseList: res.data.data.sysCaseList,
          phone: res.data.data.business.business_telephone,
          email: res.data.data.business.business_email,
          address: res.data.data.business.business_address
        }, function () {
          var abstract = res.data.data.business.describe;
          WxParse.wxParse('abstract', 'html', abstract, that, 5);
        })
      },fail () {
        //请求失败处理
      }
    })
  },
  callCompany() {
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  },
  routerDetail(e){
    const that = this;
    let type = that.data.num
    let id = e.currentTarget.dataset.id
    console.log(type)
    wx.navigateTo({
      url: '../projectDetail/projectDetail?id='+id + '&type='+type,
    })
  },
  checkBar (e) {
    const that = this;
    that.setData({
      num:e.currentTarget.dataset.num
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.getLocation({//获取当前经纬度
    //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
    //   success: function (res) {
    //     wx.openLocation({//​使用微信内置地图查看位置。
    //       latitude: 22.5542080000,//要去的纬度-地址
    //       longitude: 113.8878770000,//要去的经度-地址
    //       name: "宝安中心A地铁口",
    //       address: '宝安中心A地铁口'
    //     })
    //   }
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    title:'最专业的地坪平台!'
  }
})