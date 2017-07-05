//index.js

Page({

  //////////////设置数据初始值
  data:{
    map_scale: 15, /////////地图缩放
    ////////////////我的位置
    myLocation:{
      lo: '', /////////经度
      la: ''  /////////纬度
    },
  },
  
  ////////////添加加载监听事件
  onReady: function (){
    var self = this;  ///////////////获得当前页面操作对象
    var marker = [];
    console.log("加载页面完成") /////////////调试语句

    /////////////////////调用获取用户位置api
    wx.getLocation({
      ////////////////成功获取位置
      success: function(res) {

         /* ////////////////////////x
        for (var i = -5; i < 5; i++) {
            marker.push({
              iconPath:
              "/images/index/location_icon.png",
              longitude:res.longitude + i*0.001,
              latitude:res.latitude + i*0.001,
              height:40,
              width:40
            });
        }
        for(var i=5; i>-5; i--){
          marker.push({
            iconPath:
            "/images/index/location_icon.png",
            longitude: res.longitude + i * 0.001,
            latitude: res.latitude - i * 0.001,
            height: 40,
            width: 40
          });
        }

        /////////////////////////+
        for(var i=-5; i<5;i++){
          marker.push({
            iconPath:
            "/images/index/location_icon.png",
            longitude: res.longitude + i * 0.001,
            latitude: res.latitude,
            height: 40,
            width: 40
          });
        }
        for (var i = -5; i < 5; i++) {
          marker.push({
            iconPath:
            "/images/index/location_icon.png",
            longitude: res.longitude,
            latitude: res.latitude + i * 0.001,
            height: 40,
            width: 40
          });
        }*/
        //////////////////////////////随机添加小黄车位置
        for(var i=0; i<100;i++){
          marker.push({
            iconPath:
            "/images/index/location_icon.png",
            longitude: res.longitude - 0.01 + Math.random()*0.02,
            latitude: res.latitude - 0.01 + Math.random() * 0.02,
            height: 40,
            width: 40
          });
        }

        ////////////////////添加我的位置的标记
        marker.push(
          {
            id: 0,
            iconPath:
            "/images/index/mylocation_icon.png",
            longitude: res.longitude,
            latitude: res.latitude,
            height: 40,
            width: 40
          })

        ///////////////////////////添加好友位置
        marker.push(
          {
            iconPath:
            "/images/index/reba.png",
            longitude: res.longitude+0.005,
            latitude: res.latitude,
            height: 60,
            width: 60
          },
          {
            iconPath:
            "/images/index/baby.png",
            longitude: res.longitude + 0.005,
            latitude: res.latitude+0.003,
            height: 60,
            width: 60
          },
          {
            iconPath:
            "/images/index/naza.png",
            longitude: res.longitude - 0.01,
            latitude: res.latitude-0.003,
            height: 60,
            width: 60
          },
          {
            iconPath:
            "/images/index/zhixian.png",
            longitude: res.longitude + 0.001,
            latitude: res.latitude+0.008,
            height: 60,
            width: 60,
            callout:{
              content: "全智贤",
              color: '#000000',
              fontSize: 20,
              borderRadius: 0,
              bgColor: "#0fbff0",
              padding: 0,
              display: 'BYCLICK'
            }
          },
          {
            iconPath:
            "/images/index/xzq.png",
            longitude: res.longitude + 0.003,
            latitude: res.latitude-0.01,
            height: 60,
            width: 60
          }
          );

          
        self.setData({
          'myLocation.lo': res.longitude,
          'myLocation.la': res.latitude,
          marker: marker

        })
        ///////////////显示提示信息
        wx.showToast({
          title: '获取位置成功',
        })

      },

      //////////////////////获取当前位置失败
      fail: function(){
        console.log("定位失败")
        wx.showToast({
          title: '获取位置失败',
        })
      }
    })

    //////////////////////////////获取手机信息
    wx.getSystemInfo({
      success: function(res) {
        
        self.setData({
          ///////////////////////添加地图controls控件
          controls: [{

            id: 1,
            iconPath: "/images/index/service_icon.png",
            position: {
              left: res.windowWidth -60,
              top: res.windowHeight*0.25,
              height: 60,
              width: 60
            },
            clickable: true
          },

          {
            id: 2,
            iconPath: "/images/index/position_icon.png",
            position: {
              left: res.windowWidth - 60,
              top: res.windowHeight * 0.25 + 60,
              height: 60,
              width: 60
            },
            clickable: true
          },

          {
            id:3,
            iconPath: "/images/index/container.png",
            position: {
              left: 0,
              top: res.windowHeight *0.5,
              height: res.windowHeight * 0.5,
              width: res.windowWidth
            },
            clickable: false
          },

          {
            id: 4,
            iconPath: "/images/index/person_icon.png",
            position: {
              left: res.windowWidth * 0.05,
              top: res.windowHeight * 0.8,
              height: 30,
              width: 30
            },
            clickable: true
          },

          {
            id: 5,
            iconPath: "/images/index/activity_icon.png",
            position: {
              left: res.windowWidth * 0.95 -30,
              top: res.windowHeight * 0.8,
              height: 30,
              width: 30
            },
            clickable: true
          },
          {
            id: 6,
            iconPath: "/images/index/ride_icon.png",
            position: {
              left: res.windowWidth /2 -100,
              top: res.windowHeight -220,
              height: 200,
              width: 200
            },
            clickable: true
          },
          {
            id: 7,
            iconPath: "/images/index/hide_icon.png",
            position: {
              left: res.windowWidth /2-10,
              top: res.windowHeight/2+10,
              height: 20,
              width: 30
            },
            clickable: true
          }
          ]
        })
        
      },
    })
  },

  /////////////////添加controltap点击事件
  controltap(e){
    if(e.controlId == 1){
      wx.navigateTo({
        url: '/pages/service/service'
      })
    }
    else if(e.controlId == 4){
      wx.navigateTo({
        url: '/pages/person/person'
      })
    }
    else if (e.controlId == 5) {
      wx.navigateTo({
        url: '/pages/activity/activity'
      })
    }
    else if(e.controlId == 6){
      wx.navigateTo({
        url: '/pages/scan/scan'
      })
    }

    ////////////////////////添加动画效果
    else if(e.controlId == 7){
      console.log(7)
      var anim = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      })
      anim.scale(2, 2).rotate(45).step()
      this.setData({
        anim: anim.export()
      })
    }
  }
  
})