/* globals AMap:false */
/* eslint-disable no-new */
/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "^AMap\.." }] */
// 此定位代码用于获取用户所在城市，不获取用户坐标
export default function () {
  const geoPromise = new Promise(function (resolve) {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: false,
      timeout: 3000,
      showButton: false,
      showMarker: false,
      showCircle: false,
      panToLocation: false
    })
    // 使用IP定位
    geolocation.getCityInfo(function (status, result) {
      if (status === 'complete') {
        // IP定位成功
        const data = {
          lng: result.center[0],
          lat: result.center[1],
          positionCity: result
        }

        // 如果使用IP定位没有获取到citycode，则使用精确定位
        if (result.citycode) {
          resolve(data)
        } else {
          // 精确定位
          geolocation.getCurrentPosition(function (status, locationInfo) {
            if (status === 'complete') {
              resolve({
                lng: locationInfo.position.getLng(),
                lat: locationInfo.position.getLat(),
                positionCity: locationInfo.addressComponent
              })
            } else if (result.center.length === 2) {
              // 如果精确定位失败，且IP定位获取到了中心点坐标，则使用坐标解析
              AMap.service('AMap.Geocoder', function () {
                const geocoder = new AMap.Geocoder()

                geocoder.getAddress(result.center, function (status, decodeInfo) {
                  if (status === 'complete') {
                    data.positionCity = decodeInfo.regeocode.addressComponent
                    resolve(data)
                  } else {
                    data.positionCity = null
                    resolve(data)
                  }
                })
              })
            } else {
              resolve()
            }
          })
        }
      } else {
        resolve()
      }
    })
  })

  return geoPromise
}
