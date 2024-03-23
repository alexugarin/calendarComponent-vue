<script setup>
import Header from './calendarHeader.vue'
import calendarGrid from './calendarGrid.vue'
import { ref, watch } from 'vue';

const props = defineProps({
    lang: {
        type: String,
        required: true,
    }
})

const lang = ref(props.lang)

watch(() => props.lang, (newLang) => { lang.value = newLang })
</script>

<template>
    <main>
        <Header :lang="lang" />
        <calendarGrid :lang="lang" />
    </main>

</template>

<style lang="less" scoped>
main {
    width: 380px;
    padding-bottom: 30px;
    border-radius: 5px;
    background-color: azure;
    box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.5);

    @media(max-width:500px) {
        width: 90vw;
    }
}
</style>
