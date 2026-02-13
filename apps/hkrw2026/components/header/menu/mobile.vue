<script lang="ts" setup>
const props = defineProps<{menu:any[]}>()
const {tObj} = useLang({})
const route = useRoute()
const opened = ref(false);
const emit = defineEmits(['itemClick', 'menuToggle'])


function handleSelect(key: string, keyPath: string[]){
    if(!key) return
    let item ;
    props.menu.forEach( me => {
        if(me.url === key) {
            item = me;
            return
        } 
        if(me.subMenu.length > 0) {
            me.subMenu.forEach((su:any) => {
                if(su.url === key) {
                    item = su;
                    return
                } 
            })
        }
    });
    emit('itemClick', item);
    opened.value = false;
}
function toggleOpened() {
    opened.value = !opened.value
}
watch(opened, () => {
    emit('menuToggle', opened.value)
},{immediate:true})
</script>

<template>
<div class="mobileMenuContainer">
    <div class="toggleButton icon" @click="toggleOpened">
            <!-- <img class="icon" src="/menu.svg" @click="opened = true"/> -->
    </div>
    <div :class="{fullScreenMenu:true, opened}">
        <div class="closeIcon icon" @click="toggleOpened">
            <!-- <img class="icon" src="/close.svg" @click="opened = false"/> -->
        </div>
        <ElMenu @select="handleSelect">
            <template v-for="(item,index) in menu" :key="item.id">
                <template v-if="item.subMenu.length > 0">
                    <ElSubMenu :index="index.toString()">
                        <template #title>
                            <span>{{tObj("label_", item)}}</span>
                        </template>
                        <ElMenuItem v-for="subItem in item.subMenu" :key="subItem.id" :index="subItem.url">
                            <template #title>
                                <span>{{tObj("label_", subItem)}}</span>
                            </template>
                        </ElMenuItem>
                    </ElSubMenu>
                </template>
                <template v-else>
                    <ElMenuItem :index="item.url">
                        <template #title>
                            <span>{{tObj("label_", item)}}</span>
                        </template>
                    </ElMenuItem>
                </template>
            </template>
        </ElMenu>
        <div class="fullCenter">
            <HeaderSearch @search="toggleOpened" />
            <HeaderLang />
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.mobileMenuContainer{
    padding-right: 24px;
    position: relative;
}

.icon{
    width: 22px;
    height: 22px;
    background-size: cover;
    cursor: pointer;
}
.toggleButton{
    background-image: url('/menu.svg');
}
.closeIcon {
    background-image: url('/close.svg');
}
.fullCenter{
    width:100%;
    padding: var(--app-padding);

}
.fullScreenMenu{
    --el-menu-text-color: rgba(255,255,255,0.6);
    --el-menu-active-color: #fff;
    position: absolute;
    top:0;
    right:var(--app-padding);
    height: auto;
    width: 100vw;
    max-width: 480px;
    transform: translateY(-300vh);
    transition: all .3s ease-in-out;
    background: var(--menu-bg);
    backdrop-filter: blur(20px);
    opacity: 0;
    &.opened{
        opacity: 1;
        transform: translateY(0);
        display: block;
        overflow: auto;
    }
    @media( max-width: 480px) {
        position: fixed;
        right: 0;
        left:0;
        width: 100vw;
        height: 100vh;
        transition-delay: -0.2s;
        display: none;
    }
}
.closeIcon{
    position: absolute;
    top:12px;
    right: 12px;
}
.el-menu{
    --el-menu-sub-item-height: auto;
    margin-top: 60px;
    span {
        line-break: auto;
        white-space: break-spaces;
        line-height: 1.1;
    }
}
.el-menu--inline{
    .el-menu-item{
        margin-block: 12px;
    }
}
</style>