<script setup lang="ts">
import { register } from "swiper/element/bundle";

register();

const props = defineProps<{
  slides: any[];
}>();

const spaceBetween = 10;
const { currentLang, tObj } = useLang({});
const router = useRouter();
function slideClickHandler(item: any) {
  if (item.url_EN) {
    if (item.url_EN.includes("http")) {
      const url = tObj("url_", item);
      if (url) {
        window.open(url + `?lang=${currentLang.value}`, "_blank");
      }
    } else {
      const url =
        currentLang.value === "EN"
          ? item.url_EN
          : item[`url_${currentLang.value}`] || item.url;

      router.push({
        path: item.url_EN,
      });
    }
  }
}
</script>

<template>
  <div class="sliderContainer">
    <swiper-container
      :slides-per-view="1"
      :space-between="spaceBetween"
      :loop="true"
      :autoplay="{
        delay: 3000,
      }"
      :pagination="true"
    >
      <swiper-slide
        v-for="slide in slides"
        :key="slide.id"
        :class="{ slide: true, cursor: slide.url }"
        @click="slideClickHandler(slide)"
        :data-swiper-autoplay="slide.image?.url.includes('mp4') ? 20000 : 3000"
      >
        <template v-if="slide.image?.url.includes('mp4')">
          <div class="videoContainer">
            <video
              class="video"
              :src="imgUrlConverter(slide.image?.url)"
              autoplay
              preload
              muted
              loop
              playsinline
            />
          </div>
        </template>
        <template v-else>
          <img :src="imgUrlConverter(slide.image?.url)" alt="" />
          <div class="absoluteBg">
            <img :src="imgUrlConverter(slide.image?.url)" alt="" />
          </div>
        </template>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped lang="scss">
.video {
  width: 100%;
}
swiper-container {
  height: 100%;
}
.sliderContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
}
.slide {
  width: 100%;
  height: 100%;
  position: relative;
  .absoluteBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    opacity: 0.8;
    z-index: -1;
    img {
      object-fit: cover;
    }
  }
  &.cursor {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
