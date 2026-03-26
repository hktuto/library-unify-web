<script lang="ts" setup>
import Markdown from "vue3-markdown-it";
const props = defineProps<{
  tabs: any[]
}>();

const selectedTab = ref(0);

const {t, tObj} = useLang({});
</script>


<template>
  <ElTabs
    v-model="selectedTab"
  >
    <ElTabPane v-for="(tab, index) in tabs" :key="index" :name="index" :label="tObj('title_', tab)">
      {{ tab.content}}
      <Markdown
        v-if="tab.content_EN"
        class="eventContent"
        :source="tObj('content_', tab)"
        html
      />
    </ElTabPane>
  </ElTabs>
</template>
