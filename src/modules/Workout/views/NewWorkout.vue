<script setup>
import {onMounted, reactive} from 'vue'
import {useFetch} from "@/shared/composables/Fetch.js";
import Swal from "sweetalert2";
import {useNewWorkoutStore} from "@/shared/store/newWorkoutStore.js";

const state = reactive({
  category: "",
  categories: [],
  loading: false,
  isMovementListOpen: false,
  currentMovementIndex: 0,
})

const newWorkoutStore = useNewWorkoutStore()


/**
 * Get movement by name query param
 * @param evt
 * @returns {Promise<void>}
 */
const getMovement = async (evt) => {
  // init loading
  state.loading = true
  // fetch movements if more than 2 letters are typed
  if (evt.target.value.length > 2) {
    const {data, error} = await useFetch(`/movement/${evt.target.value}`)

    // if an error occurs
    if (error.message) {
      await Swal.fire({
        icon: "error",
        text: error.message
      })
    } else {   // If request is successful
      state.movements = data
      state.isMovementListOpen = true
    }
  }
  // close the loading state
  state.loading = false
}

/**
 * Get all categories
 * @returns {Promise<void>}
 */
const getCategories = async () => {
  state.loading = true
  const {data, error} = await useFetch(`/category`)

  if (error.message)
    await Swal.fire({
      icon: "error",
      text: error.message
    })
  else
    state.categories = data.value.map(item => ({...item, label: item.title, value: item.id}))

  state.loading = false
}

/**
 * Handler for + icon. creates an empty movement in store
 */
const startNewMovement = () => {
  newWorkoutStore.appendMovement({})
  state.currentMovementIndex = newWorkoutStore.movements.length - 1
}

/**
 * Left chevron click handler
 */
const previousMovement = () => {
  state.currentMovementIndex = state.currentMovementIndex === 0 ? 0 : state.currentMovementIndex - 1
}

/**
 * Right chevron click handler
 */
const nextMovement = () => {
  state.currentMovementIndex = state.currentMovementIndex + 1
}


/**
 * Handles clicks of a data list item
 * @param movementObject
 */
const handleMovementClick = (movementObject) => {
  const found = newWorkoutStore.movements.findIndex(item => item.movementId == movementObject.id)
  if (found > -1) {
    Swal.fire({
      icon: "error",
      text: `The ${name} exercise has already been added`
    }).then(()=>{
      newWorkoutStore.removeMovement(state.currentMovementIndex)
    })
  } else {
    // pinia action that adds name and id of the movement object
    newWorkoutStore.addMovementNameAndID({
      name: movementObject.name,
      id: movementObject.id,
      index: state.currentMovementIndex
    })
  }


  // hide the data list
  state.isMovementListOpen = false
}

/**
 * Cancel button handler
 */
const handleCancel = () =>{
  newWorkoutStore.removeMovement(state.currentMovementIndex)
  state.currentMovementIndex = state.currentMovementIndex === 0 ? 0 : state.currentMovementIndex - 1
}

/**
 * Submit handler
 * @param evt
 * @returns {Promise<void>}
 */
const saveWorkout = async (evt) => {
  evt.preventDefault()
  state.loading = true
  const {data, responseError} = await useFetch(`/workouts`, {method: 'POST', data: newWorkoutStore.getPostObject})

  if (responseError.value)
    await Swal.fire({
      icon: "error",
      text: responseError.value.detail
    })
  if (data.value) {
    Swal.fire({
      icon: "success"
    }).then(() => {
      newWorkoutStore.$reset()
    })
  }

  state.loading = false
}


onMounted(() => {
  getCategories()
})


</script>

<template>
  <form autocomplete="off" class="grid md:grid-cols-2 py-8 gap-8" @submit="saveWorkout">
    <p class="text-2xl md:col-span-2">New workout</p>
    <picker v-model="newWorkoutStore.date" label="Date" required/>
    <maz-select v-model="newWorkoutStore.categoryId" :options="state.categories" label="Category" required/>
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <p class="text-lg">Movements</p>
        <button
            class="outline-btn"
            type="button"
            @click="handleCancel">
          Cancel
        </button>
      </div>
      <form class="flex flex-col relative gap-4">
        <maz-input
            id="movement"
            :value="newWorkoutStore?.movements[state.currentMovementIndex].name"
            autocomplete="new-password"
            label="Name"
            list="movement"
            placeholder="Start typing"
            @keyup="getMovement"
        />
        <datalist
            v-if="state.isMovementListOpen"
            id="movement"
            class="w-full flex flex-col gap-2 border-[1px] px-2 py-2 rounded-b-lg min-h-8 absolute top-12 z-10 bg-white"
        >
          <option
              v-for="move in state.movements"
              :key="move.name"
              :value="move.name"
              @click="handleMovementClick(move)">
            {{ move.name }}
          </option>
        </datalist>

        <maz-input
            v-model="newWorkoutStore.movements[state.currentMovementIndex].sets"
            label="Sets"
            required
            type="Number"/>
        <maz-input
            v-model="newWorkoutStore.movements[state.currentMovementIndex].reps"
            label="Reps"
            required
            type="Number"/>
        <maz-input
            v-model="newWorkoutStore.movements[state.currentMovementIndex].secondsOfRest"
            label="Seconds of rest"
            required
            type="Number"/>

        <div class="flex justify-center gap-12  mt-8">
          <fa-icon
              v-if="state.currentMovementIndex >0"
              class="w-6 h-6 text-cta"
              icon="fa-solid fa-circle-chevron-left"
              @click="previousMovement"
          />
          <fa-icon
              v-if="state.currentMovementIndex === newWorkoutStore.movements.length-1"
              class="w-6 h-6 text-cta"
              icon="fa-solid fa-circle-plus"
              @click="startNewMovement"
          />
          <fa-icon
              v-else
              class="w-6 h-6 text-cta"
              icon="fa-solid fa-circle-chevron-right"
              @click="nextMovement"
          />
        </div>
      </form>


    </div>
    <spinner v-if="state.loading" class="place-self-center text-cta" color="cta"/>
    <button v-else class="primary-btn place-self-center">save changes</button>

  </form>
</template>

<style scoped>

</style>