<script lang="ts" setup>
const props = defineProps<{
  catId: string;
}>();
const { tObj, t } = useLang({
  moreHK: "探索更多",
  moreEN: "More",
});
const loading = ref(false);
const list = ref([]);
const router = useRouter();
const demoContent = {
  id: "1",
  attributes: {
    name_EN: "Demo Content",
    name_HK: "示範內容",
    description_EN: "This is a demo content",
    description_HK: "這是一個示範內容",
    img: "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/73e2eeff98d04f9d2ccd3e4764d32b56.jpg",
  },
};
async function getRelatedItems() {
  loading.value = true;
  try {
    // add 6 demo items to list
    for (let i = 0; i < 6; i++) {
      list.value.push({ ...demoContent });
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

function openEvent(id: string) {
  console.log(id);
  router.push(`/event/1`);
}

onMounted(() => {
  getRelatedItems();
});
</script>

<template>
  <div v-loading="loading" class="sectionContainer">
    <div class="gridContainer">
      <div
        v-for="item in list"
        :key="item.id"
        class="items"
        @click="openEvent(item.id)"
      >
        <div class="itemImageContainer">
          <img :src="item.img" alt="" />
        </div>
        <div class="itemTitle">
          {{ tObj("name_", item) }}
        </div>
      </div>
    </div>
    <div class="moreContainer">
      <div class="more">
        <div class="title">>> {{ t("more") }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sectionContainer {
  width: 100%;
  padding-bottom: var(--app-padding);
  .gridContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    gap: var(--app-padding);
    justify-content: flex-start;
    align-items: flex-start;
    @media (max-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
}
.moreContainer {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  font-size: 1.2rem;
  color: #808184;
  margin-top: calc(var(--app-padding) / 2);
  .more {
    cursor: pointer;
  }
}
.items {
  cursor: pointer;
  transform: scale(1);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
}
.itemTitle {
  font-size: 1.2rem;
  font-weight: 500;
  padding-block: calc(var(--app-padding) / 2);
  position: relative;
  isolation: isolate;
}
.itemImageContainer {
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
