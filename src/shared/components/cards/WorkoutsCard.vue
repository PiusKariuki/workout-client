<script setup>
import {useRouter} from "vue-router";
import {getDateString} from "../../helpers/dateOps.js";
import {percentage} from "@/shared/helpers/getCompletionPercentage.js";

const router = useRouter()
defineProps(['workout'])
</script>

<template>


  <div
      @click="router.push({name: 'workout-details', params: {workoutId: workout.id}})"
      class="flex flex-col gap-4 w-full h-80 flex-shrink-0 cursor-pointer ">
    <div
        :style="{backgroundImage: `url(${workout?.category?.banner})`}"
        class="flex flex-col h-full   bg-center bg-cover  p-8 shadow-cta shadow-md group relative rounded-xl"
        @click="router.push({name: 'workout-details', params: {workoutId: workout.id}})">
      <div
          v-if="workout?.movement_links.length >0"
          :style="{'--value': percentage(workout?.movement_links)}"
          class="radial-progress bg-secondary/70 text-cta text-xs font-semibold absolute right-2 top-2 "
          style="--size:2.5rem; --thickness: 2px;">
        {{ percentage(workout?.movement_links) }}%
      </div>
    </div>

    <div class="flex  items-center justify-between text-lg px-2">
      <div class="flex items-center gap-2">
        <fa-icon class="text-cta" icon="fa-solid fa-dumbbell"/>
        <p class="capitalize">{{ workout.category?.title }}</p>
      </div>
      <div class="flex items-center gap-2">
        <fa-icon class="text-cta" icon="fa-regular fa-calendar-days"/>
        <p class="">{{ getDateString(workout.date) }}</p>
      </div>
    </div>


  </div>

</template>

