// pages/starGrade/starGrade.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCheck:0,
    starArr:[1,2,3,4,5],
    ifHideName:false,
    evaluate:'',
    starNumber:"",
    content:"",
    maxNumber:"200",
    nowNumber:"0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  checkStraNumber (e) {
    const that = this;
    that.setData({
      isCheck:e.currentTarget.dataset.id,
    })
    if (e.currentTarget.dataset.id == 1) {
      that.setData({
        evaluate: "质量一般",
        starNumber:'1'
      })
    }
    else if (e.currentTarget.dataset.id == 2) {
      that.setData({
        evaluate:"质量一般",
        starNumber: '2'
      })
    } else if (e.currentTarget.dataset.id == 3) {
      that.setData({
        evaluate: "中规中矩",
        starNumber: '3'
      })
    } else if (e.currentTarget.dataset.id == 4) {
      that.setData({
        evaluate: "值得购买",
        starNumber: '4'
      })
    } else if (e.currentTarget.dataset.id == 5) {
      that.setData({
        evaluate: "非常满意",
        starNumber: '5'
      })
    }
  },
  writeEvalute (e) {
    this.setData({
      content: e.detail.value,
      nowNumber: e.detail.cursor,
    })
  },
  hideName (e) {
    const that = this;
    that.setData({
      ifHideName: !that.data.ifHideName
    })
  },
  submitEvalute () {
    const that = this;
    let isAnonym;
    if (that.data.ifHideName) {//匿名
      isAnonym = 0
    }else{
      isAnonym = 1
    }
    console.log(isAnonym)
    console.log(that.data.content)
    console.log(that.data.starNumber)
    that.pingjiaGoods(isAnonym);
  },
  pingjiaGoods(isAnonym) {
    const that = this;
    wx.request({
      url: app.globalUrl.pingjiaGoods,
      data:{
        goodsId:"1",
        userId:"abb1e7ff36b6467d854fe56ba7808a9b",
        content:that.data.content,
        star: that.data.starNumber,
        isAnonym: isAnonym,    //是否匿名（0：匿名 1：不匿名）
      },
      method: 'GET',
      success(res) {
        console.log(res)
        if (res.statusCode == 200 && res.data.msg == "success") {
          wx.redirectTo({
            url: '../noticePage/noticePage',
          })
        } else {
          wx.showModal({
            title: '发表失败',
            content: '请稍后再试',
            showCancel: false
          })
        }
      }, fail() {
        wx.showModal({
          title: '发表失败',
          content: '请稍后再试',
          showCancel: false
        })
      }
    })
  }
})