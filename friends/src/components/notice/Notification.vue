<template>
  <transition :name="animation" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
      <span class="content">{{ message }}</span>
      <a class="btn" @click="handleClose">{{ closeText }}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'notification',
  props: {
    message: {
      type: String,
      required: true
    },
    closeText: {
      type: String,
      default: '关闭'
    }
  },
  data () {
    return {
      visible: true,
      animation: 'slide'
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    createTimer () {}
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .5s
  }
  .slide-enter, .slide-leave-to {
    transform: translate(100%);
    -webkit-transform: translate(100%);
  }
  .notification {
    display: flex;
    background-color: #303030;
    color: rgba(255, 255, 255, 1);
    align-items: center;
    padding: 20px;
    position: fixed;
    min-width: 280px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
    flex-wrap: wrap;
    transition: all .3s;
  }
  .content {
    padding: 0;
  }
  .btn {
    color: #ff4081;
    padding-left: 24px;
    margin-left: auto;
    cursor: pointer;
  }
</style>
