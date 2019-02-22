// pages/clearCart/clearCart.js
const app = getApp();
let cartArr = [];
let argumentsData = {};
let carId = '';
let isBuyNow;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showCover:false,         //控制付款层显示隐藏
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    obj: {
      name: "hello"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    isBuyNow = options.isBuyNow;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    cartArr = [];
    wx.getStorage({
      key: 'carList',
      success: function(res) {
        console.log(res)
        console.log(isBuyNow)
        if (isBuyNow == 1) {
          for (var i = 0; i < 1; i++) {
            if (res.data[i].selected) {
              cartArr.push(res.data[i])
            }
          }
        }else{
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].selected) {
              cartArr.push(res.data[i])
            }
          }
        }
        that.setData({
          carts: cartArr
        },function () {
          that.getTotalPrice();
        })
      },
    })
    this.setData({
      hasList: true,
    });
  },
  jumpManageAddress () {
    wx.navigateTo({
      url: '../manageAddress/manageAddress',
    })
  },
  //付款弹层显示
  openCover () {
    const that = this;
    let goodsVos = [];
    let carIds = [];
    argumentsData.userId = "abb1e7ff36b6467d854fe56ba7808a9b";
    argumentsData.username = "习惯近身平A";
    argumentsData.address = "吉林省长春市朝阳区南湖街道远创国际A座802室";
    argumentsData.tel = "13596830654";
    console.log(isBuyNow)
    if (isBuyNow == 1) {//是立即购买
      argumentsData.goodsVos = [];
      for (var i = 0; i < 1; i++) {
        argumentsData.goodsVos[i] = {};
        argumentsData.goodsVos[i].goodsId = that.data.carts[i].goodsId
        argumentsData.goodsVos[i].goodsNum = that.data.carts[i].carCount
        argumentsData.goodsVos[i].carIds = that.data.carts[i].id
        if (that.data.carts[i].goodsHot == 0) {
          argumentsData.goodsVos[i].price = that.data.carts[i].price
        } else {
          argumentsData.goodsVos[i].price = that.data.carts[i].sale
        }
      }
    }else{//购物车
      argumentsData.carIds = [];
      for (var i = 0; i < that.data.carts.length; i++) {
        if (that.data.carts[i].selected) {
          argumentsData.carIds.push(that.data.carts[i].id)
        }
      }
    }
    console.log(JSON.stringify(argumentsData))
    that.setData({
      showCover:true
    })
    that.addOrder();
  },
  closeCover () {
    const that = this;
    that.setData({
      showCover: false
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      total += Number(carts[i].carCount * carts[i].sale) + Number(carts[i].carCount *carts[i].kuaidiPrice);   // 所有价格加起来
    }
    this.setData({
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  addOrder () {
    const that = this;
    wx.request({
      url: app.globalUrl.addOrder,
      data: {
        data: JSON.stringify(argumentsData),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        console.log(res)
      }
    })
  },
})