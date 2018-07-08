import Vue from 'vue'
import Component from './Indicator'

const Indicator = Vue.extend(Component)

let instance

const indicator = (options) => {
  if (Vue.prototype.$isServer) return

  if (!instance) {
    instance = new Indicator()
    instance = instance.$mount()
  }
  if (instance.visible) return
  instance.text = typeof options === 'string' ? options : options.text || ''
  // eslint-disable-line instance.spinnerType = options.spinnerType || 'snake'

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
  })
}

export default {
  open (options = {}) {
    return indicator(options)
  },
  close () {
    if (instance) {
      document.body.removeChild(instance.$el)
      instance.visible = false
    } else {
      return false
    }
  }
}
