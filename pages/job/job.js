// pages/job/job.js
const app = getApp();
let leftCurrent = 1;//企业招聘页数
let rightCurrent = 1;//施工队招聘页数
let messageArr = [];//接收数据数组
Page({
  // 页面初始数据
  data: {
    checkNumber:0,//企业招聘or施工队招聘,默认为企业招聘
    jobMessage:[],
    showImg:false,
    showTips:false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    const that = this;
    messageArr = [];
    leftCurrent = 1;
    rightCurrent = 1;
    that.getJobMessage(1, that.data.checkNumber);
  },
  // 获取招聘信息
  getJobMessage(current,flag){
    const that = this;
    wx.request({//发送ajax
      url: app.globalUrl.jobList,
      method: 'GET',
      data: {
        current: current,
        flag: flag,
        rowCount: 10
      },
      success (res) {//请求成功，需判断是否有数据，数据是否正确
      console.log(res)
        if(res.statusCode == 200){
          if(res.data.rows.length == 0){//判断返回的数组是否为空
            if(current ==1 ){//判断是否为当前项第一页
              that.setData({
                showImg: true,
              })
            }else{
              that.setData({
                showTips: true,
              })
            }
          }else{
            for (let i = 0; i < res.data.rows.length; i++) {
              messageArr.push(res.data.rows[i])
            }
            that.setData({
              jobMessage: messageArr,
              showImg: false,
              showTips: false
            })
          }
        }else{
          if(current ==1 ){//如果是当前项第一页就显示暂无数据图片
            that.setData({
              showImg: true,
            })
          }else{//如果不是当前项第一页提示暂无数据
            that.setData({
              showTips: true,
            })
          }
        }
      },
      fail () {//请求失败处理
        if(current == 1){
          that.setData({
            showImg: true,
          })
        }else{
          that.setData({
            showTips: true,
          })
        }
      },
      complete(){
        wx.hideLoading();//关闭上拉提示
        wx.stopPullDownRefresh()//关闭下拉刷新
      }
    })
  },
  // 点击切换tab选项
  checkOne (e) {
    const that = this;
    messageArr = [];
    leftCurrent = 1;
    that.setData({
      checkNumber:e.currentTarget.dataset.id
    },function(){
      that.getJobMessage(leftCurrent,that.data.checkNumber)
    })
  },
  // 点击切换tab选项
  checkTwo(e) {
    const that = this;
    messageArr = [];
    rightCurrent = 1;
    that.setData({
      checkNumber:e.currentTarget.dataset.id
    },function(){
      that.getJobMessage(rightCurrent, that.data.checkNumber)
    })
  },
  // 跳转详情页面
  jumpDetail (e) {
    let id = e.currentTarget.dataset.id;//获取自定义属性
    console.log(id)
    wx.navigateTo({
      url: '../jobDetail/jobDetail?id='+ id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    const that = this;
    leftCurrent = 1;
    rightCurrent = 1;
    messageArr = [];
    console.log("下拉")
    setTimeout(()=>{
      that.getJobMessage(1, that.data.checkNumber);
    },700)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    console.log("上拉")
    const that = this;
    if(that.data.checkNumber==0){
      leftCurrent++
      wx.showLoading({
        title: '玩命加载中',
        complete(){
          setTimeout(()=>{
            that.getJobMessage(leftCurrent, that.data.checkNumber);
          },700)
        }
      })
    }else{
      rightCurrent++
      wx.showLoading({
        title: '玩命加载中',
        complete() {
          setTimeout(()=> {
            that.getJobMessage(rightCurrent, that.data.checkNumber);
          }, 700)
        }
      })
    }
  }
})