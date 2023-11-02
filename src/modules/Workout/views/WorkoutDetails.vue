<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import Swal from "sweetalert2";
import MovementCard from "@/modules/Workout/components/MovementCard.vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {statusOptions} from "@/modules/Workout/data/data.js";
import NewWorkoutModal from "@/shared/components/dialogs/NewWorkoutModal.vue";
import {getDateString} from "../../../shared/helpers/dateOps.js";
import ReuseWorkoutModal from "@/shared/components/dialogs/ReuseWorkoutModal.vue";

const route = useRoute()
const {workoutId} = route.params

// state refs
const categories = ref([])
const categoryId = ref(null)
const categoryName = ref(null)
const date = ref(null)
const edit = ref(false)
const status = ref('all')
const movements = ref(null)
const isNewWorkoutModalOpen = ref(false)
const isReuseModalOpen = ref(false)


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
  filterWorkouts()
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
 * Filter workouts according to status state ref
 * Sort the workouts by position
 */
const filterWorkouts = () => {
  switch (status.value) {
    case "incomplete":
      movements.value = workoutData?.value?.movement_links
          ?.filter(workout => workout?.complete === false)
          .sort((a, b) => a.position - b.position)
      break;
    case "all":
      movements.value = workoutData?.value?.movement_links.sort((a, b) => a.position - b.position);
      break;
    case "complete":
      movements.value = workoutData?.value?.movement_links
          ?.filter(workout => workout?.complete === true)
          .sort((a, b) => a.position - b.position)
      break;
    default:
      break;
  }
}


/**
 * Function to make update request and update edit state ref
 */
const handleEdit = async () => {
  if (edit.value)
    await updateRequest({
      url: `workouts/${workoutId}`,
      method: 'PUT',
      data: {
        date: new Date(date.value),
        category_id: categoryId.value
      }
    })
  edit.value = !edit.value
  await getWorkouts()
  await filterWorkouts()
}


/**
 * Watch for changes on status filter
 */
watch(status, () => {
  filterWorkouts()
})

/**
 * get this workout by id
 * get all categories
 */
onMounted(() => {
  getWorkouts()
  getCategories({
    url: 'category',
    method: 'GET'
  })
})

watch(isNewWorkoutModalOpen, async () => {
  await getWorkouts()
  await filterWorkouts()
})


</script>

<template>
  <div class="flex flex-col w-full">
    <spinner v-if="workoutsLoading || updateLoading || categoriesLoading" class="self-center text-cta" color="cta"/>
    <div v-if="workoutData?.id" class="flex flex-col py-6 gap-8">
      <!--*****************************************************************-->
      <div  class="collapse collapse-arrow border border-base-300 bg-base-200 ">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          Workout details
        </div>
        <div class="collapse-content">
          <div class="flex flex-col lg:flex-row  justify-between gap-8  mb-10">
            <div class="flex flex-col gap-4 p-4 bg-primary/5 w-full">
              <div v-if="!edit" class="flex justify-between ">
                <div class="flex items-center gap-2">
                  <fa-icon icon="fa-solid fa-dumbbell"/>
                  <p class="text-xl capitalize">{{ workoutData?.category?.title }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <fa-icon icon="fa-regular fa-calendar-days"/>
                  <p class="text-xl capitalize">{{ getDateString(workoutData.date) }}</p>
                </div>
              </div>

              <div v-else class="flex flex-col md:flex-row w-full gap-8">
                <maz-select
                    v-model="categoryId"
                    :disabled="!edit"
                    :options="categories"
                />
                <picker
                    v-model="date"
                    :disabled="!edit"/>
              </div>

              <button
                  class="primary-btn  "
                  @click="handleEdit">
                <fa-icon icon="fa-solid fa-pen-to-square"/>
                {{ edit ? 'save' : 'edit' }}
              </button>
            </div>

            <div class="flex items-center gap-8 w-full  p-4 bg-primary/5">
              <maz-select
                  v-model="status"
                  :options="statusOptions"
                  class="w-full"
                  label="Status"
              />
              <button
                  class="primary-btn w-full text-xs py-4"
                  @click="isNewWorkoutModalOpen = !isNewWorkoutModalOpen">
                New Split
              </button>
            </div>

            <div class="flex flex-col lg:items-center gap-8 w-full justify-center  p-4 bg-primary/5">
              <button
                  @click="isReuseModalOpen = !isReuseModalOpen"
                  class="primary-btn">Re-use this workout</button>
            </div>

          </div>
        </div>
      </div>



      <reuse-workout-modal v-model="isReuseModalOpen"/>
      <new-workout-modal
          v-model="isNewWorkoutModalOpen"
      />

      <!--*************************************************************-->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[80vh] overflow-y-scroll py-4">
        <movement-card v-for="move in movements" :key="move.movement_id" :move="move" @refetch="getWorkouts"/>
      </div>


    </div>
  </div>
</template>
