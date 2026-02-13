<script setup lang="ts">
import { useEvents } from "~/composables/event";
import dayjs from "dayjs";
const { find } = useStrapi();
const route = useRoute();

// const catData = ref<any>();
// const programs = ref<any[]>([]);
const loading = ref(true);
const { data, pending } = await useAsyncData("oneCategory", () =>
  find("categories", {
    filters: {
      name: {
        $eq: route.params.id,
      },
    },
    populate: {
      events: {
        populate: "*",
      },
      feature: {
        populate: "*",
      },
    },
  }),
);

const singleCategory = computed(() => {
  if (!data.value || !data.value.data || data.value.data.length === 0)
    return null;

  return data.value.data[0];
});

// const {data,pending} = await useAsyncData('categories', () => find('categories',{
//     populate: {
//         events:{
//             populate:"*"
//         },
//         feature:{
//             populate:"*"
//         }

//     },
//     filters: {
//         name: {
//             $eq: route.params.id
//         }
//     }
// }))

const { tObj, currentLang, t } = useLang({
  tableDateEN: "Programme Date/Time",
  tableLocationEN: "Venue",
  tableRegisterEN: "Registration / Enquiry",
  tablePeriodEN: "Registration Period",
  tableNameHK: "活動名稱",
  tableNameEN: "Event Name",
  tableDateHK: "活動日期及時間",
  tableLocationHK: "地點",
  tableRegisterHK: "報名及查詢",
  tablePeriodHK: "報名日期",
  tableHostEN: "Host",
  tableTargetEN: "Target",
  tableQuotaEN: "Quota",
  tableHostHK: "講者/主持",
  tableTargetHK: "對象",
  tableQuotaHK: "名額",
  addToCalendarHK: "加入行事曆",
  addToCalendarEN: "Add to calendar",
  detailHK: "詳情",
  detailEN: "Detail",
  closeHK: "關閉",
  closeEN: "Close",
  keywordHK: "關鍵字",
  keywordEN: "Keyword",
  categoryHK: "類別",
  categoryEN: "Category",
  dateRangeHK: "日期區間",
  dateRangeEN: "Date Range",
  districtHK: "地區",
  districtEN: "District",
  detailDistrictHK: "分區",
  detailDistrictEN: "Detail District",
});

// const { data : catData , pending: catPending} = useAsyncData('event', () => find('events', {
//     filters:{
//         categories:{
//             name:{
//                 $eq: route.params.id
//             }
//         }
//     },
//     populate: "*",
//     sort:"order",
//     pagination:{
//         start: 0,
//         limit: -1
//     }
// }))

// watch(data, () => {
//     if(allEvents.value.length > 0) getCatDate()
// })

// watch(allEvents, () => {
//     if(allEvents.value.length > 0) getCatDate()
// },{
//     immediate:true
// })

const config = useRuntimeConfig();
useSeoMeta({
  title: config.public.siteName + " | " + data.value?.data[0].name_EN,
});

onMounted(() => {
  // const { gtag } = useGtag()
  // gtag('event', 'page_view', {
  //     page_title:  config.public.siteName + " | " + data.value?.data[0].name_EN,
  //     page_location: window.location.href
  // });
});
</script>

<template>
  <div class="pageContent innerGrid">
    <div v-if="pending" class="pending"></div>
    <template v-else>
      <div
        v-if="!singleCategory || singleCategory.events.length === 0"
        class="comingSoon"
      >
        {{
          tObj("key", {
            keyEN: "Coming Soon",
            keyHK: "快將推出",
          })
        }}
      </div>

      <div
        v-if="singleCategory"
        class="title gradientText"
        :style="`--hue:${getHue(singleCategory.color)}`"
      >
        {{ tObj("name_", singleCategory) }}
      </div>

      <template v-if="singleCategory && singleCategory.events">
        <div v-if="singleCategory.events.length === 0" class="noData">
          {{
            tObj("key", {
              keyEN: "Coming Soon",
              keyHK: "快將推出",
            })
          }}
        </div>
        <UiGrid v-else>
          <UiGridItem
            v-for="event in singleCategory.events"
            :key="event.id"
            :img="event.photos[0].url"
            :title="tObj('title_', event)"
            :url="`/event/${event.documentId}`"
            :color="singleCategory.color"
          />
        </UiGrid>
      </template>
      <!-- <template v-if="catData?.data[0].show_programs">
                <div v-if="catData?.data[0].programs.length === 0" class="noData">
                    {{tObj('key', {
                    keyEN: 'Coming Soon',
                    keyHK:"快將推出"
                })}}
                </div>
                <UiGrid>

                    <EventProgramItem v-for="item in catData?.data[0].programs" :key="item.id" :program="item.program" :event="item.event" :addToCalendar="true" :addToCalendarText="t('addToCalendar')">
                        <template #header>

                        <div class="title">
                            {{ tObj('title_', item.event) }}
                        </div>
                        </template>
                        <template #footer>
                            <ElButton @click="$router.push(item.url)">{{t('detail')}}</ElButton>
                        </template>
                    </EventProgramItem>
                </UiGrid>
            </template> -->
    </template>
    <!-- <div v-if="catData && catData.data[0].attributes && catData.data[0].remark_HK" class="content">
            <p v-html="tObj('remark_', catData.data[0].attributes)"></p>
        </div> -->
  </div>
</template>

<style scoped lang="scss">
.pageContent {
  .featureContainer {
    width: 100%;
    aspect-ratio: 16/9;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title {
    padding: 12px 0;
  }
}
.content {
  margin-top: 24px;
  background: #fff;
  padding: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-bottom: 24px;
}
</style>
