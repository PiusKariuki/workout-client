<script setup>
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {onMounted} from "vue";
import WorkoutsCard from "@/shared/components/cards/WorkoutsCard.vue";

const {data, loading, makeRequest} = useAxios()


onMounted(() => {
  makeRequest({
    url: '/workouts?limit=100&offset=0',
    method: 'GET'
  })
})

</script>

<template>
  <div class="flex flex-col gap-8 lg:gap-16">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <p class="text-2xl lg:text-4xl">My workout history</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
      <WorkoutsCard
          v-for="item in data" :key="item.id" :workout="item"
      />
    </div>
  </div>
</template>

<style scoped>

</style>