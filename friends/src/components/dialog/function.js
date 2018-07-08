import Vue from 'vue'
import Component from './Dialog'

const DialogComponent = Vue.extend(Component)

let instance = null
const dialog = (type, options) => {
  if (Vue.prototype.$isServer) return

  if (!instance) {
    instance = new DialogComponent()
    instance = instance.$mount()
    console.log(2)
  }

  if (instance.visible) return
  if (type === 'confirm') {
    instance.showCancelButton = true
  }
  instance.message = options.message
  instance.title = instance.title ? instance.title : '提示'
  instance.cancelButtonText = instance.cancelButtonText ? instance.cancelButtonText : '取消'
  instance.confirmButtonText = instance.confirmButtonText ? instance.confirmButtonText : '确定'

  document.body.appendChild(instance.$el)
  console.log(instance.visible)
  instance.visible = true

  instance.$on('closed', () => {
    console.log(1)
    document.body.removeChild(instance.$el)
    instance.$destroy()
    instance = null
  })

  instance.$on('cancel', () => {
    instance.visible = false
  })
}

export default {
  alert (options) {
    return dialog('alert', options)
  },
  confirm (options) {
    return dialog('confirm', options)
  }
}
