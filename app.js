//app.js
const url = 'https://shrenjun.com';
// const url = 'http://192.168.31.179:8080'
App({
  // onLaunch: function () {
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // console.log(res)
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })    
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  globalUrl:{
    jobList: url + '/job/queryJobPaging',//获取招聘列表
    exhibitionList: url + '/app/gosj',//获取公司列表
    bannerList: url + '/picture/getPicture',//获取首页轮播图
    hotSearch: url + '/app/getSearchHot',//获取热门搜索
    liveMessage: url + '/broadcast/broadcastConduct',//获取直播信息
    companyContent: url + '/app/wxgogsjj',//展厅简介
    projectDetail: url + '/app/wxproductDetails',//获取展厅详情
    jobDetail: url + '/job/wxqueryJobDetail'//获取工作详情
  },
  globalData: {
    userInfo: null,
    selfData: [
      { imgUrl: '../../images/gongye.png', title: '工业地坪' },
      { imgUrl: '../../images/huwai.png', title: '户外地坪' },
      { imgUrl: '../../images/jixie.png', title: '机械设备' },
      { imgUrl: '../../images/yuanliao.png', title: '原料商场' },
      { imgUrl: '../../images/yiliao.png', title: '医疗系统' },
      { imgUrl: '../../images/jiaoyu.png', title: '教育系统' }
    ],
    indexItem: [
      { imgUrl: '../../images/zhanting.png', title: '展厅', id:0 },
      // { imgUrl: '../../images/bianlidian.png', title: '便利店', id:1 },
      { imgUrl: '../../images/zhaopin.png', title: '招聘', id:2 },
      // { imgUrl: '../../images/live.png', title: '直播', id:3 }
    ]
  },
  companyId:null
})