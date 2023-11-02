<script setup>
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import Swal from "sweetalert2";


const date = ref(null)

const route = useRoute()

const {workoutId} = route.params


defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])


const {data, loading, makeRequest, error} = useAxios()

watch(data, value => {
  Swal.fire({
    icon: "success",
  }).then(() => {
    emits('update:modelValue')
  })
})

watch(error, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value?.response?.data?.detail
    })
})

const handleSave = async () => {
  await makeRequest({
    url: "/workouts/template",
    method: "POST",
    data: {
      id: workoutId,
      date: new Date(date.value)
    }
  })
}


</script>

<template>
  <MazDialog
      :model-value="modelValue"
      title="Re-use workout"
      @update:model-value="$emit('update:modelValue')"
  >
    <div class="flex flex-col gap-8 p-6">
      <picker label="New Workout Date" v-model="date"/>
    </div>


    <template #footer="{ close }">
      <div v-if="!loading" class="flex w-full justify-between items-center">
        <button
            class="outline-btn"
            @click="close">Cancel
        </button>
        <button class="primary-btn" @click="handleSave">
          Confirm
        </button>
      </div>
      <spinner v-else class="self-center text-cta" color="cta"/>
    </template>
  </MazDialog>
</template>

<style scoped>

</style>