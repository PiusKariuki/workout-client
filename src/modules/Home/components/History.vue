<script setup>

import HistoryCard from "@/modules/Home/components/HistoryCard.vue";
</script>

<template>
  <div class="flex flex-col p-4 w-full">
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold">History</p>
      <p class="text-cta font-semibold">See All</p>
    </div>
    <div class="flex w-full py-8 overflow-x-scroll gap-8">
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  </div>
</template>