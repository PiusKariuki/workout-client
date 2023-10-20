<script setup>

import {onMounted, ref} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRoute} from "vue-router";

const route = useRoute()

const {workoutId} = route.params

// state refs
const isComplete = ref(false)
const sets = ref(null)
const reps = ref(null)
const position = ref(null)
const rest = ref(null)
const edit = ref(false)


const props = defineProps(['move'])


onMounted(() => {
  isComplete.value = props.move.complete
  sets.value = props.move.sets
  reps.value = props.move.reps
  position.value = props.move.position
  rest.value = props.move.rest_in_seconds
})

const {data, loading, makeRequest, error} = useAxios()

const update = () => makeRequest({
  url: `movement?workout_id=${workoutId}&movement_id=${props.move.movement_id}`,
  method: 'PUT',
  data: {
    "completed": isComplete.value,
    "sets": sets.value,
    "reps": reps.value,
    "position": position.value,
    "rest_in_seconds": rest.value
  }
})

const toggleCheck = () => {
  isComplete.value = !isComplete.value
  update()
}


const handleEdit = async () => {
  if (edit.value)
    await update()
  
  edit.value = !edit.value
}


</script>

<template>
  <div
      class="flex flex-col w-full flex-shrink-0 rounded-lg shadow-md shadow-cta p-4 gap-6 border-[1px] border-slate-300">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <div class="flex items-center gap-2">
      <fa-icon icon="fa-solid fa-dumbbell"/>
      <p class="capitalize text-lg">{{ move.movement.name }}</p>
      <fa-icon
          :class="[isComplete ? 'text-success': '']"
          :icon="isComplete ? 'fa-regular fa-square-check': 'fa-regular fa-square'"
          class="ml-auto w-5 h-5"
          @click="toggleCheck"/>
    </div>
    <div class="flex items-cent justify-between">
      <div class="flex flex-col w-fit">
        <p class="my-badge">Sets</p>
        <maz-input
            v-model="sets"
            :disabled="!edit"
            class="card-input"/>
      </div>
      <div class="flex flex-col w-fit items-center">
        <p class="my-badge">Reps</p>
        <maz-input
            v-model="reps"
            :disabled="!edit"
            class="card-input"/>
      </div>
      <div class="flex flex-col w-fit items-center">
        <p class="my-badge">Rest</p>
        <maz-input
            v-model="rest"
            :disabled="!edit"
            class="card-input"/>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <button class="outline-btn text-danger shadow-danger">Delete</button>
      <button
          class="primary-btn"
          @click="handleEdit">
        {{ edit ? 'save' : 'edit' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.check {
  @apply border-cta ring-cta outline-cta;
}

.card-input {
  @apply w-16 ml-2 mt-2;
}
</style>
