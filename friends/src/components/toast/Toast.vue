<template>
  <transition name="fade" @after-leave="afterLeave">
    <div class="toast" :style="style" v-show="visible">
      <div class="success" v-if="isIcon">
        <span class="line line-left"></span>
        <span class="line line-right"></span>
      </div>
      <span class="content">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: true,
      isIcon: false
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    afterLeave () {
      this.$emit('closed')
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .success {
    position: relative;
    width: 80px;
    height: 70px;
    margin: 0 auto;
  }
  .success .line {
    height: 5px;
    background-color: rgb(255,255,255);
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 101;
  }
  .success .line-left {
    width: 28px;
    left: 10px;
    top: 40px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .success .line-right {
    width: 47px;
    right: 8px;
    top: 33px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .toast {
    position: fixed;
    left: 50%;
    padding: 10px;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0,0,0,.7);
    font-size: 14px;
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
  }
</style>
