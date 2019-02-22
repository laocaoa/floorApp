// pages/store/store.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: '1',
    countdown:'',
    titleId:'1',
    cartList:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:false,    // 全选状态，默认全选
    obj:{
        name:"hello"
    },
    ifHideBtn:false,          //控制删除按钮显示隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.countTime();
    that.getStoreBanner();//获取轮播图
    that.dayCrazyShop();//获取每日疯抢
    that.recommendedYou();//为您推荐
    that.getOrderList();//获取订单
  },
  /**
   * 管理购物车事件
   */
  hideDeleteBtn () {
    const that = this;
    that.setData({
      ifHideBtn: !that.data.ifHideBtn,
    })
  },
  /**
   * 删除单个购物车事件
   */
  deleteSingle () {
    wx.showModal({
      title: '确定要删除吗？',
      confirmColor:"#E61B00",
      fail:()=>{

      },
      success (res) {
        if(res.cancel){
          console.log('取消')
        }else{
          console.log("确定")
        }
      }
    })
  },
  /**
   * tabbar切换事件
   */
  checkBar(e) {
    const that = this;
    let nowNum = e.currentTarget.dataset.num
    console.log(nowNum)
    that.setData({
      num: e.currentTarget.dataset.num
    })
    if (nowNum == 2) {
      that.showAllGoods();//获取所有商品
    } else if (nowNum == 3) {
      that.getCartList();//获取购物车列表
    } else if (nowNum == 4) {

    }
  },
  countTime() {
    var that = this;
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    var end = endDate.getTime();
    var leftTime = end - now; //时间差                              
    var h, m, s;
    if (leftTime >= 0) {
      // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      // ms = Math.floor(leftTime % 1000);
      // ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      that.setData({
        hour: h,
        minute:m,
        second:s
      })
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(that.countTime, 100);
    } else {
      console.log('已截止')
      that.setData({
        hour: '00',
        minute: '00',
        second: '00'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hasList: true,
    });
    this.getTotalPrice();
  },
  tapOrderTitle (e) {
    const that = this;
    that.setData({
      titleId: e.currentTarget.dataset.tit
    })
  },
  jumpGoodDetail (e) {
    let goodsId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goodDetail/goodDetail?goodsId=' + goodsId,
    })
  },
  jumpManageAddress () {
    wx.navigateTo({
      url: '../manageAddress/manageAddress',
    })
  },
  jumpClearCart() {
    const that = this;
    wx.setStorage({
      key: 'carList',
      data: that.data.cartList,
    })
    wx.navigateTo({
      url: '../clearCart/clearCart',
    })
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    const carId = e.currentTarget.dataset.carId;
    let carts = this.data.cartList;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      cartList: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.cartList;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      cartList: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.cartList;
    let num = Number(carts[index].carCount);
    num = num + 1;
    carts[index].carCount = num;
    this.setData({
      cartList: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    let carts = this.data.cartList;
    let num = Number(carts[index].carCount);
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].carCount = num;
    this.setData({
      cartList: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.cartList;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += Number(carts[i].carCount * carts[i].sale) + Number(carts[i].carCount *carts[i].kuaidiPrice);   // 所有价格加起来
      }
    }
    this.setData({                                
      cartList: carts,
      totalPrice: total.toFixed(2)
    });
  },
  //获取商城轮播图
  getStoreBanner () {
    const that = this;
    wx.request({
      url: app.globalUrl.storeBannerImg,
      method:'GET',
      success (res) {
        if (res.statusCode == 200) {
          that.setData({
            bannerList:res.data.data.list
          })
        }
      }
    })
  },
  //获取每日疯抢
  dayCrazyShop () {
    const that = this;
    wx.request({
      url: app.globalUrl.dayCrazyShop,
      method: 'GET',
      success (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            crazyList:res.data.data.list
          })
        }
      }
    })
  },
  //获取为您推荐
  recommendedYou () {
    const that = this;
    wx.request({
      url: app.globalUrl.recommendedYou,
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            recommendList: res.data.data.list
          })
        }
      }
    })
  },
  //获取全部商品
  showAllGoods () {
    const that = this;
    wx.request({
      url: app.globalUrl.showAllGoods,
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            allGoods: res.data.data.list
          })
        }
      }
    })
  },
  //添加购物车事件
  addCart (e) {
    console.log(e.currentTarget.dataset.id)
    let goodId = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalUrl.addCart,
      data: {
        userId: "abb1e7ff36b6467d854fe56ba7808a9b",
        goodsId: goodId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success (res) {
        console.log(res)
        if (res.statusCode == 200&&res.data.data.msg == "添加成功") {
          wx.showModal({
            title: '加入成功',
            content: '您的宝贝在购物车等您哦~',
            showCancel:false
          })
        }
      }
    })
  },
  //获取购物车列表
  getCartList () {
    const that = this;
    wx.request({
      url: app.globalUrl.cartList,
      data:{
        userId: 'abb1e7ff36b6467d854fe56ba7808a9b'
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            cartList: res.data.data.list
          })
          for (var i = 0; i < that.data.cartList.length;i++) {
            that.data.cartList[i].selected = false
          }
          console.log(that.data.cartList)
        }
      }
    })
  },
  //获取用户订单
  getOrderList () {
    const that = this;
    wx.request({
      url: app.globalUrl.getOrderList,
      data: {
        userId: 'abb1e7ff36b6467d854fe56ba7808a9b'
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            orderList: res.data.data.list
          })
          // for (var i = 0; i < that.data.cartList.length; i++) {
          //   that.data.cartList[i].selected = false
          // }
          // console.log(that.data.cartList)
        }
      }
    })
  }
})