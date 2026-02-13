<script setup lang="ts">
import { useCategories } from "~/composables/catergories";

const { categories } = useCategories();
const { tObj } = useLang({});
</script>

<template>
  <div class="categoryList innerGrid">
    <div
      v-for="category in categories"
      :key="category.id"
      class="categoryContainer"
      :style="`--bg-color:${category.color}`"
    >
      <div class="categoryHeader">
        {{ tObj("name_", category) }}
      </div>
      <categoryGrid :catId="category.id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.categoryList {
  margin-top: var(--app-padding);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--app-padding);
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}
.categoryContainer {
  width: 100%;
}
.categoryHeader {
  width: 100%;
  background: var(--bg-color);
  text-align: center;
  padding: calc(var(--app-padding) / 2) var(--app-padding);
  font-size: 1.5rem;
  margin-bottom: var(--app-padding);
}
</style>
