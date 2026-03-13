<script setup lang="ts">
const { find } = useStrapi();
const route = useRoute();
const filter = computed(() => {
  if (route.query.category) {
    const cat = route.query.category as string;
    return {
      category_HK: {
       $contains: cat,
     }
    };
  }
  return {};
})
const { data:bookPage } = useAsyncData("bookPage", () =>
  find("book-page", {
    populate: {
      slides: {
        populate: "*",
      },
    },
  }),
);
const { data, pending, refresh, error } = await useAsyncData("books", () =>
  find("books", {
    populate: {
      thumbnail: {
        populate: "*",
      },
    },
    pagination: {
      page: 1,
      pageSize: 100,
    },
    sort: "order:dsc",
    filters: filter.value,
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
  eBookLinkEN: "eBook",
  publisherHK: "出版者",
  publisherEN: "Publisher",
  publishYearHK: "出版年份",
  publishYearEN: "Publish Year",
});
</script>

<template>
  <div class="pageContent innerGrid">
    <div v-if="pending" class="pending"></div>
    <template v-else>
    <UiSlider v-if="bookPage" :slides="bookPage.data.slides" />
      <div class="title gradientText">
        {{ t("name") }} {{ route.query.category && data.data[0] ? '- ' + tObj('category_', data.data[0]) : '' }}
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
              <div class="author">{{t('publisher')}} : {{tObj('publisher_', book)}}</div>
              <div class="author">{{t('publishYear')}} : {{book.publishYear}}</div>
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
  grid-template-columns: 1fr;
  gap: 24px;
}
.bookItem{
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 12px;
}
.mainImg{
  max-height: 200px;
  aspect-ratio: 9/13;
  object-fit: cover;
}
.cat{
  font-size: 0.75rem;
  color:var(--app-primary-color);
}
.author{
  font-size: 1rem;
}
.bookTitle{
  font-size: 1.5rem;
  font-weight: bold;
}
.btns{
  margin-block: 1rem;
}
</style>
