<script setup lang="ts">
const { find } = useStrapi();
const route = useRoute();

const { data, pending, refresh, error } = await useAsyncData("books", () =>
  find("books", {
    populate: {
      thumbnail: {
        populate: "*",
      },
    },
  }),
);

const { tObj, currentLang, t } = useLang({
  nameHK: "圖書館資源選介",
  nameEN: "Library Resources Guide",
});
</script>

<template>
  <div class="pageContent innerGrid">
    <div v-if="pending" class="pending"></div>
    <template v-else>
      <div class="title gradientText">
        {{ t("name") }}
      </div>
      <UiGrid v-if="data.data">
        <UiGridItem
          v-for="book in data.data"
          :key="book.id"
          :img="book.thumbnail.url"
          :title="tObj('title_', book)"
          :url="`/books/${book.documentId}`"
        />
      </UiGrid>
    </template>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 24px;
}
</style>
