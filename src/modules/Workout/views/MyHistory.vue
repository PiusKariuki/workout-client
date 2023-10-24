<script setup>
import {useAxios} from "@/shared/composables/axiosComposable.js";
import {onMounted} from "vue";
import {getDateString} from "../../../shared/helpers/dateOps.js";
import {percentage} from "../../../shared/helpers/getCompletionPercentage.js";

const {data, loading, makeRequest} = useAxios()

const headers = [
  {text: 'Split', value: 'category.title'},
  {text: 'Date', value: 'date'},
  {text: 'Progress', value:'progress'}
]

onMounted(() => {
  makeRequest({
    url: '/workouts?limit=100&offset=0',
    method: 'GET'
  })
})

</script>

<template>
  <div class="flex flex-col">
    <spinner v-if="loading" class="self-center text-cta" color="cta"/>
        <DataTable
            v-if="data"
            :headers="headers"
            :items="data"
            table-class-name="customize-table"
        >
          <template #item-date="item">
            {{getDateString(item?.date)}}
          </template>
          <template #item-progress="item">
            {{percentage(item?.movement_links)}}%
          </template>
        </DataTable>
  </div>
</template>

<style scoped>

</style>