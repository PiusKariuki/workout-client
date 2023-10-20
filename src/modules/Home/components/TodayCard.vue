<script setup>

import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAxios} from "@/shared/composables/axiosComposable.js";

const router = useRouter()


const {makeRequest, data, loading} = useAxios()


onMounted(() => {
  makeRequest({
    url: "/workouts/today",
    method: "GET"
  })
})

</script>

<template>
  <div
      :style="{backgroundImage: `url(${data.category.banner})`}"
      class="flex flex-col rounded-xl border-[1px] border-cta shadow-lg shadow-cta px-4 py-4 gap-12 bg-secondary
      min-h-[200px] bg-center bg-contain "
      @click="data?.id && router.push(`/workouts/${data?.id}`)">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-6">
        <p class="font-medium text-xl bg-secondary text-primary px-4 py-1 rounded-md">Today's Activities</p>
        <div class="my-badge">{{data?.category?.title }}</div>
      </div>
    </div>

  </div>
</template>
