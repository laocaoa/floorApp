// pages/search/search.js
const app = getApp();
let canSearch = false;
let history = [];
let iptValue = '';
Page({
  data: {
    buttonText:"取消",
    historyList:[],
    hotSearchList: [],
    autoFocus: true,
    iptval: ''
  },
  onLoad: function (options) {

  },
  writeIn (e) {//监听输入框输入
    const that = this;
    const reg = /^[^\s]*$/;
    if (e.detail.value.length == 0){
      that.setData({
        buttonText: '取消'
      })
    }else{
      that.setData({
        buttonText: '搜索'
      })
    }
    if(e.detail.value != ''){
      if (!reg.test(e.detail.value)) {
        canSearch = false;
      }else{
        canSearch = true;
      }
    }
    iptValue = e.detail.value;
  },
  deleteHistory () {//删除搜索历史
    const that = this;
    if (that.data.historyList == '') {//有问题，判断数组长度无效
      wx.showToast({
        title: '没有可删除的历史',
        icon:'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要删除历史？',
        success(res) {
          if (res.confirm) {
            that.setData({
              historyList: []
            })
            wx.removeStorage({
              key: 'history',
              success: function (res) {
                console.log('清空storage')
              },
            })
          }
        }
      })
    }
  },
  jumpToPage () {//点击搜索
    const that = this;
    if (that.data.buttonText =='取消'){
      wx.navigateBack();
    }else{
      if (canSearch) {
        that.searchData(iptValue)
        console.log('跳转下一页')
        if(history.length >= 5){
          history.unshift(iptValue);
          history.splice(4,1);
          wx.setStorage({
            key: 'history',
            data: history,
          })
        }else{
          history.unshift(iptValue)
          wx.setStorage({
            key: 'history',
            data: history,
          })
        }    
        // wx.navigateTo({
        //   url: '../companyDetail/companyDetail',
        // }) 
      }else{
        console.log('提示输入非法，不跳转页面')
        wx.showToast({
          title: '请不要输入空格',
          icon:'none'
        })
      }
    }
  },
  searchData(name) {
    const that = this;
    wx.request({
      url: app.globalUrl.exhibitionList,
      method: 'GET',
      data: {
        name: name,
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.page.rows.length == 0) {
            wx.showToast({
              title: '搜索不到该商家',
              icon: 'none'
            })
          } else {
            //取第一项的id
            let id = res.data.page.rows[0].id
            wx.navigateTo({
              url: '../companyDetail/companyDetail?id='+id,
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    history = [];
    canSearch = false;
    wx.getStorage({
      key: 'history',
      success: function(res) {
        history = res.data;
        that.setData({
          historyList: res.data
        })
      }
    })
    // that.setData({
    //   historyList: wx.getStorageSync('history') || []
    // })
    wx.request({
      url: app.globalUrl.hotSearch,
      method:'GET',
      success (res) {
        console.log(res)
        if(res.statusCode == 200){
          if(res.data.data.length == 0){
            console.log('无数据返回')
          }else{
            that.setData({
              hotSearchList: res.data.data
            })
          }
        }else{
          console.log('无数据返回')
        }
      },
      fail () {
        console.log('请求失败')
      }
    })
  },
  checkHistory (e) {//点击任意搜索历史
    const that = this;
    let name = e.currentTarget.dataset.content
    console.log(e.currentTarget.dataset.content)
    that.searchData(name)
  }
})