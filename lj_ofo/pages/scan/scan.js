Page({
  data:{

  },

  onReady:function(){
    wx.scanCode({
      success: (res)=>{
        console.log(res)
      }
    })
  }
})