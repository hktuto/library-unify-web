<script setup lang="ts">

</script>

<template>
    <div class="gridContainer innerGrid">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.gridContainer{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 12px;
    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
}
</style>