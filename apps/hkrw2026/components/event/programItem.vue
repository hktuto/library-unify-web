<script setup lang="ts">
const props = defineProps<{
    program:any
}>()

const {t, tObj} = useLang({
    ...props.program,
    tableDateEN:"Programme Date/Time",
    tableLocationEN:"Venue",
    tableRegisterEN:"Registration / Enquiry",
    tablePeriodEN:"Registration Period",
    tableDateHK:"活動日期及時間",
    tableLocationHK:"地點",
    tableRegisterHK:"報名及查詢",
    tablePeriodHK:"報名日期",
    tableHostEN:"Host",
    tableTargetEN:"Target",
    tableQuotaEN:"Quota",
    tableHostHK:"講者/主持",
    tableTargetHK:"對象",
    tableQuotaHK:"名額",
    addToCalendarHK:"加入行事曆",
    addToCalendarEN:"Add to calendar",
})
</script>

<template>
    <div class="programItem">
        <slot name="header"/>
        <div v-if="program.name_EN" class="eventContent">
            
            <div class="content mainColor" v-html="tObj('name_', program)"></div>
        </div>
        <div v-if="program.displayTime_EN" class="eventContent">
            <div class="label">{{ t('tableDate') }}</div>
            <div class="content mainColor" v-html="tObj('displayTime_', program)"></div>
        </div>
        <div v-if="program.location_EN" class="eventContent">
            <div class="label">{{ t('tableLocation') }}</div>
            <div class="content mainColor" v-html="tObj('location_', program)"></div>
        </div>
        <div v-if="program.target_EN" class="eventContent" >
            <div class="label">{{ t('tableTarget') }}</div>
            <div class="content" v-html="tObj('target_', program)"></div>
        </div>
        <div v-if="program.quota_EN" class="eventContent">
            <div class="label">{{ t('tableQuota') }}</div>
            <div class="content" v-html="tObj('quota_', program)"></div>
        </div>
        <div v-if="program.register_EN" class="eventContent">
            <div class="label">{{ t('tableRegister') }}</div>
            <div class="content" v-html="tObj('register_', program)"></div>
        </div>
        <div v-if="program.period_EN" class="eventContent">
            <div class="label">{{ t('tablePeriod') }}</div>
            <div class="content" v-html="tObj('period_', program)"></div>
        </div>

        <slot name="footer"/>
    </div>
</template>

<style scoped lang="scss">
.programItem{
    padding: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    gap: 12px;
}
.eventContent{}
.mainColor{
    color: #2389cb;
}
</style>