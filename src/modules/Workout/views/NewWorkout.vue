<script setup>
import {onMounted, ref, watch} from 'vue'
import Swal from "sweetalert2";
import {useNewWorkoutStore} from "@/shared/store/newWorkoutStore.js";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRouter} from "vue-router";

const router = useRouter()

//state refs
const categories = ref([])
const isMovementListOpen = ref(false)
const currentMovementIndex = ref(0)
const movementSearchString = ref(null)

//Pinia store
const newWorkoutStore = useNewWorkoutStore()

/**
 * Get categories composable
 */
const {data: categoryData, loading: categoryLoading, error: categoryError, makeRequest: getCategories} = useAxios()

/**
 * If it fails to get categories
 */
watch(categoryError, value => {
  if (value)
    Swal.fire({
      icon: 'error',
      text: value?.response?.data?.detail
    })
})

/**
 * If categories are fetched successfully
 * Map through the array and add label and value field for use in maz select input
 */
watch(categoryData, value => {
  if (value)
    categories.value = value.map(item => ({...item, label: item.title, value: item.id}))
})


/**
 * Fetch categories on mount
 */
onMounted(() => {
  getCategories({
    url: "category",
    method: "GET"
  })
})


/**
 * Composable to get an array of movements by a search string
 */
const {data: movementData, error: movementError, loading: movementLoading, makeRequest: getMovements} = useAxios()


/**
 * If it succeeds to get some movement data
 */
watch(movementData, value => {
  if (value)
    isMovementListOpen.value = true
})


/**
 * Composable to save the workout to the database
 */
const {
  data: saveWorkoutData,
  loading: saveWorkoutLoading,
  error: saveWorkoutError,
  makeRequest: saveWorkoutRequest
} = useAxios()


/**
 * If there's an error in saving the workout to the database fire a sweet alert
 */
watch(saveWorkoutError, value => {
  if (value)
    Swal.fire({
      icon: 'error',
      text: value?.response?.data?.detail
    })
})


/**
 * If the request to save a workout succeeds fire a sweet alert and clear the pinia store and reload since state is persisted
 */
watch(saveWorkoutData, value => {
  if (value)
    Swal.fire({
      icon: "success",
    }).then(() => {
      newWorkoutStore.$reset()
      window.location.reload()
    })
})

/**
 * Submit handler
 * Sends a POST request to the database with the workout data
 * @param evt
 * @returns {Promise<void>}
 */
const saveWorkout = (evt) => {
  evt.preventDefault()
  Swal.fire({
    icon: "question",
    text: "Do you want to save this workout?",
    showDenyButton: true
  }).then(res => {
    if (res.isConfirmed)
      saveWorkoutRequest({
        url: "workouts",
        method: "POST",
        data: newWorkoutStore.getPostObject
      })
  })

}


/**
 * Handler for + icon. creates an empty movement in store
 */
const startNewMovement = () => {
  newWorkoutStore.appendMovement({})
  currentMovementIndex.value = newWorkoutStore.movements.length - 1
  movementSearchString.value = null
  isMovementListOpen.value = false
}

/**
 * Left chevron click handler
 */
const previousMovement = () => {
  currentMovementIndex.value = currentMovementIndex.value === 0 ? 0 : currentMovementIndex.value - 1
}

/**
 * Right chevron click handler
 */
const nextMovement = () => {
  currentMovementIndex.value = currentMovementIndex.value + 1
}


/**
 * Handles clicks of a data list item
 * If Movement already exists pop it from the list
 * @param movementObject
 */
const handleMovementClick = (movementObject) => {
  const found = newWorkoutStore.movements.findIndex(item => item.movementId == movementObject.id)
  if (found > -1) {
    Swal.fire({
      icon: "error",
      text: `The ${name} exercise has already been added`
    }).then(() => {
      handleCancel()
    })
  } else {
    // pinia action that adds name and id of the movement object
    newWorkoutStore.addMovementNameAndID({
      name: movementObject.name,
      id: movementObject.id,
      index: currentMovementIndex.value
    })
  }


  // hide the data list
  isMovementListOpen.value = false
}

/**
 * Cancel button handler
 */
const handleCancel = () => {
  movementSearchString.value = ""
  newWorkoutStore.removeMovementObject(currentMovementIndex.value)
  currentMovementIndex.value = currentMovementIndex.value === 0 ? 0 : currentMovementIndex.value - 1
  isMovementListOpen.value = false
}


</script>

<template>
  <form class="grid grid-cols-1 md:grid-cols-2 py-8 gap-8 max-w-6xl" @submit="saveWorkout">
    <p class="text-2xl md:col-span-2">New workout</p>
    <picker
        v-model="newWorkoutStore.date"
        class="w-full"
        label="Date"
        required
    />
    <maz-select
        v-model="newWorkoutStore.categoryId"
        :options="categories"
        label="Category"
        required
    />

    <div
        v-if="newWorkoutStore?.movements[currentMovementIndex]?.movementId"
        class="my-badge capitalize flex items-center relative md:col-span-2">{{
        newWorkoutStore?.movements[currentMovementIndex]?.name
      }}
    </div>

    <div v-else class="flex flex-col relative w-full">
      <maz-input
          id="movement"
          v-model="movementSearchString"
          autocomplete="new-password"
          list="movement"
          placeholder="Movement"
          type="text"
          @keyup="getMovements({url: `/movement/${$event.target.value}`})"
      />
      <datalist
          v-if="isMovementListOpen"
          id="movement"
          class="w-full flex flex-col gap-2 border-[1px] px-2 py-2 rounded-b-lg min-h-8 absolute top-12 z-10 bg-white"
      >
        <option
            class="cursor-pointer"
            v-for="move in movementData"
            :key="move.name"
            :value="move.name"
            @click="handleMovementClick(move)">
          {{ move.name }}
        </option>
      </datalist>
    </div>

    <maz-input
        v-model="newWorkoutStore.movements[currentMovementIndex].sets"
        label="Sets"
        required
        type="Number"/>
    <maz-input
        v-model="newWorkoutStore.movements[currentMovementIndex].reps"
        label="Reps"
        required
        type="Number"/>
    <maz-input
        v-model="newWorkoutStore.movements[currentMovementIndex].secondsOfRest"
        label="Seconds of rest"
        required
        type="Number"/>

    <div class="md:col-span-2 flex justify-center  gap-12  mt-8">
      <fa-icon
          v-if="currentMovementIndex >0"
          class="w-6 h-6 text-cta"
          icon="fa-solid fa-circle-chevron-left"
          @click="previousMovement"
      />
      <fa-icon
          v-if="currentMovementIndex === newWorkoutStore.movements.length-1"
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


    <spinner
        v-if="categoryLoading || movementLoading || saveWorkoutLoading"
        class="place-self-center text-cta md:col-span-2"
        color="cta"
    />
    <button v-else class="primary-btn place-self-center md:col-span-2">save changes</button>
  </form>
</template>

<style scoped>
#movement {
  @apply border-[2px] rounded-lg border-slate-300 px-4 py-2 placeholder:text-primary;
}
</style>