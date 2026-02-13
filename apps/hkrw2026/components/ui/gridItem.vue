<script setup lang="ts">
const props = withDefaults(defineProps<{
    img?:string,
    title?:string,
    url?:string,
    color:string,
    blank?:boolean
    item:any
}>(),{
    color: "#9f8bca"
})
const { tObj } = useLang()
const router = useRouter()
function navigate(item:any) {
    const url = !item ? props.url : item.url ? item.url : item.url_EN ? tObj('url_', item) : "#"
    if (url.includes('http')) {

        window.open(url, '_blank')
    } else {
        router.push({
            path: url
        })
    }
}
</script>

<template>
<div class="gridItem" @click="navigate(item)" :style="`--stroke-color: ${color}`">
    <div v-if="img" class="imgContainer">
        <img class="mainImg"  :src="imgUrlConverter(img)" />
        <div class="absoluteCOntainer" >
            <img :src="imgUrlConverter(img)" alt="">
        </div>
    </div>
    <div class="title">
        {{props.title}}
    </div>
</div>
</template>

<style scoped lang="scss">
.gridItem{
    display: flex;
    flex-flow: column nowrap;
    gap: 0px;
    cursor: pointer;
    &:hover{
        .imgContainer{
            border-bottom-left-radius: 0px;
        }
        .title {
            color: #fff;
            &:before {
                border-bottom-left-radius: 12px;
                width: 100%;
            }
        }
    }
}
.title{
    font-size: 1.3rem;
    font-weight: 500;
    padding: 12px;
    position: relative;
    isolation: isolate;
    &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background: var(--stroke-color);
        transition: all 0.2s ease-in-out;
        z-index: -1;
    }

}
.imgContainer{
    aspect-ratio: 16/9;
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    position: relative;
    .mainImg{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .absoluteCOntainer{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        opacity: 0.8;
        z-index: -1;
    }
}
</style>