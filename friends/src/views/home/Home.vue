<template>
  <section id="page">
    <div id="container"></div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      map: null,
      geolocation: null,
      citycode: ''
    }
  },
  computed: {
    userLng () {
      return this.$store.state.location.lng
    },
    userLat () {
      return this.$store.state.location.lat
    }
  },
  methods: {
    initMap () {
      const option = {
        mapStyle: 'amap://styles/2386061fccd9a2406f69b0b78df4ef8d', // 样式URL
        resizeEnable: true,
        zoom: 13
      }

      if (this.userLng && this.userLat) {
        option.center = [this.userLng, this.userLat]
      }

      this.map = new AMap.Map('container', option)

      // 地图移动结束,更新城市ID (ID 更新会触发加载城市网点加载)
      this.map.on('moveend', () => {
        this.map.getCity(({citycode, city, district}) => {
          // 若不为同一城市则使用地图方法获取城市坐标点
          if (this.userCityCode !== citycode) {
            AMap.service('AMap.Geocoder', () => {
              const geocoder = new AMap.Geocoder()
              geocoder.getLocation(city + district, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                  // 得到了模糊搜索城市的一个经纬度地址,先去移动地图中心点,再去调用方法查找周围还车点
                  //this.$store.commit('updateTakeSpot', { lng: result.geocodes[0].location.lng, lat: result.geocodes[0].location.lat })
                  this.citycode = citycode
                }
              });
            });
          } else {
            this.citycode = citycode
          }
        })
      })
      // 使用高德地图精确定位
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
        zoomToAccuracy: false,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        showButton: false, // 不显示组件的定位按钮
        showMarker: true, // 显示定位结果的标记
        showCircle: true  // 定位成功后用圆圈表示定位精度范围
      })
      this.geolocation = geolocation
      this.map.addControl(this.geolocation)
    },
    location () {
      this.$indicator.open()
      this.geolocation.getCurrentPosition((status, result) => {
        this.$indicator.close()
        if (status === 'complete') {
          this.$store.commit('updatePosition', {
            lng: result.position.getLng(),
            lat: result.position.getLat()
          });
          this.$store.commit('changeLocationCity', result.addressComponent);
          this.citycode = result.addressComponent.citycode || result.addressComponent.adcode;
          this.map.setZoomAndCenter(14, [this.userLng, this.userLat])
        } else {
          // 定位失败，使用当前地图定位城市
          this.$toast({
            message: '定位失败'
          })
          AMap.event.trigger(this.map, 'moveend');
        }
      })
    }
  },
  mounted () {
    this.initMap()
    this.location()
  }
}
</script>

<style lang="scss" scoped>
#page {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  #container {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
