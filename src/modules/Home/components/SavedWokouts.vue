<script setup>
import Swal from "sweetalert2";
import {onMounted, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRouter} from "vue-router";
import WorkoutsCard from "@/shared/components/cards/WorkoutsCard.vue";


const router = useRouter()

const {data, loading, error, makeRequest} = useAxios()


/**
 * if error occurs
 */
watch(() => error, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value.response.detail
    })
})





/**
 * get my past workouts
 */
onMounted(() => {
  makeRequest({
    url: '/workouts/?limit=10&offset=0',
    method: 'GET'
  })
})

</script>

<template>
  <div class="flex flex-col gap-8 p-4 w-full relative">
    <div class="flex items-center justify-between">
      <p class="text-xl">My recent history</p>
      <p
          class="text-xm lg:text-base text-cta underline cursor-pointer"
          @click="router.push({name: 'my-history'})"
      >See All
      </p>
    </div>
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
      <WorkoutsCard
          v-for="item in data" :key="item.id" :workout="item"
      />
    </div>

    <div
        v-if="data?.length ===0"
        class="flex flex-col w-full md:flex-row">
      <div
          class="flex flex-col rounded-xl shadow-lg shadow-cta px-4 py-4 gap-12 bg-center bg-cover lg:w-[40vw]
          cursor-pointer bg-image h-[40vh]  justify-center">
        <div class="flex flex-col gap-8 bg-secondary/70 p-4 text-primary">
          <p class="text-2xl">Hey there rookie!👋</p>
          <p class="">Pleased to have you join us.</p>
          <button
              @click="router.push({name: 'new-workout'})"
              class="primary-btn">Create your first workout</button>
        </div>

      </div>
    </div>


  </div>
</template>


<style scoped>
.bg-image {
  background-image: url("https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&w=800");
}
</style>