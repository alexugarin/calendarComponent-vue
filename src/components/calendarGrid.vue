<script setup>
import {DAYS} from '../store/store.js'
import {ref, inject, watch} from 'vue'

const props = defineProps({lang:{type: String,
   required: true,}})
const lang = ref(props.lang)

const DAYS_RU = ['Сб', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Вс']

const {state, dispatch}  = inject('store');

const current = ref(state.value.current);

const setCurrentDate = (date) => dispatch({type: 'clickDate', payload: {date}});

watch(()=> state.value.current, (newCurrent)=>{current.value = newCurrent})

watch(() => props.lang, (newLang)=>{lang.value = newLang})


</script>

<template>
  <div class="calendar-grid">
        <div class="days-grid">
            <div v-for="day, index in lang==='en'?DAYS:DAYS_RU" 
                :key="index"
                :class="['day']" 
                :title="day">
                    {{ day }}
            </div>
        </div>
        <div class="date-grid">
            <div class="date" 
                v-for="date in state.dateGrid" 
                :key="date.id">
                    <div :class="['val', { today: date.dt === current.currentDate }]" 
                        v-if="date.dt"
                        @click="setCurrentDate(date)">
                            {{ date.dt }}
                    </div>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.calendar-grid {
    margin-top: 15px;
    display: grid;
    user-select: none;
    .days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        justify-content: space-between;
        align-items: center;
        .day {
            text-align: center;
            font-weight: bold;
        }
    }
    .date-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        justify-content: space-between;
        align-items: center;
        .date {
            display: flex;
            justify-content: center;
            cursor: pointer;
            .val {
                width: 20px;
                height: 20px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 15px;
                position: relative;
                &.today {
                    color: #0ca2f9;
                    font-weight: bold;
                    outline: 1px solid #0ca2f9;
                }
                
            }
        }
    }
}
</style>