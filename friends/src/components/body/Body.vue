<template>
  <section id="app-body">
    <section id="body-container">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </section>
  </section>
</template>

<script>
export default {
}
</script>

<style>
#body-container {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  flex-direction: column;
}
</style>
