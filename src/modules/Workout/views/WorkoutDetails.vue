<script setup>
import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import {useFetch} from "@/shared/composables/Fetch.js";
import Swal from "sweetalert2";
import {getDateString} from "../../../shared/helpers/dateOps.js";
import MovementCard from "@/modules/Workout/components/MovementCard.vue";

const state = reactive({
  loading: false,
  data: {}
})

const route = useRoute()
const {workoutId} = route.params

const getWorkout = async () => {
  state.loading = true

  const {data, responseError} = await useFetch(`/workouts/${workoutId}`)

  if (responseError.value) {
    Swal.fire({
      icon: 'error',
      text: responseError.value.detail
    })
  } else {
    state.data = data.value
  }
  state.loading = false
}

onMounted(() => {
  getWorkout()
})

</script>

<template>
  <div class="flex flex-col w-full">
    <spinner v-if="state.loading" class="self-center text-cta" color="cta"/>
    <div v-if="state.data.id" class="flex flex-col py-8 gap-8">
      <!--*****************************************************************-->
      <div class="flex justify-between items-end">
        <p class="text-2xl capitalize">{{ state?.data?.category.title }} day</p>
        <div class="my-badge">{{ getDateString(state.data.date) }}</div>
      </div>
      <!--*************************************************************-->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-scroll py-4">
        <movement-card v-for="move in state.data.movement_links" :key="move.id" :move="move"/>
      </div>


    </div>
  </div>
</template>
