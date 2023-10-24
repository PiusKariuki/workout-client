<script setup>
import {getDateString} from "../../../shared/helpers/dateOps.js";
import {useRouter} from "vue-router";
import {percentage} from "@/shared/helpers/getCompletionPercentage.js";

const router = useRouter()
defineProps(['workout'])
</script>

<template>
  <div class="flex flex-col gap-2 w-[65vw] flex-shrink-0">
    <div
        :style="{backgroundImage: `url(${workout?.category?.banner})`}"
        @click="router.push(`/workouts/${workout?.id}`)"
        class="flex flex-col rounded-lg  w-full relative gap-2  h-56 bg-center bg-cover">
      <div
          class="radial-progress bg-secondary/60 text-sm text-cta font-semibold ml-auto mt-2 mr-2"
          :style="{'--value': percentage(workout?.movement_links)}"
          style="--value:70; --size:3rem; --thickness: 3px;">
        {{percentage(workout?.movement_links)}}%
      </div>
    </div>
    <div class="flex items-center gap-6">
      <div class="font-semibold text-cta  capitalize">
        {{ workout.category?.title }}
      </div>
      <p class="">{{getDateString(workout.date)}}</p>
    </div>
  </div>
</template>