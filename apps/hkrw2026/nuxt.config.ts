// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no",
        },
        {
          name: "title",
          content: "香港悅讀周 Hong Kong Reading Week",
        },
        {
          name: "description",
          content:
            "今年的4月23日為首屆「香港全民閱讀日」，香港公共圖書館特意於4月20至28日舉辦「香港悅讀周」，與不同持份者合辦連串網上及實體活動，宣揚閱讀的好處，營造全城閱讀氛圍。活動於全港不同地點舉行，讓廣大市民都能參與其中。本年的閱讀日以中華文化為焦點閱讀主題，以加強市民對國家和中華傳統文化的認同。",
        },
        {
          name: "keywords",
          content:
            "香港悅讀周, Hong Kong Reading Week, 閱讀, 全民閱讀日, 公共圖書館",
        },
        { name: "author", content: "Hong Kong Public Libraries" },
      ],
    },
  },
  modules: ["@hypernym/nuxt-anime", "@nuxtjs/strapi", "@element-plus/nuxt"],

  runtimeConfig: {
    public: {
      STRAPI_URL: process.env.STRAPI_URL || "http://localhost:1337",
      siteName: "香港悅讀周 Hong Kong Reading Week",
      siteDescription:
        "今年的4月23日為首屆「香港全民閱讀日」，香港公共圖書館特意於4月20至28日舉辦「香港悅讀周」，與不同持份者合辦連串網上及實體活動，宣揚閱讀的好處，營造全城閱讀氛圍。活動於全港不同地點舉行，讓廣大市民都能參與其中。本年的閱讀日以中華文化為焦點閱讀主題，以加強市民對國家和中華傳統文化的認同。",
    },
  },

  // gtag: {
  //   id: "G-B3NESPXYME",
  // },

  strapi: {
    version: "v5",
    prefix: "/api",
  },

  compatibilityDate: "2025-04-02",
});
