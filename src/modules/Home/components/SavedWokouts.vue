<script setup>

import HistoryCard from "@/modules/Home/components/WorkoutsCard.vue";
import Swal from "sweetalert2";
import {onMounted, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";


const {data, loading, error, makeRequest} = useAxios()


watch(()=>error, value=>{
  if(value)
    Swal.fire({
      icon: "error",
      text: value.response.detail
    })
})

onMounted(()=>{
  makeRequest({
    url: '/workouts/?limit=20&offset=0',
    method: 'GET'
  })
})
</script>

<template>
  <div class="flex flex-col p-4 w-full">
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold">Saved workouts</p>
      <router-link
          to="/history"
          class="text-cta font-semibold">See All</router-link>
    </div>
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <div class="flex w-full py-8 overflow-x-scroll gap-8">
      <HistoryCard v-for="item in data" :workout="item" :key="item.id"/>
    </div>
  </div>
</template>