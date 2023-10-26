<script setup>

import TodayCard from "@/modules/Home/components/TodayCard.vue";
import History from "@/modules/Home/components/SavedWokouts.vue";
import HeroSection from "@/modules/Home/components/HeroSection.vue";
</script>

<template>
  <div class="flex flex-col pt-8 gap-16 md:gap-16">
    <HeroSection/>
    <TodayCard/>
    <History/>
  </div>
</template>
