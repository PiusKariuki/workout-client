<script setup>

import {onMounted, reactive} from "vue";
import {useFetch} from "@/shared/composables/Fetch.js";
import Swal from "sweetalert2";

const state = reactive({
  data: null,
  loading: false,
})

const getTodaysWorkout = async () => {
  state.loading = true
  const {data, loading, error} = await useFetch('/workouts/today')

  if (error.message)
    await Swal.fire({
      icon: "error",
      text: error?.message
    })
  state.loading = false

  state.data = data
}


onMounted(() => {
  getTodaysWorkout()
})

</script>

<template>
  <div class="flex flex-col rounded-xl border-[1px] border-cta shadow-lg shadow-cta px-4 py-4 gap-12 bg-secondary">
    <span v-if="state.loading" class="loading loading-ring loading-md self-center text-cta"></span>
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-6">
        <p class="font-medium text-xl">Today's Activities</p>
        <div class="my-badge">{{ state?.data?.category?.title }}</div>
      </div>
      <div
          class="radial-progress text-cta"
          style="--value:70; --size:6rem; --thickness: 2px;">
        70%
      </div>
    </div>

    <div class="flex justify-between items-end gap-16">
      <!--      calories-->
      <div class="flex flex-col w-full">
        <fa-icon class="w-4" icon="fa-solid fa-fire"/>
        <p class="">1200 kcal</p>
      </div>
      <!--   Time   -->
      <div class="flex flex-col w-full">
        <fa-icon class="w-4" icon="fa-solid fa-clock"/>
        <p class="">03:00 hr</p>
      </div>
    </div>

  </div>
</template>
