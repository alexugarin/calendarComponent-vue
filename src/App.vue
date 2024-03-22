<script setup>
import calendar from "./components/calendarComponent.vue";
import {inject, ref} from 'vue'
const {state} = inject('store')

const lang = ref('en');
const switchLanguage = () => {
    switch (lang.value) {
        case 'en': {lang.value='ru'};  break;
        case 'ru': lang.value='en';  break;
    }
    console.log(lang.value)
}

</script>

<template>
  <div>
    <calendar :lang="lang"/>
    <div v-if="state.current.currentDate">
      {{`${state.current.currentDate>9?state.current.currentDate:'0'+state.current.currentDate}.${state.current.currentMonth>9?state.current.currentMonth:'0'+state.current.currentMonth}.${state.current.currentYear}`}}
      </div>
    <button class="switchLanguage" @click="switchLanguage">{{lang}}</button>
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
