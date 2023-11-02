<script setup>
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {onMounted, ref, watch} from "vue";
import WorkoutsCard from "@/shared/components/cards/WorkoutsCard.vue";

const workouts = ref([])
const limit = ref(8)
const offset = ref(0)

const {data, loading, makeRequest} = useAxios()

watch(data, value => {
  if (value)
    workouts.value = [...workouts.value, ...data.value]
})


const fetchWorkouts = () => makeRequest({
  url: `/workouts?limit=${limit.value}&offset=${offset.value}`,
  method: 'GET'
})


onMounted(() => {
  fetchWorkouts()
})

const fetchMore = async () => {
  offset.value = workouts.value.length
  fetchWorkouts()
}


</script>

<template>
  <div class="flex flex-col gap-8 lg:gap-16">

    <p class="text-2xl lg:text-4xl text-center">My workout history</p>

    <div v-if="workouts.length>0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">

      <WorkoutsCard
          v-for="item in workouts" :key="item.id" :workout="item"
      />
      <spinner v-if="loading" class="self-center text-cta place-self-center col-span-full" color="cta"/>
      <div
          v-else
          class="flex text-xl gap-2  items-center place-self-center col-span-full cursor-pointer my-badge text-secondary
          bg-cta"
          onclick=""
          @click="fetchMore">
        <p class="">More</p>
        <fa-icon icon="fa-solid fa-chevron-down"/>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>