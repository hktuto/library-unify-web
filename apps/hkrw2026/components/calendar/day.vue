<script setup lang="ts">
const { find } = useStrapi();

const props = defineProps<{
  day: any;
  opened?: boolean;
}>();
const pending = ref(false);
const list = ref<any[]>([]);
const emit = defineEmits(["select"]);

const { t } = useLang({
  loadingHK: "載入中",
  loadingEN: "Loading",
  moreHK: "...更多",
  moreEN: "...more",
});
async function getList() {
  pending.value = true;
  const res = await find("events", {
    filters: {
      programs: {
        startDate: {
          $eq: props.day.obj.format("YYYY-MM-DD"),
        },
      },
    },
    pagination: {
      start: 0,
      limit: 1000,
    },
    populate: {
      photos: {
        populate: "*",
      },
      programs: {
        populate: "*",
      },
      slides: {
        populate: "*",
      },
    },
  });
  if (res.data.length > 0) {
    const lists = res.data.reduce((arr, cur) => {
      const programs = cur.programs.filter(
        (item: any) => item.startDate === props.day.obj.format("YYYY-MM-DD"),
      );
      if (programs.length > 0) {
        programs.forEach((item: any) => {
          arr.push({
            ...item,
            title_EN: cur.title_EN,
            title_HK: cur.title_HK,
            id: cur.id,
          });
        });
      }
      return arr;
    }, [] as any);
    list.value = lists;
  }
  pending.value = false;
}

function togglePanel() {
  if (list.value.length > 0) {
    emit("select", {
      date: props.day.obj.format("YYYY-MM-DD"),
      programs: list.value,
    });
  }
}

watch(
  props.day,
  () => {
    getList();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div
    :class="{ dayContainer: true, haveList: list && list.length > 0, opened }"
    @click="togglePanel"
  >
    <div class="label">
      <div class="year">{{ day.year }}</div>
      <div class="month">{{ day.month }}/{{ day.day }}</div>
      <div class="count">
        <template v-if="pending">
          {{ t("loading") }}
        </template>
        <template v-else-if="list && list.length > 4">
          <div v-for="item in 5" :key="item" class="dot"></div>
          <small>{{ t("more") }}</small>
        </template>
        <template v-else-if="list && list.length <= 4">
          <div v-for="item in list" :key="item.id" class="dot"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dayContainer {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  padding: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  color: #000;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
  &.haveList {
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  }
  &.opened {
    background: rgba(255, 255, 255, 1);
    border-bottom-left-radius: 0px;
    &.hover {
      background: rgba(255, 255, 255, 1);
    }
  }
}

.label {
  display: grid;
  grid-template-rows: min-content 1fr 12px;
}
.year {
  font-size: 0.8rem;
}
.month {
  font-size: 2rem;
  color: #1e63ee;
}
.count {
  font-size: 0.8rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 2px;
  overflow: hidden;
}
.dot {
  width: 5px;
  height: 5px;
  background: #1e63ee;
  border-radius: 50%;
}
</style>
