<script setup>
import {ref, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import Swal from "sweetalert2";
import {useRoute} from "vue-router";

defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])


const route = useRoute()
const {workoutId} = route.params


//state refs
const sets = ref(null)
const reps = ref(null)
const rest = ref(null)
const movementId = ref(null)
const movementName = ref(null)
const searchString = ref(null)
const isDatalistOpen = ref(false)


const {data: movementData, error: movementError, loading: movementLoading, makeRequest: getMovements} = useAxios()

watch(movementData, value => {
  if (value)
    isDatalistOpen.value = true
})


/**
 * Handles clicks of a data list item
 * @param movementObject
 */
const handleMovementClick = (movementObject) => {

  movementName.value = movementObject.name
  movementId.value = movementObject.id

  // hide the data list
  isDatalistOpen.value = false
}

const {data: updateData, error: updateError, loading: updateLoading, makeRequest: updateRequest} = useAxios()

watch(updateData, value => {
  Swal.fire({
    icon: "success",
  }).then(() => {
    emits('update:modelValue')
  })
})

watch(updateError, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value?.response?.data?.detail
    })
})

/**
 * Sends update request
 * @returns {Promise<void>}
 */
const save = async () => {
  await updateRequest({
    url: `/movement/add_movement/${workoutId}`,
    method: 'PUT',
    data: {
      position: '1',
      workout_id: workoutId,
      new_workout_id: movementId.value,
      sets: sets.value,
      reps: reps.value,
      rest_in_seconds: rest.value
    }
  })
  //clear fields
  await clearMovement()
}

const clearMovement = () => {
  movementId.value = null
  movementName.value = null
  searchString.value = null
}

</script>

<template>
  <MazDialog
      :model-value="modelValue"
      title="New Workout"
      @update:model-value="$emit('update:modelValue')">
    <div class="flex flex-col gap-8">
      <div
          v-if="movementId"
          class="my-badge capitalize relative">
        {{ movementName }}
        <fa-icon
            class="absolute -top-2 -right-2 text-danger cursor-pointer"
            icon="fa-solid fa-circle-xmark" @click="clearMovement"/>
      </div>
      <div v-else class="flex flex-col relative w-full">
        <maz-input
            id="movement"
            v-model="searchString"
            autocomplete="new-password"
            list="movement"
            placeholder="Movement"
            type="text"
            @keyup="getMovements({url: `/movement/${$event.target.value}`})"
        />
        <datalist
            v-if="isDatalistOpen"
            id="movement"
            class="w-full flex flex-col gap-2 border-[1px] px-2 py-2 rounded-b-lg min-h-8 absolute top-12 z-10 bg-white"
        >
          <option
              v-for="move in movementData"
              :key="move.name"
              :value="move.name"
              @click="handleMovementClick(move)">
            {{ move.name }}
          </option>
        </datalist>
      </div>

      <div class="flex justify-between gap-4">
        <div class="flex flex-col w-fit items-center gap-4">
          <p class="my-badge">Sets</p>
          <maz-input
              v-model="sets"
              class="card-input"/>
        </div>
        <div class="flex flex-col w-fit items-center gap-4">
          <p class="my-badge">Reps</p>
          <maz-input
              v-model="reps"
              class="card-input"/>
        </div>
        <div class="flex flex-col w-fit items-center gap-4">
          <p class="my-badge">Rest</p>
          <maz-input
              v-model="rest"
              class="card-input"/>
        </div>
      </div>
    </div>
    <template #footer="{ close }">
      <div v-if="!updateLoading" class="flex w-full justify-between items-center">
        <button
            class="outline-btn"
            @click="close">Cancel
        </button>
        <button class="primary-btn" @click="save">
          Confirm
        </button>
      </div>
      <spinner v-else class="self-center text-cta" color="cta"/>

    </template>
  </MazDialog>
</template>

