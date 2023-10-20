<script setup>
import {useRoute} from "vue-router";
import {onMounted, watch} from "vue";
import Swal from "sweetalert2";
import {getDateString} from "../../../shared/helpers/dateOps.js";
import MovementCard from "@/modules/Workout/components/MovementCard.vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";

const route = useRoute()
const {workoutId} = route.params


const {makeRequest, data, loading, error} = useAxios()

watch(error, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value.response.data.detail
    })
})

const getWorkouts = () => {
  makeRequest({
    url: `/workouts/${workoutId}`
  })
}

onMounted(() => {
  getWorkouts()
})

</script>

<template>
  <div class="flex flex-col w-full">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <div v-if="data?.id" class="flex flex-col py-8 gap-8">
      <!--*****************************************************************-->
      <div class="flex justify-between items-end">
        <p class="text-2xl capitalize">{{ data?.category.title }} day</p>
        <div class="my-badge">{{ getDateString(data.date) }}</div>
      </div>
      <!--*************************************************************-->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-scroll py-4">
        <movement-card v-for="move in data.movement_links" :key="move.id" :move="move" @refetch="getWorkouts"/>
      </div>


    </div>
  </div>
</template>
