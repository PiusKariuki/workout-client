<script setup>

import HistoryCard from "@/modules/Home/components/WorkoutsCard.vue";
import Swal from "sweetalert2";
import {onMounted, ref, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRouter} from "vue-router";

//state refs
const isRight = ref(false)
const isLeft = ref(true)

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
 * Chevron click handler
 * @param direction
 */
const handleClick = ({direction}) => {
  if (direction === 'left')
    (document.getElementById('boxRef').scrollLeft -= 900)
  else
    (document.getElementById('boxRef').scrollLeft += 900)
}


/**
 * Scroll handler to check div's position to display chevrons accordingly
 */
const handleScroll = () => {
  const {scrollLeft, scrollWidth, clientWidth} = document.getElementById('boxRef')

  if (scrollLeft + clientWidth === scrollWidth)
    isRight.value = true
  else isRight.value = false

  if (scrollLeft === 0)
    isLeft.value = true
  else isLeft.value = false

}

/**
 * get my past workouts
 */
onMounted(() => {
  makeRequest({
    url: '/workouts/?limit=20&offset=0',
    method: 'GET'
  })
})

</script>

<template>
  <div class="flex flex-col p-4 w-full relative">
    <div class="flex items-center justify-between">
      <p class="text-xl">My history</p>
      <p
          class="text-xm lg:text-base text-cta underline cursor-pointer"
          @click="router.push({name: 'my-history'})"
      >See All
      </p>
    </div>
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <!--    icons-->

    <fa-icon
        v-if="!loading && data?.length>0"
        :class="[isLeft? 'hidden': 'hidden lg:block']"
        class="absolute z-20 top-1/2 -translate-y-1/2 text-4xl -left-6 cursor-pointer text-cta w-8 h-8 rounded-full
         bg-secondary/80 shadow-md shadow-cta p-4 hover:bg-cta hover:text-secondary hover:scale-110 transition-all ease-in-out delay-75 duration-150"
        icon="fa-solid fa-chevron-left"
        @click="handleClick({direction: 'left'})"/>
    <fa-icon
        v-if="!loading && data?.length>0"
        :class="[isRight ? 'hidden': 'hidden lg:block']"
        class="absolute  z-20 top-1/2 -translate-y-1/2 text-4xl -right-6 cursor-pointer text-cta w-8 h-8 rounded-full
         bg-secondary/80 shadow-md shadow-cta p-4 hover:bg-cta hover:text-secondary hover:scale-110 transition-all ease-in-out delay-75 duration-150"
        icon="fa-solid fa-chevron-right"
        @click="handleClick({direction: 'right'})"/>
    <div
        id="boxRef"
        class="flex w-full py-8 overflow-x-scroll gap-8 relative scroll-smooth"
        @scroll="handleScroll">
      <HistoryCard v-for="item in data" :key="item.id" :workout="item"/>
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