// pages/evaluate/evaluate.js
const app = getApp();
let currentPage = 0;
let goodsId;
let star;
let pingjiaArr = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lang:1,
    starNumber:4,
    isCheck: 6
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.goodsId;
    // star = '';
  },
  check (e) {
    const that = this;
    currentPage = 0;
    pingjiaArr = [];
    that.setData({
      pingjiaList:[]
    })
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == 6) {
      star = "";
    }else{
      star = e.currentTarget.dataset.id;
    }
    that.setData({
      isCheck:e.currentTarget.dataset.id,
    },function(){
      that.getGoodsPingJia(goodsId, currentPage, star);
    })
  },
  getGoodsPingJiaOnload(goodsId) {
    const that = this;
    wx.request({
      url: app.globalUrl.goodsPingJia,
      data: {
        goodsId: goodsId,
        total: 0,
        count: 5,
        star: ""
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          for (var i = 0; i < res.data.data.pingjiaList.length; i++) {
            res.data.data.pingjiaList[i].createDate = res.data.data.pingjiaList[i].createDate.substr(0, res.data.data.pingjiaList[i].createDate.length - 10);
            res.data.data.pingjiaList[i].star = Number(res.data.data.pingjiaList[i].star);
            pingjiaArr.push(res.data.data.pingjiaList[i])
          }
          that.setData({
            pingjiaList: pingjiaArr,
            pingjiaSize: res.data.data.pingjiaSize,
            fiveStar: res.data.data.fiveStar,
            fourStar: res.data.data.fourStar,
            threeStar: res.data.data.threeStar,
            twoStar: res.data.data.twoStar,
            oneStar: res.data.data.oneStar
          }, function () {
            wx.hideLoading();
          })
        }
      }
    })
  },
  getGoodsPingJia(goodsId, currentPage, star) {
    const that = this;
    wx.request({
      url: app.globalUrl.goodsPingJia,
      data:{
        goodsId: goodsId,
        total: currentPage,
        count:5,
        star: star
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          for (var i = 0; i < res.data.data.pingjiaList.length; i++) {
            res.data.data.pingjiaList[i].createDate = res.data.data.pingjiaList[i].createDate.substr(0, res.data.data.pingjiaList[i].createDate.length - 10);
            res.data.data.pingjiaList[i].star = Number(res.data.data.pingjiaList[i].star);
            pingjiaArr.push(res.data.data.pingjiaList[i])
          }
          that.setData({
            pingjiaList: pingjiaArr,
          }, function () {
            wx.hideLoading();
          })
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
  buyNow() {
    wx.navigateTo({
      url: '../clearCart/clearCart?isBuyNow=' + 1,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    currentPage = 0;
    pingjiaArr = [];
    star = '';
    that.setData({
      pingjiaList: []
    })
    that.getGoodsPingJiaOnload(goodsId);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;
    console.log("上拉加载")
    currentPage++
    wx.showLoading({
      title: '玩命加载中',
      complete() {
        setTimeout(function () {
          that.getGoodsPingJia(goodsId, currentPage, star);
        }, 500)
      }
    })
  }
})