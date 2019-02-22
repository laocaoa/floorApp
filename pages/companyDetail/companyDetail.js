// pages/companyDetail/companyDetail.js
const app = getApp();
var WxParse = require('../../libs/wxParse/wxParse.js');
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:'1',
    emptyImg:false,
    emptyImg1:false,
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let id = options.id;
    that.getMesage(id);
    qqmapsdk = new QQMapWX({
      key: 'DSNBZ-JJMC5-H5OII-QI6R6-S3DT2-AIFUG'
    });
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
          that.getAddress();
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
    
  },
  getAddress () {
    var that = this;
    var address = that.data.address != '' && that.data.address.length >= 4  ? that.data.address:'北京市天安门广场'
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: address, //地址参数
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        that.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          markers: [{
            id: 'map',
            // title: res.title,
            latitude: latitude,
            longitude: longitude,
            iconPath: '../../images/lx_address@2x.png',//图标路径
            width: 23,
            height: 30,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'NONE'
            }
          }],
          poi: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    title:'最专业的地坪平台!'
  }
})