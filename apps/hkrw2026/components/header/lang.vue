<script setup lang="ts">
const { locales, currentLang, changeLocale } = useLang({})

</script>

<template>
  <div class="languageContainer">
    <div v-for="lang in locales" :key="lang.key" class="lang" @click="changeLocale(lang.key)">
      {{ lang.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.languageContainer{
    display: flex;
    flex-flow: row nowrap;
    gap: 0;
    line-height: 1;
    color: #fff;
    .lang {
      cursor: pointer;
      padding-inline: 6px;
      &:first-child {
        padding-inline-start: 0;
      }
    }
    .lang + .lang {
      border-left: 1px solid currentColor;
      
      
    }
  }
</style>