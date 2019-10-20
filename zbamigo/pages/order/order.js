// pages/order/order.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q1:"",
    q2:"",
    phone:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      phone: options.phone
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toSuccess:function(){
    var that =this
    if(that.data.q1==""||that.data.q2==""){
        wx.showToast({
          title: '请填写完整',
        })
    }else{

      var json ={"q1":that.data.q1,"q2":that.data.q2,"phone":that.data.phone}
      console.log(json)
      wx.request({
        url: app.host +"upadduserinfo",
        data:json,
        success:function(res){
          console.log(res)
          if(res.data.code ==200){
   wx.navigateTo({
        url: '../success/success',
      })
          }else{
            wx.showToast({
              title: res.data.message,
            })
          }
        }
      })
   
    }
  
  },
  getq1:function(e){
    console.log(e)
    this.setData({
      q1:e.detail.value
    })
  },
  getq2:function(e){
    console.log(e)
    this.setData({
      q2: e.detail.value
    })
  }
})