// pages/home/home.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../images/banner.jpg',
      '../images/banner.jpg',
      '../images/banner.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    array: ["未选择", "1个月", "2个月", "3个月", "4个月", "5个月"],
    age: "未选择",
    showphone: false,
    name:"",
    phone:"",
    code :"",
    encryptedData:"",
    iv:"",
    uid:"",
    agelist :[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.uid)
    if (options.uid!=undefined){
        this.setData({
          uid: options.uid
        })

    }else{
      this.setData({
        uid:"admin"
      })
    }
  
    // if (options.uid) {
    //   let scene = decodeURIComponent(options.scene);
    //   //&是我们定义的参数链接方式
    //   let userId = scene.split("&")[0];
    //   let recommendId = scene.split('&')[1];
    //   //其他逻辑处理。。。。。
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.getAge()

    wx.login({
      success: function (res) {
        console.log(res)
        that.setData({
          code: res.code
        })
        // console.log("res", res)
        // var json = { "iv": iv, "encryptedData": encryptedData, "code": res.code }
        // wx.request({
        //   url: app.host + "getWechatUserPhone",
        //   data: json,
        //   success: function (res) {
        //     console.log(res)
        //   }
        // })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      age: this.data.array[e.detail.value]
    })
  },
  getPhoneNumber: function(e) {
    var that = this
    console.log("that.data.name", that.data.name)
    console.log("that.data.age", that.data.age)

    console.log("that.data.phone", that.data.phone)

    if (that.data.name == "" || that.data.age == "未选择") {
      wx.showToast({
        icon: "none",
        title: '请填写完整',
      })
    }else{
      console.log(e)
      if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
        that.setData({
          showphone: true
        })
      } else {

        // 接受授权
        // that.pushOrder()
        that.setData({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        })

        that.encryptedData()
      }
    }
 


    
  },
  toOrder: function(e) {
    wx.navigateTo({
      url: '../order/order?phone='+this.data.phone,
    })
  },
  pushOrder:function(){
    var that =this;

    if (that.data.name == "" || that.data.age =="未选择"||that.data.phone==""){
      wx.showToast({
        icon:"none",
        title: '请填写完整',
      })

      wx.login({
        success: function (res) {
          console.log(res)
          that.setData({
            code: res.code
          })
   
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      console.log()
      var json = { "name": that.data.name, "age": that.data.age, "phone": that.data.phone,"uid":that.data.uid }
      console.log(json)

      wx.request({
        url: app.host + "adduserinfo",
        data: json,
        success:function(res){
          console.log(res)
          if(res.data.code ==200){
            that.toOrder()
          }else{
            wx.showToast({
              icon:"none",
              title: res.data.message,
            })


            wx.login({
              success: function (res) {
                console.log(res)
                that.setData({
                  code: res.code
                })
                // console.log("res", res)
                // var json = { "iv": iv, "encryptedData": encryptedData, "code": res.code }
                // wx.request({
                //   url: app.host + "getWechatUserPhone",
                //   data: json,
                //   success: function (res) {
                //     console.log(res)
                //   }
                // })
              },
              fail: function (res) { },
              complete: function (res) { },
            })

          }
        }
      })
    }


  },
  getname:function(e){
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  bindPickerChange:function(e){
    console.log(e)
    var that =this
    that.setData({
      age:that.data.array[e.detail.value]
    })
    
  },
  getphone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  encryptedData: function (iv, encryptedData){
    var that =this
     var json = { "iv": that.data.iv, "encryptedData": that.data.encryptedData, "code": that.data.code }
        wx.request({
          url: app.host + "getWechatUserPhone",
          data: json,
          success: function (res) {
            console.log(res.data.phoneNumber)
            that.setData({
              phone: res.data.phoneNumber
            })

            that.pushOrder()
          }
        })
  
  },
  getAge:function(){
    var that =this;
    wx.request({
      url: app.host +"getage",
      success:function(res){
        for(var i =0;i<res.data.message.length;i++){
          that.data.agelist.push(res.data.message[i].age) 
          console.log("getage",res.data.message[i])
        }
        that.setData({
          agelist: that.data.agelist
        })
   

      }
    })
  }
})