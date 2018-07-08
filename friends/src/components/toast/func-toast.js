import Toast from './Toast'

export default {
  extends: Toast,
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.duration && this.duration !== 0) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.duration)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  beforeDestory () {
    this.clearTimer()
  },
  computed: {
    style () {
      switch (this.position) {
        case 'bottom':
          return {
            bottom: '50px',
            transform: 'translate(-50%)'
          }
        case 'top':
          return {
            top: '50px',
            transform: 'translate(-50%)'
          }
        default:
          return {
            top: '50%',
            transform: 'translate(-50%,-50%)'
          }
      }
    }
  },
  data () {
    return {
      duration: 3000,
      visible: false,
      position: 'middle'
    }
  }
}
