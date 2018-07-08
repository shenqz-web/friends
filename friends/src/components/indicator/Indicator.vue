<template>
  <transition name="fade" @after-leave="afterLeave">
    <div class="indicator-wrapper" v-show="visible">
      <div class="indicator" :style="{ 'padding': text ? '20px' : '15px' }">
        <div class="indicator-spin">
          <div class="spinner-snake"></div>
        </div>
        <div class="indicator-text" v-show="text !== ''">{{ text }}</div>
      </div>
      <div class="indicator-mask"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'indicator',
  props: {
    text: String,
    spinnerType: {
      type: String,
      default: 'snake'
    }
  },
  data () {
    return {
      visible: false
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
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .indicator-wrapper {
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    z-index: 1000;
  }
  .indicator-mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: #000;
    z-index: 999
  }
  .indicator {
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 15px;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0,0,0,.7);
    font-size: 14px;
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    transform: translate(-50%, -50%);
    --webkit-transform: translate(-50%, -50%);
  }
  .indicator-spin {
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
  }
  .indicator-text {
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }
  .spinner-snake {
    -webkit-animation: spinner-rotate 0.8s infinite linear;
            animation: spinner-rotate 0.8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    height: 32px;
    width: 32px;
    box-sizing: border-box;
  }
  @-webkit-keyframes spinner-rotate {
    0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
    }
    @keyframes mint-spinner-rotate {
    0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
    }
  }
</style>
