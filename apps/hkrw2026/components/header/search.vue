<script setup lang="ts">
const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['search'])
const router = useRouter()
function openSearch(){
    router.push('/search')
    emits('search')
}
</script>

<template>
  <div class="searchButton">
    <img :src="props.primary ? '/search-primary.svg' : '/search.svg'" @click="openSearch"/>
  </div>
</template>

<style scoped lang="scss">
.searchButton{
    cursor: pointer;
}
</style>
