<template>
  <transition name="trans">
    <section id="user-center" v-if="isShow">
      <div class="container">
        我是用户
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  created () {
    this.$root.$on('user-center-show', () => {
      this.isShow = true
    })
    this.$root.$on('user-center-hide', () => {
      this.isShow = false
    })
  }
}
</script>

<style lang="scss" scoped>
  #user-center {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 40%;
    z-index: 1000;
    box-shadow: 0 11px 3px 0 rgba(0,0,0,0.08);
    &.active {
      transform: translate(0,0);
    }
    .container {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
  .trans-enter-active, .trans-leave-active {
    transition: all .5s;
  }
  .trans-enter, .trans-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translate(-100%,0);
  }
</style>
