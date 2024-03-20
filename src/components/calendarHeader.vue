<script setup>
import chev from '../assets/chev.svg'
import {inject, ref, watch} from 'vue'

const MONTHS = {
    Jan: 'January',
    Feb: 'February',
    Mar:'March',
    Apr:'April',
    May:'May',
    Jun:'June',
    Jul:'July',
    Aug:'August',
    Sep:'September',
    Oct:'October',
    Nov:'November',
    Dec:'December'
}

const {state, dispatch}  = inject('store');

const [_, month, __, year] = state.value.date.dateString.split(' ')
const current = ref({
    month: MONTHS[month],
    year
})

watch(()=> state.value.date, (updatedDate)=>{
    const [_, month, __, year] = updatedDate.dateString.split(' ')
    current.value = {
        month: MONTHS[month],
        year
    }
})

const handleClick = (direction)=>{ dispatch({type:'updateDate', payload:{direction}}) }
</script>

<template>
    <div class="header">
        <div class="wrapper">
            <div class="left-chev chev">
                <img :src="chev" alt="left-chevron" @click="handleClick">
            </div>
            <div class="month">
                <h2>{{current.month }} {{ current.year }}</h2>
            </div>
            <div class="right-chev chev">
                <img :src="chev" alt="right-chevron" @click="handleClick('next-month')">
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header{
    display: flex;
    flex-direction: column;
    background-color: #00a2ff;
    border-radius: 5px 5px 0 0;
    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-inline: 10px;
        .month {
            h2 {
                font-size: 24px;
                font-weight: bolder;
                letter-spacing: 5.5px;
            }
        }
        .chev {
            user-select: none;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: background-color .5s;
            &:hover {
                background-color: #0080ff;
            }
            img {
                width: 100%;
                height: auto;
                transform: translateX(2px);
            }
        }
        .left-chev {
            transform: rotate(180deg);
        }
    }
}
</style>>