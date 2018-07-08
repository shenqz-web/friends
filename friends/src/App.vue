<template>
  <div id="app">
    <app-header></app-header>
    <app-body></app-body>
    <user-center></user-center>
    <transition name="fade">
      <div class="mask" v-if="isMask" @click="userCenterHide"></div>
    </transition>
  </div>
</template>

<script>
import AppHeader from 'components/header/Header'
import AppBody from 'components/body/Body'
import UserCenter from 'components/user/User'
export default {
  data () {
    return {
      isMask: false
    }
  },
  components: {
    AppHeader,
    AppBody,
    UserCenter
  },
  created () {
    this.$root.$on('mask-show', () => {
      this.isMask = true
    })
  },
  methods: {
    userCenterHide () {
      this.isMask = false
      this.$root.$emit('user-center-hide')
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  #app-header {
    flex-shrink: 0;
    flex-grow: 0;
  }
  #app-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    flex-basis: auto;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    z-index: 999;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
