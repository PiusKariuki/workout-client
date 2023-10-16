<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getTodaysDate} from "@/modules/NewWorkout/helpers/getTodaysDate.js";

const state = reactive({
  category: "",
  movementId: "",
  sets: null
})

const dateValue = ref("")

onMounted(() => {
  dateValue.value = getTodaysDate()
})

const categories = [
  {label: "push", value: "push"},
  {label: "pull", value: "pull"},
  {label: "leg", value: "leg"},
]

</script>

<template>
  <form class="grid md:grid-cols-2 py-8 gap-8">
    <p class="text-2xl font-semibold md:col-span-2">New workout</p>
    <picker v-model="dateValue" label="Date"/>
    <maz-select v-model="state.category" label="Category" :options="categories" />
    <div class="flex flex-col gap-4">
      <p class="text-lg">Movements</p>
      <maz-input label="Name" placeholder="Start typing..." v-model="state.movementId" />
      <maz-input label="Sets" v-model="state.sets" type="Number"/>
      <maz-input label="Reps" v-model="state.reps" type="Number"/>
      <maz-input label="Seconds of rest" v-model="state.rest" type="Number"/>
      <div class="flex justify-center gap-12  mt-8">
        <fa-icon icon="fa-solid fa-circle-chevron-left" class="w-6 h-6 text-berry" />
        <fa-icon icon="fa-solid fa-circle-chevron-right" class="w-6 h-6 text-berry" />
      </div>
    </div>

  </form>
</template>

<style scoped>

</style>