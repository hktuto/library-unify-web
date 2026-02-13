<script async setup lang="ts">
const { find } = useStrapi();
const { tObj } = useLang({});
const { data, error } = useAsyncData("footer", () =>
  find("footer", {
    populate: "*",
  }),
);
const { currentLang } = useLang({});

const { data: footerData } = useAsyncData("footer-menu", () =>
  find("menu", {
    populate: {
      logo: {
        populate: "*",
      },
      item: {
        populate: "*",
      },
    },
  }),
);

const router = useRouter();

function itemClick(item: any) {
  if (!item.url) return;
  if (item.url.includes("http")) {
    window.open(item.url, "_blank");
  } else {
    router.push({
      path: item.url,
    });
  }
}

const displayMenu = computed(() => {
  if (!footerData.value) return [];
  if (footerData.value.data.item) {
    return footerData.value.data.item
      .filter((item: any) => {
        if (currentLang.value === "EN") {
          return (
            item.show && item.url !== "https://game.readingpromotion.gov.hk/"
          );
        }
        return item.show;
      })
      .reduce((arr: any, cur: any) => {
        cur.subMenu = cur.subMenu.filter((item: any) => item.show);
        arr.push(cur);
        return arr;
      }, []);
  } else {
    return [];
  }
});
</script>

<template>
  <div class="footerContainer">
    <div class="innerGrid">
      <div class="row">
        <HeaderSocial />
        <a href="https://www.hkpl.gov.hk/" target="_blank" class="cirLogo">
          <img class="govLogo" src="/hkpl.png" alt="" />
        </a>
        <a href="https://www.lcsd.gov.hk/" target="_blank" class="lcsdLogo">
          <img class="lcsdLogo" src="/lcsd.svg" alt="" />
        </a>
      </div>
      <div class="row">
        <div class="footerMenu">
          <div
            v-for="item in displayMenu"
            :key="item.id"
            class="menuLevel"
            @click="itemClick(item)"
          >
            {{ tObj("label_", item) }}
          </div>
        </div>
      </div>
      <div class="row bottom">
        <div v-if="data" class="copy">
          {{ data.data.footer_EN }}
        </div>
        <a
          href="https://www.w3.org/WAI/WCAG2AA-Conformance"
          title="Explanation of WCAG 2 Level AA conformance"
        >
          <img
            height="32"
            width="88"
            src="https://www.w3.org/WAI/WCAG22/wcag2.2AA"
            alt="Level AA conformance,
                  W3C WAI Web Content Accessibility Guidelines 2.2"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menuLevel {
  cursor: pointer;
}
.lcsdLogo {
  width: 100px;
  margin-top: 5px;
}
.footerMenu {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
}
.row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--app-padding);
}
.footerContainer {
  width: 100%;
  padding-block: var(--app-padding);
  background: var(--footer-color);
  margin-top: var(--app-padding);
}
.cirLogo {
  width: 35px;
  height: 35px;
  background: #fff;
  border-radius: 24px;
  padding: 5px;
  img {
    width: 100%;
  }
}
.copy {
  width: 100%;
  max-width: var(--body-width);
  text-align: center;
  font-size: 0.7rem;
  padding: 12px 0;
  margin: 0 auto;
}
</style>
