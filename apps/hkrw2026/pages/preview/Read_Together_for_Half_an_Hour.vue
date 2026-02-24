<script setup lang="ts">
import { useHalfHour } from "~/composables/halfHour";
import dayjs from "dayjs";

const { halfHour, getAllHalfHour } = useHalfHour();
const { allDistrict, bigDistrict } = useDistrict();
const { find } = useStrapi();
const route = useRoute();
const { data, pending } = useAsyncData("categories", () =>
  find("categories", {
    populate: "*",
    filters: {
      name: {
        $eq: "Read_Together_for_Half_an_Hour",
      },
    },
    status: route.query.status || "published",
  }),
);

const allCategory = ["Library", "DC", "LCSD Venue", "Com Lib", "Other"];

const { t, tObj, currentLang } = useLang({
  tableDateEN: "Programme Date/Time",
  tableLocationEN: "Venue",
  tableLocationHK: "地點",
  tableAddressEN: "Address",
  tableAddressHK: "地址",
  tableRegisterEN: "Registration / Enquiry",
  tablePeriodEN: "Registration Period",
  tableNameHK: "活動名稱",
  tableNameEN: "Event Name",
  tableDateHK: "活動日期及時間",

  tableRegisterHK: "報名及查詢",
  tablePeriodHK: "報名日期",
  tableHostEN: "Host",
  tableTargetEN: "Target",
  tableQuotaEN: "Quota",
  tableHostHK: "主辦機構",
  tableTargetHK: "對象",
  tableQuotaHK: "名額",
  titleHK: "共讀半小時",
  titleEN: "Read Together for Half an Hour",
  dateRangeHK: "日期區間",
  dateRangeEN: "Date Range",
  districtHK: "地區",
  districtEN: "District",
  detailDistrictHK: "分區",
  detailDistrictEN: "Detail District",
  keywordHK: "關鍵字",
  keywordEN: "Keyword",
  allHK: "全部",
  allEN: "All",
  categoryHK: "類別",
  categoryEN: "Category",
  LibraryHK: "圖書館",
  LibraryEN: "Library",
  DCHK: "區議會",
  DCEN: "District Councils",
  "LCSD VenueHK": "康文埸地",
  "LCSD VenueEN": "LCSD Venue",
  "Com LibHK": "社區圖書館",
  "Com LibEN": "Community Libraries",
  OtherHK: "其他",
  OtherEN: "Other",
  "Leisure and Cultural VenueEN": "Leisure and Cultural Venue",
  "Leisure and Cultural VenueHK": "康文場地",
  contentHK: "內容",
  contentEN: "Content",
});

const form = ref({
  keyword: "",
  category: "",
  daterange: [],
  district: "",
  detailDistrict: "",
});

const displayDistrict = computed(() => {
  if (!form.value.district || form.value.district === "All")
    return allDistrict.value;
  return allDistrict.value.filter(
    (item: any) => item && item.main_district === form.value.district,
  );
});

const displayEvent = ref<any[]>([]);

