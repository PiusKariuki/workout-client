<script setup>
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {onMounted, ref, watch} from "vue";
import WorkoutsCard from "@/shared/components/cards/WorkoutsCard.vue";

const workouts = ref([])
const limit = ref(4)
const categoryId = ref(null)
const categories = ref([])
const maxDate = ref(null)
const minDate = ref(null)

/**
 * Composable to get all workouts
 */
const {data: workoutData, loading: workoutLoading, makeRequest: requestWorkouts} = useAxios()

/**
 * When workouts are fetched store them in the ref object
 */
watch(workoutData, value => {
  if (value)
    workouts.value = [...workoutData.value]
})


/**
 * Config for getting workouts
 * Attached path params like max date and category accordingly
 * @returns {*}
 */
const fetchWorkouts = () => {
  let url = `/workouts?limit=${limit.value}`

  if (categoryId.value)
    url = url + `&category_id=${categoryId.value}`

  if (minDate.value)
    url = url + `&min_date=${minDate.value}`

  if (maxDate.value)
    url = url + `&max_date=${maxDate.value}`

  return requestWorkouts({
    url,
    method: 'GET'
  })
}

/**
 * Composable to get all categories for the select
 */
const {makeRequest: getCategories, data: categoriesData, loading: categoriesLoading} = useAxios()


/**
 * If getting categories succeeds
 */
watch(categoriesData, value => {
  if (value)
    categories.value = value.map(item => ({...item, label: item?.title, value: item?.id}))

})


/**
 * On change of min date get workouts
 */
watch(minDate, value => {
  if (value)
    fetchWorkouts()
})

/**
 * On change of max date get workouts
 */
watch(maxDate, value => {
  if (value)
    fetchWorkouts()
})

/**
 * get workouts and get all categories
 */
onMounted(() => {
  fetchWorkouts()
  getCategories({
    url: 'category',
    method: 'GET'
  })
})

/**
 * Fetch more handler
 * @returns {Promise<void>}
 */
const fetchMore = async () => {
  limit.value *=2
  fetchWorkouts()
}


const handleClear = () => {
  categories.value = null
  minDate.value = null
  maxDate.value = null
  fetchWorkouts()
}

</script>

<template>
  <div class="flex flex-col gap-8 lg:gap-16">

    <p class="text-2xl lg:text-4xl text-center">My workout history</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">

      <div  class="collapse collapse-arrow  col-span-full shadow-md shadow-cta rounded-lg border-cta border-[1px]">
        <input type="checkbox" />
        <div class="collapse-title text-xl text-center">
          Filters
        </div>
        <div class="collapse-content">
          <div class=" flex flex-col md:flex-row w-full gap-8 px-4 py-4 lg:py-8 ">
            <maz-select class="w-full" v-model="categoryId" :options="categories" label="Categories" @selected-option="fetchWorkouts"/>
            <picker class="w-full" v-model="minDate" label="Min Date"/>
            <picker class="w-full" v-model="maxDate" :min-date="minDate" label="Max Date"/>

            <div class="flex items-center gap-6 lg:ml-auto">
              <button @click="handleClear" class="outline-btn w-full md:w-40">Clear filters</button>
            </div>
          </div>
        </div>
      </div>


      <WorkoutsCard
          v-for="item in workouts"
          v-if="workouts.length>0" :key="item.id" :workout="item"
      />
      <spinner
          v-if="workoutLoading || categoriesLoading"
          class="self-center text-cta place-self-center col-span-full"
          color="cta"/>
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