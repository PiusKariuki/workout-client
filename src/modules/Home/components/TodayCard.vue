<script setup>

import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {percentage} from "../../../shared/helpers/getCompletionPercentage.js";

const router = useRouter()


const {makeRequest, data, loading} = useAxios()


onMounted(() => {
  makeRequest({
    url: "/workouts/today",
    method: "GET"
  })
})

</script>

<template>
  <div class="flex flex-col">
    <div
        :style="{backgroundImage: `url(${data?.category?.banner})`}"
        :class="[data?.id ? 'min-h-[200px] md:min-h-[300px]': 'hidden']"
        class="flex flex-col rounded-xl border-[1px] border-cta shadow-lg shadow-cta px-4 py-4 gap-12 bg-secondary
       bg-center bg-cover max-w-4xl cursor-pointer"
        @click="data?.id && router.push({name: 'workout-details', params: {workoutId: data.id}})"
    >
      <spinner v-if="loading" class="self-center text-cta" color="cta"/>
      <div v-if="data?.id" class="flex justify-between items-center">
        <div class="flex flex-col gap-6">
          <p class="md:text-xl bg-secondary text-primary  px-4 py-1 rounded-md">Today's Activities</p>
          <div class="my-badge text-cta">{{data?.category?.title }}</div>
        </div>
        <div
            class="radial-progress bg-secondary/70 text-cta font-semibold "
            :style="{'--value': percentage(data?.movement_links)}"
            style="--size:4rem; --thickness: 3px;">
          {{percentage(data?.movement_links)}}%
        </div>
      </div>
      <div
          @click="router.push({name: 'new-workout'})"
          v-if="!loading && !data?.id"
          class="flex self-center justify-center my-auto cursor-pointer text-cta">
        Click here to create a workout
      </div>
    </div>
  </div>

</template>
