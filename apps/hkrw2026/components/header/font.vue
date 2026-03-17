<script lang="ts" setup>

function applyFont(font: string) {
  // get html root element
  const root = document.documentElement;
  // set font-family style
  root.style.fontSize = font;
  localStorage.setItem('font', font);
}

onMounted(() => {
  const savedFont = localStorage.getItem('font');
  if (savedFont) {
    applyFont(savedFont);
  } else {
    applyFont('16px');
  }
});

</script>

<template>
  <div class="font-selector">
    <div class="small" @click="applyFont('12px')">A</div>
    <div class="medium" @click="applyFont('16px')">A</div>
    <div class="large" @click="applyFont('18px')">A</div>
  </div>
</template>

<style>
.font-selector{
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 2px;

  color: #fff;
  > * {
    cursor: pointer;
    &:hover{
      font-weight: bold;
    }
  }
}
.small {
  font-size: 12px;
}
.medium {
  font-size: 16px;
}
.large {
  font-size: 18px;
}
</style>
