<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="flex flex-col md:flex-row w-full  bg-squat-image md:bg-none bg-right-top bg-cover
  rounded-xl shadow-lg shadow-cta">
    <div
        class="flex flex-col max-w-md gap-12 justify-center px-4 py-12 text-secondary md:text-primary bg-primary/20
        md:bg-transparent md:bg-none rounded-xl">
      <p class="text-2xl md:text-4xl uppercase">Be the master of your active lifestyle.</p>
      <p class="italic font-light">"You want to be uncommon amongst uncommon people. Period!" <br><span class="not-italic">~David Goggins</span></p>
      <button
          @click="router.push({name: 'new-workout'})"
          class="primary-btn">Create Workout</button>
    </div>
    <div class="hidden md:flex w-full md:h-[50vh] lg:h-[60vh] bg-squat-image bg-center bg-cover rounded-r-xl"/>
  </div>
</template>

<style scoped>

</style>