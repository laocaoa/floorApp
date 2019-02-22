//index.js
//获取应用实例
const app = getApp();
let currentNum = 1;
let listArr = [];
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selfData: app.globalData.selfData,
    companyList:[],
    swiperList:[],
    offlineImg: true,
    liveList:[],
    iconsItemList: app.globalData.indexItem
  },
  onShow(){
    const that = this;
    currentNum = 1;
    listArr = [];
    that.setData({
      companyList: [],
    })
    that.getBannerList();
    that.getCompanyList(currentNum);
    // this.getLiveMessage();
  },
  //事件处理函数
  jumpToList (e) {//跳转展厅列表页
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../exhibitionList/exhibitionList?type=' + id,
    })
  },

  jump (e) {
    let iconsId = e.currentTarget.dataset.id;
    switch (iconsId) {
      case 0:
        wx.navigateTo({
          url: '../exhibition/exhibition',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../store/store',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../job/job',
        })
        break;
      default:
        wx.showToast({
          title: '敬请期待',
          icon: 'none'
        })
    } 
  },
  searchCompany () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getCompanyList (currentNum) {//获取公司列表
    const that = this;
    wx.request({
      url: app.globalUrl.exhibitionList,
      data:{
        current: currentNum,
      },
      method:'GET',
      complete(res){
        if(res.data != '' && res.statusCode == 200 && res.data.page.rows.length != 0){
          for (var i = 0; i < res.data.page.rows.length;i++){
            listArr.push(res.data.page.rows[i])
          }
          that.setData({
            companyList: listArr
          },function(){
            wx.hideLoading();
          })
        }else{
          //无数据处理
          wx.hideLoading();
          wx.showToast({
            title: '暂无更多数据',
            icon:'none'
          })
        }
      }
    })
  },
  getBannerList () {//获取首页轮播图
    const that = this;
    wx.request({
      url: app.globalUrl.bannerList,
      method: 'GET',
      success (res) {
        if(res.statusCode == 200){
          if(res.data.length != 0){
            that.setData({
              swiperList: res.data,
              offlineImg: false
            })
          }else{
            // that.setData({
            //   offlineImg: true
            // })
          }
        }else{
          //请求成功但是无返回数据
          // that.setData({
          //   offlineImg: true
          // })
        }
      },
      fail () {
        console.log('请求失败')
        // that.setData({
        //   offlineImg: true
        // })
      },
      complete(res){
        // console.log(res)
      }
    })
  },
  jumpCompanyDe (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../companyDetail/companyDetail?id='+id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    title: '最专业的地坪平台!'
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    const that = this;
    console.log("上拉")
    currentNum++
    wx.showLoading({
      title: '玩命加载中',
      complete() {
        setTimeout(function () {
          that.getCompanyList(currentNum);
        }, 500)
      }
    })
  }
  // getLiveMessage() {//获取直播信息
  //   const that = this;
  //   wx.request({
  //     url: app.globalUrl.liveMessage,
  //     method: 'GET',
  //     success(res) {
  //       console.log(res)
  //       if (res.statusCode == 200) {
  //         if (res.data.rows.length != 0) {
  //           that.setData({
  //             liveList: res.data.rows
  //           })
  //         } else {
  //           //暂无数据
  //         }
  //       } else {
  //         //请求成功但是无返回数据
  //       }
  //     },
  //     fail() {
  //       console.log('请求失败')
  //     },
  //     complete(res) {
  //       console.log(res)
  //     }
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // }
})
