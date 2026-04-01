<script setup lang="ts">
const { t } = useLang({
  titleHK: "404 - 找不到頁面",
  titleEN: "404 - Page Not Found",
  titleCN: "404 - 找不到页面",
  messageHK: "抱歉，您要尋找的頁面不存在或已被移除。",
  messageEN: "Sorry, the page you are looking for does not exist or has been removed.",
  messageCN: "抱歉，您要寻找的页面不存在或已被移除。",
  buttonHK: "返回首頁",
  buttonEN: "Back to Home",
  buttonCN: "返回首页",
});

useSeoMeta({
  title: "404 - Page Not Found",
});

// Set proper 404 status code for SEO
const event = useRequestEvent();
if (event) {
  setResponseStatus(event, 404);
}
</script>

<template>
  <div class="notFoundPage">
    <div class="content innerGrid">
      <div class="errorCode">404</div>
      <h1 class="title">{{ t("title") }}</h1>
      <p class="message">{{ t("message") }}</p>
      <NuxtLink to="/" class="homeButton">
        {{ t("button") }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notFoundPage {
  width: 100%;
  min-height: calc(100vh - var(--header-height) - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--app-padding);
}

.content {
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 24px;
}

.errorCode {
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(
    135deg,
    var(--app-primary-color) 0%,
    #dc93a8 50%,
    var(--footer-color) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeIn 0.6s ease-out;
}

.title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #333;
  margin: 0;
  animation: fadeIn 0.6s ease-out 0.1s both;
}

.message {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #666;
  margin: 0;
  max-width: 500px;
  line-height: 1.6;
  animation: fadeIn 0.6s ease-out 0.2s both;
}

.homeButton {
  display: inline-block;
  margin-top: 16px;
  padding: 14px 32px;
  background: var(--app-primary-color);
  color: white;
  text-decoration: none;
  border-radius: var(--app-radius);
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out 0.3s both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(182, 90, 127, 0.3);
    background: #9c4668;
  }

  &:active {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
