<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getTodaysDate} from "@/modules/NewWorkout/helpers/getTodaysDate.js";
import {useFetch} from "@/shared/composables/Fetch.js";
import Swal from "sweetalert2";

const state = reactive({
  category: "",
  sets: null,
  categories: [],
  loading: false,
  currentMovementName: "",
  currentMovementId: "",
  currentSets: null,
  currentReps: null,
  currentSecondsOfRest: "",
  isMovementListOpen: false
})

const dateValue = ref("")

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
    state.categories = data.value.map(item => ({...item, label: item.title, value: item.title}))

  state.loading = false
}


const saveWorkout = async (name) => {
  state.loading = true

  const {data, error} = await useFetch(`/movement?name=${name}`)

  if (error.message)
    await Swal.fire({
      icon: "error",
      text: error.message
    })

  state.categories = data

  state.loading = false
}


/**
 * Handles clicks of a data list item
 * @param movementObject
 */
const handleMovementClick = (movementObject) => {
  state.currentMovementId = movementObject.id
  state.currentMovementName = movementObject.name
  state.isMovementListOpen = false
}


onMounted(() => {
  dateValue.value = getTodaysDate()
  getCategories()
})


</script>

<template>
  <form class="grid md:grid-cols-2 py-8 gap-8">
    <p class="text-2xl md:col-span-2">New workout</p>
    <picker v-model="dateValue" label="Date"/>
    <maz-select v-model="state.category" :options="state.categories" label="Category"/>
    <div class="flex flex-col gap-4">
      <p class="text-lg">Movements</p>
      <div class="flex flex-col relative">
        <maz-input
            id="movement"
            v-model="state.currentMovementName"
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
      </div>

      <maz-input v-model="state.sets" label="Sets" type="Number"/>
      <maz-input v-model="state.reps" label="Reps" type="Number"/>
      <maz-input v-model="state.rest" label="Seconds of rest" type="Number"/>
      <div class="flex justify-center gap-12  mt-8">
        <fa-icon class="w-6 h-6 text-cta" icon="fa-solid fa-circle-chevron-left"/>
        <fa-icon class="w-6 h-6 text-cta" icon="fa-solid fa-circle-chevron-right"/>
      </div>
    </div>

  </form>
</template>

<style scoped>

</style>