<script setup>

import {onMounted, ref, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRoute} from "vue-router";
import Swal from "sweetalert2";

const route = useRoute()

const {workoutId} = route.params

// state refs
const isComplete = ref(false)
const sets = ref(null)
const reps = ref(null)
const position = ref(null)
const rest = ref(null)
const edit = ref(false)

// props and emits
const props = defineProps(['move'])
const emits = defineEmits(['refetch'])

/**
 * Initialize state ref according to the props passed
 */
const initState = () => {
  isComplete.value = props.move.complete
  sets.value = props.move.sets
  reps.value = props.move.reps
  position.value = props.move.position
  rest.value = props.move.rest_in_seconds
}

onMounted(() => {
  initState()
})

const {loading, makeRequest: makeUpdateRequest, error: updateError} = useAxios()

watch(updateError, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value?.response?.data?.detail
    })
})

/**
 * Anonymous function to initialize  the config object in the update request
 * @returns {*}
 */
const update = async () => {
  await makeUpdateRequest({
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
  await emits('refetch')

}

/**
 * Handler when you click the checkbox
 */
const toggleCheck = () => {
  isComplete.value = !isComplete.value
  update()
}


/**
 * Edit click handler
 * Sends an update request if then toggles the edit state ref to make the inputs active or active
 * @returns {Promise<void>}
 */
const handleEdit = async () => {
  if (edit.value)
    await update()
  edit.value = !edit.value
}

const {loading: deleteLoading, makeRequest: makeDeleteRequest} = useAxios()

/**
 * Delete handler
 * sends a delete http request to delete the workout
 * An intermediate confirmation step is included
 * @returns {Promise<void>}
 */
const handleDelete = async () => {
  Swal.fire({
    icon: "question",
    text: `Are you sure you want to delete ${props.move.movement.name}`,
    showDenyButton: true
  }).then(async (res) => {
    if (res.isConfirmed) {
      await makeDeleteRequest({
        url: `movement/${workoutId}/${props.move.movement_id}`,
        method: 'DELETE'
      })
      emits('refetch')
    }
  })
}

/**
 * Cancel handler for updates
 * returns the state ref to their initial values
 */
const handleCancel = () => {
  edit.value = false
  initState()
}


</script>

<template>
  <div
      class="flex flex-col w-full flex-shrink-0 rounded-lg shadow-md shadow-cta p-4 gap-6 border-[1px] border-slate-300">

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
      <div class="flex flex-col w-fit items-center">
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
    <spinner v-if="loading || deleteLoading" class="self-center text-cta" color="cta"/>
    <div v-else class="flex justify-between items-end">
      <button
          class="outline-btn "
          @click="handleDelete">
        Delete
      </button>


      <button
          class="primary-btn ml-auto"
          @click="handleEdit">
        {{ edit ? 'save' : 'edit' }}
      </button>
      <button
          v-if="edit"
          class="outline-btn ml-2"
          @click="handleCancel">Cancel
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
