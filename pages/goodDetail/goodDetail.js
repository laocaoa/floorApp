// pages/goodDetail/goodDetail.js
const app = getApp();
var WxParse = require('../../libs/wxParse/wxParse.js');
let goodsId;
let carList = [];
let obj = {};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0,
    hidetab:false,
    toView:'good',
    isActive: ''
  },
  //轮播图的切换事件  
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current   //获取当前轮播图片的下标
    })
  },
  //获取页面滚动高度
  bindscroll (e) {
    const that = this;
    // console.log(e.detail.scrollTop)
    let scrollTop = e.detail.scrollTop;
    if (scrollTop >= 300) {
      that.setData({
        hidetab: true
      })
    } else if (scrollTop <= 300) {
      that.setData({
        hidetab: false
      })
    }
    if (scrollTop >= 300<=600){
      that.setData({
        isActive: 2
      })
    }
    if (scrollTop > 600) {
      that.setData({
        isActive: 3
      })
    }
  },
  scrollToGood () {
    const that = this;
    that.setData({
      toView:'good',
      isActive:1
    })
  },
  scrollToEvaluate () {
    const that = this;
    that.setData({
      toView: 'evaluate',
      isActive: 2
    })
  },
  scrollToDetail () {
    const that = this;
    that.setData({
      toView: 'detail',
      isActive: 3
    })
  },
  //跳转所有评论
  jumpEvaluate () {
    wx.navigateTo({
      url: '../evaluate/evaluate?goodsId=' + goodsId,
    })
  },
  //获取商品详情
  getGoodsDetail(goodsId) {
    const that = this;
    wx.request({
      url: app.globalUrl.storeGoodsDetail,
      method: 'GET',
      data:{
        goodsId: goodsId
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          let data = res.data.data
          if (data.goodsHot == 0) {
            that.setData({
              showPrice:data.price
            })
          }else{
            that.setData({
              showPrice: data.sale
            })
          }
          obj.image = data.banner[0].img;
          obj.goodsName = data.name;
          obj.goodsHot = data.goodsHot;
          obj.carCount = 1;
          obj.price = data.price;
          obj.sale = data.sale;
          obj.goodsId = goodsId;
          obj.selected = true;
          obj.id = "";
          obj.kuaidiPrice = data.kuaidiPrice;
          that.setData({
            bannerList: data.banner,
            pingjiaList: data.pingjiaList,
            kuaidi: data.kuaidiPrice,
            goodName: data.name,
            xiaoliang: data.salesVolume,
            kucun: data.repertory,
            position: data.position,
            talkSize:data.pingjiaSize
          })
          carList.push(obj)
          var abstract = res.data.data.detail;
          WxParse.wxParse('abstract', 'html', abstract, that, 5);
        }
      }
    })
  },
  //加入购物车
  addCart(e) {
    wx.request({
      url: app.globalUrl.addCart,
      data: {
        userId: "abb1e7ff36b6467d854fe56ba7808a9b",
        goodsId: goodsId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.data.msg == "添加成功") {
          wx.showModal({
            title: '加入成功',
            content: '您的宝贝在购物车等您哦~',
            showCancel: false
          })
        }
      }
    })
  },
  //立即购买
  buyNow () {
    // wx.setStorage({
    //   key: 'carList',
    //   data: carList,
    // })
    wx.navigateTo({
      url: '../clearCart/clearCart?isBuyNow=' + 1,
    })
    console.log(carList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.goodsId
    // this.getGoodsDetail(goodsId);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    carList = [];
    obj = {};
    that.getGoodsDetail(goodsId)
  },
  onUnload : function () {
    console.log(1111)
    wx.setStorage({
      key: 'carList',
      data: carList,
    })
  },
  onHide: function () {
    console.log(222)
    wx.setStorage({
      key: 'carList',
      data: carList,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})