<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);

const emit = defineEmits(["menuToggle"]);
const props = defineProps<{ menu: any[] }>();
const router = useRouter();

const { tObj } = useLang({});
const opened = ref(false);

function itemClick(item: any) {
  const url = item.url ? item.url : item.url_EN ? tObj("url_", item) : "#";

  if (url.includes("http")) {
    window.open(url, "_blank");
  } else {
    router.push({
      path: url,
    });
  }
}
</script>

<template>
  <div :class="{ container: true, blue: !opened }">
    <!-- <template v-if="isDesktop">
        <HeaderMenuDesktop :menu="menu" @itemClick="itemClick" />

    </template> -->
    <div class="action">

      <HeaderFont />
      <HeaderSearch  />
      <HeaderLang />
    </div>
    <HeaderMenuMobile
      :menu="menu"
      @itemClick="itemClick"
      @menuToggle="(v) => (opened = v)"
    />
  </div>
</template>

<style scoped lang="scss">
.action{
  padding:6px;
  border-radius:4px;
  background: var(--app-primary-color);
  margin-right: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
}
.container {
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
  justify-content: flex-end;
  align-items: center;
  isolation: isolate;
  z-index: 99;
  &.blue {
    backdrop-filter: blur(20px);
  }
  &.isDesktop {
    justify-content: flex-start;
  }
}
</style>
