export default {
  updatePosition (state, { lng = '', lat = '' } = {}) {
    state.location.lng = lng
    state.location.lat = lat
  },
  changeLocationCity (state, data = {}) {
    state.location.adcode = data.adcode
    state.location.citycode = data.citycode
    state.location.city = data.city
  }
}
