<script setup>
import {onMounted, reactive, watch} from 'vue'
import Swal from "sweetalert2";
import {useNewWorkoutStore} from "@/shared/store/newWorkoutStore.js";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRouter} from "vue-router";

const router = useRouter()

const state = reactive({
  category: "",
  categories: [],
  loading: false,
  isMovementListOpen: false,
  currentMovementIndex: 0,
  movementString: ""
})

const newWorkoutStore = useNewWorkoutStore()

const {data: categoryData, loading: categoryLoading, error: categoryError, makeRequest: getCategories} = useAxios()

watch(categoryError, value => {
  if (value)
    Swal.fire({
      icon: 'error',
      text: value?.response?.data?.detail
    })
})

watch(categoryData, value => {
  if (value)
    state.categories = value.map(item => ({...item, label: item.title, value: item.id}))
})


onMounted(() => {
  getCategories({
    url: "category",
    method: "GET"
  })
})


const {data: movementData, error: movementError, loading: movementLoading, makeRequest: getMovements} = useAxios()


watch(movementData, value => {
  if (value)
    state.isMovementListOpen = true
})


const {
  data: saveWorkoutData,
  loading: saveWorkoutLoading,
  error: saveWorkoutError,
  makeRequest: saveWorkoutRequest
} = useAxios()


watch(saveWorkoutData, value => {
  newWorkoutStore.$reset()
  window.location.reload()
})
/**
 * Submit handler
 * @param evt
 * @returns {Promise<void>}
 */
const saveWorkout = async (evt) => {
  evt.preventDefault()
  await saveWorkoutRequest({
    url: "workouts",
    method: "POST",
    data: newWorkoutStore.getPostObject
  })

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
    }).then(() => {
      newWorkoutStore.removeMovementObject(state.currentMovementIndex)
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
const handleCancel = () => {
  state.movementString = ""
  newWorkoutStore.removeMovementObject(state.currentMovementIndex)
  state.currentMovementIndex = state.currentMovementIndex === 0 ? 0 : state.currentMovementIndex - 1
}




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
        <div
            v-if="newWorkoutStore?.movements[state.currentMovementIndex].movementId"
            class="my-badge capitalize relative">{{newWorkoutStore?.movements[state.currentMovementIndex].name}}

        </div>
        <div v-else class="flex flex-col relative w-full">
          <maz-input

              v-model="state.movementString"
              autocomplete="new-password"
              list="movement"
              @keyup="getMovements({url: `/movement/${$event.target.value}`})"
              id="movement"
              placeholder="Movement"
              type="text"
          />
          <datalist
              v-if="state.isMovementListOpen"
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
#movement{
  @apply border-[2px] rounded-lg border-slate-300 px-4 py-2 placeholder:text-primary;
}
</style>