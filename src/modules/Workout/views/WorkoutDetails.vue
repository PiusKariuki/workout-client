<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import Swal from "sweetalert2";
import MovementCard from "@/modules/Workout/components/MovementCard.vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";

const route = useRoute()
const {workoutId} = route.params

// state refs
const categories = ref([])
const categoryId = ref(null)
const categoryName = ref(null)
const date = ref(null)
const edit = ref(false)

/**
 * Composable to get all workouts
 */
const {makeRequest: getAllWorkouts, data: workoutData, loading: workoutsLoading, error: workoutsError} = useAxios()

/**
 * Get all workouts success
 */
watch(workoutData, value => {
  categoryName.value = value.category?.title
  categoryId.value = value.category?.id
  date.value = value.date
})

/**
 * Get al workouts error
 */
watch(workoutsError, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value.response.data.detail
    })
})


/**
 *
 * function to configure all workouts for re-fetching after updates
 */
const getWorkouts = () => {
  getAllWorkouts({
    url: `/workouts/${workoutId}`
  })
}

/**
 * Composable to update a workout by either date or category
 */
const {makeRequest: updateRequest, loading: updateLoading, error: updateError} = useAxios()

/**
 * If update fails
 */
watch(updateError, value => {
  if (value)
    Swal.fire({
      icon: 'error',
      text: value?.message
    })
})

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
 * Function to make update request and update edit variable
 */
const handleEdit = () => {
  if (edit.value)
    updateRequest({
      url: `workouts/${workoutId}`,
      method: 'PUT',
      data: {
        date: new Date(date.value),
        category_id: categoryId.value
      }
    })
  edit.value = !edit.value
}

/**
 * get all workouts and categories on mount
 */
onMounted(() => {
  getWorkouts()

  getCategories({
    url: 'category',
    method: 'GET'
  })
})

</script>

<template>
  <div class="flex flex-col w-full">
    <spinner v-if="workoutsLoading || updateLoading || categoriesLoading" class="self-center text-cta" color="cta"/>
    <div v-if="workoutData?.id" class="flex flex-col py-8 gap-8">
      <!--*****************************************************************-->
      <div class="flex justify-between gap-8 items-center">
        <maz-select
            v-model="categoryId"
            :disabled="!edit"
            :options="categories"
        />
        <picker
            v-model="date"
            :disabled="!edit"/>
        <button
            class="primary-btn ml-auto"
            @click="handleEdit">
          {{ edit ? 'save' : 'edit' }}
        </button>
      </div>

      <!--*************************************************************-->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-scroll py-4">
        <movement-card v-for="move in workoutData?.movement_links" :key="move.id" :move="move" @refetch="getWorkouts"/>
      </div>


    </div>
  </div>
</template>
