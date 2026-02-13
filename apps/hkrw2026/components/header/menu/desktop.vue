<script lang="ts" setup>
const props = defineProps<{menu:any[]}>()
const {tObj} = useLang({})
const route = useRoute()

const emit = defineEmits(['itemClick', ])
function isActive(item:any){
  if(item.url === '/') return route.path === item.url
  return route.path.includes(item.url)
}

</script>


<template>
<div class="menuItemContainer">
    <div v-for="item in menu" :key="item.id" :class="{menuItem:true, active: isActive(item)}" @click="$emit('itemClick',item)">
        <div class="label">
            
            {{tObj("label_", item)}}
        </div>
        <template v-if="item.subMenu.length > 0">
            <div class="subMenuContainer">
                <div class="subMenuItem" v-for="subItem in item.subMenu" :key="subItem.id" @click="$emit('itemClick',subItem)">
                    <div class="label">
                        
                    {{tObj("label_", subItem)}}
                    </div>
                </div>
            </div>
        </template>
    </div>
</div>
</template>


<style lang="scss" scoped>

.subMenuContainer{
    position: absolute;
    top: 40px;
    left: 0;
    background: rgba(255,255,255,0.95);
    padding: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    backdrop-filter: blur(10px);
    transform: translateY(-100vh);
    z-index: -1;
    width: max-content;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    opacity:0;
}
.subMenuItem{
    &:hover{
        .label{

            color: #9F8ACB;
            font-weight: 700;
        }
    }
}
.menuItem{
    padding: 4px 12px;
    cursor: pointer;
    position: relative;
    &:focus-within {
        .subMenuContainer{
            transform: translateY(0);
            opacity:1;
        }
    }
    &:hover{
        > .label{

            color: #9F8ACB;
            font-weight: 700;
        }
        .subMenuContainer{
            transform: translateY(0);
            opacity:1;
        }
    }
    &.active{
         > .label{

            color: #9F8ACB;
            font-weight: 700;
            cursor: initial;
        }
    }

}
.menuItemContainer{
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
  align-items: center;
  padding-inline: 12px;
  font-size: 1rem;
  .menuItem + .menuItem{
    border-left: 1px solid #000
  }
}

</style>