function filterEvent() {
  const events: any[] = [];
  try {
    for (const event of halfHour.value) {
      if (!event) {
        return;
      }
      if (form.value.keyword) {
        let str =
          (event.name_EN || "") +
          (event.name_HK || "") +
          (event.content_HK || "") +
          (event.content_EN || "") +
          (event.host_EN || "") +
          (event.host_HK || "") +
          (event.address_EN || "") +
          (event.address_HK || "");
        str = str.toLowerCase();
        if (!str.includes(form.value.keyword.toLowerCase())) {
          continue;
        }
      }
      if (form.value.category) {
        if (
          !event.categories ||
          (event.categories !== form.value.category &&
            form.value.category !== "All")
        ) {
          continue;
        }
      }

      if (form.value.district) {
        if (!event.district || !event.district.data) {
          continue;
        }
        if (
          event.district.data.main_district !== form.value.district &&
          form.value.district !== "All"
        )
          continue;
      }
      if (form.value.detailDistrict) {
        if (!event.district || !event.district.data) {
          continue;
        }
        if (
          event.district.data.id !== form.value.detailDistrict &&
          form.value.detailDistrict !== "All"
        )
          continue;
      }
      events.push(event);
    }
  } catch (err) {
    console.log(err);
  }
  displayEvent.value = events;
}
watch(
  form,
  () => {
    filterEvent();
  },
  {
    deep: true,
  },
);
watch(
  halfHour,
  () => {
    if (halfHour.value.length > 0) {
      filterEvent();
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

const config = useRuntimeConfig();
useSeoMeta({
  title:
    config.public.siteName +
    " | " +
    "共讀半小時 Read Together for Half an Hour",
});
onMounted(() => {
  // const { gtag } = useGtag()
  // gtag('event', 'page_view', {
  //     page_title:  config.public.siteName + " | 共讀半小時 Read Together for Half an Hour",
  //     page_location: window.location.href
  // });
});
</script>

<template>
  <div class="pageContent innerGrid">
    <template v-if="data && data.data[0]">
      <div class="title gradientText">
        {{ tObj("name_", data.data[0]) }}
      </div>
      <div class="content">
        <p v-html="tObj('remark_', data.data[0])"></p>
      </div>
    </template>
    <div class="content">
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem :label="t('keyword')">
            <ElInput v-model="form.keyword" :placeholder="t('keyword')" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem :label="t('category')">
            <ElSelect
              v-model="form.category"
              clearable
              :placeholder="t('category')"
            >
              <ElOption value="All" :label="t('all')" />
              <ElOption
                v-for="item in allCategory"
                :key="item"
                :label="t(item)"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow :gutter="12">
        <ElCol :span="12">
          <ElFormItem :label="t('district')">
            <ElSelect v-model="form.district" clearable>
              <ElOption value="All" :label="t('all')" />
              <ElOption
                v-for="item in bigDistrict"
                :key="item.value"
                :value="item.value"
                :label="tObj('label_', item)"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem :label="t('detailDistrict')">
            <ElSelect v-model="form.detailDistrict" clearable>
              <ElOption value="All" :label="t('all')" />
              <ElOption
                v-for="item in displayDistrict"
                :key="item.id"
                :label="tObj('label_', item)"
                :value="item.id"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </div>
    <div class="content">
      <ElTable :data="displayEvent" stripe>
        <ElTableColumn :label="t('tableDate')" width="120">
          <template #default="scope">
            <span v-html="tObj('displayTime_', scope.row)"> </span>
          </template>
        </ElTableColumn>

        <ElTableColumn :label="t('tableLocation')">
          <template #default="scope">
            <div v-html="tObj('location_', scope.row)"></div>
          </template>
        </ElTableColumn>
        <ElTableColumn :label="t('tableHost')">
          <template #default="scope">
            {{ tObj("host_", scope.row) }}
          </template>
        </ElTableColumn>
        <ElTableColumn :label="t('district')" width="80">
          <template #default="scope">
            <div
              v-html="
                scope.row.district &&
                scope.row.district.data &&
                scope.row.district.data
                  ? tObj('label_', scope.row.district.data)
                  : ''
              "
            ></div>
          </template>
        </ElTableColumn>

        <ElTableColumn type="expand" width="40">
          <template #default="scope">
            <div class="expandContent">
              <p>
                {{ tObj("content_", scope.row) }}
              </p>
              <p>
                <small>{{ t("category") }}</small> <br />
                {{ t(scope.row.categories) }} <br />
                <small>{{ t("tableHost") }}</small> <br />
                {{ tObj("host_", scope.row) }}<br />
                <small>{{ t("tableAddress") }}</small> <br />
                {{ tObj("address_", scope.row) }}
              </p>
              <template v-if="scope.row.images && scope.row.images.data">
                <div class="imagesContainer">
                  <div
                    v-for="image in scope.row.images.data"
                    :key="image.id"
                    class="image"
                  >
                    <img
                      :src="
                        image.formats.small
                          ? image.formats.small.url
                          : image.url
                      "
                    />
                  </div>
                </div>
              </template>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  background: #fff;
  padding: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-bottom: 24px;
}
.expandContent {
  padding: 12px;
}
.imagesContainer {
  display: flex;
  flex-flow: row nowrap;
  height: 200px;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  .image {
    height: 100%;
    position: relative;
    img {
      height: 100%;
    }
  }
}
</style>
