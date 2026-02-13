<script setup lang="ts">
const { $anime } = useNuxtApp()
onMounted(() => {

  $anime({
    targets: '.cloud',
    translateY: [0, 100],
    loop: true,
    duration: 6000,
    easing: 'cubicBezier(.5, .05, .1, .3)',
    direction: 'alternate',
    delay: function(el, i, l) {
      return i * 300;
    },
  })
})

</script>

<template>
  <div class="container">
    
    <RainbowBg />
    <RainbowCloud class="cloud c1"/>
    <RainbowCloud class="cloud c2"/>
    <RainbowCloud class="cloud c3"/>
  </div>
</template>

<style scoped lang="scss">
.container{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
    background: url('/fillBg.png') no-repeat;
    background-size: cover;
}
.cloud{
  position: fixed;
  z-index: 1;
  --time: 20s;
}
.c1{
  top: 0%;
  left: -70vw;
  --size: 100vw;
}
.c2{
  top: 50vh;
  right: -20px;
  --size: 200px;
}
.c3{
  left : -50px;
  bottom: -20px;
  --size: 200px;
}
</style>