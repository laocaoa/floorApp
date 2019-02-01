// pages/exhibitionList/exhibitionList.js
const app = getApp();//引入appjs内容
let current = 1;
let replaceList = [];//过渡容器
let business_type;//类型 参数
let userPut = ''
Page({
  data: {
    wxhibitionList:[],
    showImg:false,
  },
  onLoad (options) {
    business_type = options.type
    if (business_type == 1){
      wx.setNavigationBarTitle({
        title: '户外地坪'
      })
    } else if (business_type == 2) {
      wx.setNavigationBarTitle({
        title: '机械设备'
      })
    } else if (business_type == 3) {
      wx.setNavigationBarTitle({
        title: '原料商场'
      })
    } else if (business_type == 4) {
      wx.setNavigationBarTitle({
        title: '医疗系统'
      })
    }else if(business_type == 5){
      wx.setNavigationBarTitle({
        title: '教育系统'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getListData(1,'');
    replaceList = [];
    this.setData({
      wxhibitionList: [],
    })
  },

  getListData(current,name){
    const that = this;
    wx.request({
      url: app.globalUrl.exhibitionList,
      method: 'GET',
      data: {
        current: current,
        name:name,
        businessType: business_type
      },
      success (res) {
        console.log(res)
        if(res.statusCode == 200) {
          if(res.data.page.rows.length==0){
            if(current == 1){
              that.setData({
                showImg: true
              })
            }
          }else{
            for (var i = 0; i < res.data.page.rows.length; i++) {
              console.log(res.data.page.rows[i])
              replaceList.push(res.data.page.rows[i])
            }
            that.setData({
              showImg: false,
              wxhibitionList: replaceList,
            })
          }
        }else{
          if(current == 1){
            that.setData({
              showImg: true
            })
          }else{

          }
        }
      },
      fail () {
        if (current == 1) {
          that.setData({
            showImg: true
          })
        }else{
          console.lgo("请求失败")
        }
      },
      complete(res) {
        wx.hideLoading();
      }
    })
  },
  routerJump (e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    app.companyId = id;
    // wx.switchTab({
    //   url: '../abstract/abstract',
    // })
    wx.navigateTo({
      url: '../companyDetail/companyDetail?id='+id,
    })
  },

  getInputVal (e) {//获取input输入值
    userPut = e.detail.value;
  },
  searchData (current,name) {
    const that = this;
    wx.request({
      url: app.globalUrl.exhibitionList,
      method: 'GET',
      data: {
        current: current,
        name: name,
        businessType: business_type
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.page.rows.length == 0) {
            wx.showToast({
              title: '搜索不到该商家',
              icon:'none'
            })
          } else {
            replaceList = [];
            for (var i = 0; i < res.data.page.rows.length; i++) {
              console.log(res.data.page.rows[i])
              replaceList.push(res.data.page.rows[i])
            }
            that.setData({
              wxhibitionList: replaceList,
            })
          }
        } else {
          //请求失败
          wx.showToast({
            title: '搜索不到该商家',
            icon: 'none'
          })
        }
      },
      fail() {
        wx.showToast({
          title: '搜索不到该商家',
          icon: 'none'
        })
      },
      complete(res) {
        // wx.hideLoading();
      }
    })
  },
  searchCompany () {//点击搜索公司
    const that = this;
    that.searchData(1,userPut);
  },
  //页面相关事件处理函数--监听用户下拉动作

  onPullDownRefresh: function () {
    console.log("下拉")
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    const that =this;
    console.log("上拉")
    current++
    wx.showLoading({
      title: '玩命加载中',
      complete() {
        setTimeout(function () {
          that.getListData(current);
        }, 700)
      }
    })
  }
})