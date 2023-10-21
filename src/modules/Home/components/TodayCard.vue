<script setup>

import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {percentage} from "../../../shared/helpers/getCompletionPercentage.js";

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
      :style="{backgroundImage: `url(${data?.category?.banner})`}"
      class="flex flex-col rounded-xl border-[1px] border-cta shadow-lg shadow-cta px-4 py-4 gap-12 bg-secondary
      min-h-[200px] bg-center bg-contain "
      @click="data?.id && router.push(`/workouts/${data?.id}`)">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
    <div v-if="data?.id" class="flex justify-between items-center">
      <div class="flex flex-col gap-6">
        <p class="text-xl bg-secondary text-primary  px-4 py-1 rounded-md">Today's Activities</p>
        <div class="my-badge text-cta">{{data?.category?.title }}</div>
      </div>
      <div
          class="radial-progress bg-secondary/90 text-cta font-semibold "
          :style="{'--value': percentage(data?.movement_links)}"
          style="--value:70; --size:6rem; --thickness: 3px;">
        {{percentage(data?.movement_links)}}%
      </div>
    </div>

  </div>
</template>
