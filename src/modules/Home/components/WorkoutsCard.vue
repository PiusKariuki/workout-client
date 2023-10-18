<script setup>
import {getDateString} from "../../../shared/helpers/dateOps.js";

defineProps(['workout'])
</script>

<template>
  <div class="flex flex-col rounded-lg w-10/12 relative gap-2 flex-shrink-0">
    <div class="my-badge rounded-l-none bg-secondary/80 text-cta absolute top-4 left-0 capitalize">
      {{ workout.category.title }}
    </div>
    <img
        alt=""
        class="w-full object-cover h-56 rounded-xl object-top"
        :src="workout.category.banner">
    <p class="font-semibold">{{getDateString(workout.date)}}</p>
  </div>
</template>