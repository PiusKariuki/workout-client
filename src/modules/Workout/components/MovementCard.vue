<script setup>

import {ref, watch} from "vue";

const props = defineProps(['move'])
const isComplete = ref(false)

const toggleCheck = () => isComplete.value = !isComplete.value


watch(() => props.move.complete, value => isComplete.value = value)

</script>

<template>
  <div class="flex flex-col w-full flex-shrink-0 rounded-lg shadow-md shadow-cta p-4 gap-4">
    <div class="flex items-center gap-2">
      <fa-icon icon="fa-solid fa-dumbbell"/>
      <p class="capitalize text-lg">{{ move.movement.name }}</p>
      <fa-icon
          @click="toggleCheck"
          class="ml-auto w-5 h-5"
          :class="[isComplete ? 'text-green-500': '']"
          :icon="isComplete ? 'fa-regular fa-square-check': 'fa-regular fa-square'"  />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-col w-full">
        <p class="my-badge">Sets</p>
        <p class="capitalize text-lg px-4">{{ move.sets }}</p>
      </div>
      <div class="flex flex-col w-full">
        <p class="my-badge">Reps</p>
        <p class="capitalize text-lg px-4">{{ move.reps }}</p>
      </div>
      <div class="flex flex-col w-full">
        <p class="my-badge">Rest</p>
        <p class="capitalize text-lg px-4">{{ move.rest_in_seconds }}s</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.check {
  @apply border-cta ring-cta outline-cta;
}
</style>
