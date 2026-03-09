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

function openBooks(url:string){
  window.open(url, "_blank");
}

const { tObj, currentLang, t } = useLang({
  nameHK: "圖書館資源選介",
  nameEN: "Library Resources Guide",
  bookLinkHK:"紙本書",
  bookLinkEN:"Book",
  eBookLinkHK:"電子書",
  eBookLinkEN:"eBook",
});
</script>

<template>
  <div class="pageContent innerGrid">
    <div v-if="pending" class="pending"></div>
    <template v-else>
      <div class="title gradientText">
        {{ t("name") }}
      </div>
      <div v-if="data.data" class="booksGrid">
        <div v-for="book in data.data" :key="book.id" class="bookItem">
           <NuxtImg class="mainImg" :src="imgUrlConverter(book.thumbnail.url)" />
           <div class="content">
             <div class="cat">{{tObj('category_', book)}}</div>
             <div class="bookTitle">{{tObj('title_', book)}}</div>
             <div class="author">{{tObj('author_', book)}}</div>
             <div class="btns">
               <ElButton type="info" @click="openBooks(tObj('link_', book))">{{t("bookLink")}}</ElButton>
               <ElButton type="info" @click="openBooks(tObj('eLink_', book))">{{t("eBookLink")}}</ElButton>
             </div>
           </div>
        </div>
      </div>
      <!-- <UiGrid v-if="data.data">
        <UiGridItem
          v-for="book in data.data"
          :key="book.id"
          :img="book.thumbnail.url"
          :title="tObj('title_', book)"
          :url="`/books/${book.documentId}`"
        />
      </UiGrid> -->
    </template>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 24px;
}
.booksGrid{
  width:100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
.bookItem{
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 12px;
}
.mainImg{
  width:100%;
  aspect-ratio: 9/13;
  object-fit: cover;
}
.cat{
  font-size: 0.75rem;
  color:var(--app-primary-color);
}
.author{
  font-size: 0.9rem;
}
.bookTitle{
  font-size: 1.125rem;
}
.btns{
  margin-top: 1rem;
}
</style>
