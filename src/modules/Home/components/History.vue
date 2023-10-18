<script setup>

import HistoryCard from "@/modules/Home/components/HistoryCard.vue";
import {useFetch} from "@/shared/composables/Fetch.js";
import Swal from "sweetalert2";
import {onMounted, reactive} from "vue";


const state = reactive({
  data: [],
  loading: false
})

/**
 * Get history
 * @returns {Promise<void>}
 */
const getHistory = async () => {
  state.loading = true

  const {data, responseError} = await useFetch('/workouts')

  if (responseError.value) {
    Swal.fire({
      icon: "error",
      text: responseError.value.detail
    })
  } else {
    state.data = data.value
  }
  state.loading = false
}


onMounted(()=>{
  getHistory()
})
</script>

<template>
  <div class="flex flex-col p-4 w-full">
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold">History</p>
      <p class="text-cta font-semibold">See All</p>
    </div>
    <spinner v-if="state.loading" class="self-center text-cta" color="cta"/>
    <div class="flex w-full py-8 overflow-x-scroll gap-8">
      <HistoryCard v-for="item in state.data" :workout="item" :key="item.id"/>
    </div>
  </div>
</template>