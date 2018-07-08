import Vue from 'vue'
import Component from './func-toast'

const ToastConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if (!instance) return
  const index = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)
}

const toast = (options) => {
  if (Vue.prototype.$isServer) return

  const {duration, message, position, isIcon} = options

  const instance = new ToastConstructor({
    propsData: {
      message
    },
    data: {
      duration: duration === undefined ? 3000 : duration,
      position: position,
      isIcon: isIcon
    }
  })

  const id = `toast_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  return instance.vm
}

export default toast
