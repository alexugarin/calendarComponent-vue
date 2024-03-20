<script setup>
import calendar from "./components/calendarComponent.vue";
import {inject} from 'vue'
const {state, dispatch} = inject('store')
</script>

<template>
  <div>
    <calendar/>
    <div v-if="state.current.currentDate">{{`${state.current.currentDate>9?state.current.currentDate:'0'+state.current.currentDate}.${state.current.currentMonth>9?state.current.currentMonth:'0'+state.current.currentMonth}.${state.current.currentYear}`}}</div>
  </div>
</template>

<style scoped lang="less">
  div{
  
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
  display:flex;
  gap:40px;

  }
</style>
