<script setup lang="ts">

</script>

<template>
  <div class="social">
      <div class="label">
        追蹤我們
      </div>
      <a href="https://www.instagram.com/readingisjoyful/" target="_blank">
        <img src="/social/instagram.png" />
      </a>
      <a href="https://www.facebook.com/readingisjoyful" target="_blank">
        <img src="/social/fb.png" />
      </a>
      
      <a href="https://www.youtube.com/user/hkplgovhkchannel" target="_blank">
        <img src="/social/yt.png" />
      </a>
  </div>
</template>

<style scoped lang="scss">
.social{
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  img {
    width:24px;
  }
}
</style>