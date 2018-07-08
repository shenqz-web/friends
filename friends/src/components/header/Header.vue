<style scoped>
#app-header {
  position: relative;
  z-index: 9;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 3.5rem;
  border-bottom: 1px solid #ebebeb;
  padding: 0;
  background-color: #ffffff;
  overflow: hidden;
  font-size: 1.4rem;
  color: #333333;
  box-shadow: 0 3px 11px 0 rgba(0,0,0,0.08);
}
#left {
  display: flex;
  flex-grow: 1;
  flex-basis: 7em;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1.5rem;
}
#middle {
  display: flex;
  flex-grow: 1;
  max-width: 14em;
  align-items: center;
  justify-content: center;
}
#title {
  font-size: 1.4rem;
  margin: 0;
  font-weight: normal;
}
#right {
  display: flex;
  align-items: center;
  flex-basis: 7em;
  flex-grow: 1;
  justify-content: flex-end;
  padding-right: 1.5rem;
}
svg:active{
  fill: #727171;
}
</style>

<template>
  <header id="app-header" @touchmove.prevent.stop>
    <div id="left" @click="showUserCenter">
      <svg height="18px" width="18px" fill="#333"><use xlink:href="#user-icon"></use></svg>
    </div>
    <div id="middle">
      <h1 id="title" class="ellipsis">{{ cityName }} <svg height="10px" width="10px" fill="#999"><use xlink:href="#down_icon"></use></svg></h1>
    </div>
    <div id="right">
      <svg height="18px" width="18px" fill="#333"><use xlink:href="#message_icon"></use></svg>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    cityName () {
      return this.$store.state.location.city
    }
  },
  methods: {
    showUserCenter () {
      this.$root.$emit('mask-show')
      this.$root.$emit('user-center-show')
    }
  }
}
</script>
