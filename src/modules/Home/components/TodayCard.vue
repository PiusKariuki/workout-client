<script setup>

import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {percentage} from "../../../shared/helpers/getCompletionPercentage.js";

const router = useRouter()


const {makeRequest, data, loading, error} = useAxios()



onMounted(() => {
  makeRequest({
    url: "/workouts/today",
    method: "GET"
  })
})

</script>

<template>
  <div class="flex flex-col">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <div
        v-if="data?.id"
        :style="{backgroundImage: `url(${data?.category?.banner})`}"
        class="flex flex-col rounded-xl border-[1px] border-cta shadow-lg shadow-cta px-4 py-4 gap-12 bg-secondary
       bg-center bg-cover max-w-3xl cursor-pointer h-60 md:h-80 lg:h-96"
        @click="data?.id && router.push({name: 'workout-details', params: {workoutId: data.id}})"
    >
      <div v-if="data?.id" class="flex justify-between items-center">
        <div class="flex flex-col gap-6">
          <p class="md:text-xl bg-secondary text-primary  px-4 py-1 rounded-md">Today's Activities</p>
          <div class="my-badge text-cta">{{ data?.category?.title }}</div>
        </div>
        <div
            v-if="data.movement_links.length >0"
            :style="{'--value': percentage(data?.movement_links)}"
            class="radial-progress bg-secondary/70 text-cta font-semibold "
            style="--size:4rem; --thickness: 3px;">
          {{ percentage(data?.movement_links) }}%
        </div>
      </div>
    </div>


    <div
        v-if="!loading && !data?.id"
        class="flex relative w-full py-16">
      <div
          class="flex bg-[url('https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
          h-96 w-full bg-center bg-cover rounded-xl max-w-xl shadow-cta shadow-md"/>

      <div
          class="flex flex-col shadow-md shadow-cta absolute left-1/2  top-1/2 -translate-y-1/2 md:left-[60%] rounded-xl
          -translate-x-1/2 z-10 p-8 lg:py-16 gap-8 w-10/12 lg:w-6/12 bg-secondary/90 md:bg-secondary">
        <p class="text-lg">Get after it today.</p>
        <p class="italic font-light">"Motivation is a fleeting spark; discipline is the enduring flame that lights the way to success."</p>
        <button
            @click="router.push({name: 'new-workout'})"
            class="primary-btn">Plan your workout for the day</button>
      </div>

    </div>


  </div>

</template>




