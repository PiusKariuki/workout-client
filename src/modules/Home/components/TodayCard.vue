<script setup>

</script>

<template>
  <div class="flex flex-col rounded-xl border-[1px] border-slate-200 shadow-xl px-4 py-4 gap-12 bg-secondary">
    <div class="flex justify-between">
      <div class="flex flex-col gap-6">
        <p class="font-semibold">Today's <br> Activities</p>
        <div class="my-badge">Push Day</div>
      </div>
      <div class="radial-progress" style="--value:70; --size:6rem; --thickness: 2px;">70%</div>
    </div>

    <div class="flex justify-between items-end gap-16">
      <!--      calories-->
      <div class="flex flex-col w-full">
        <p class="">1200 kcal <br><span class="text-xs font-medium">Calories burned</span></p>
        <progress class="progress progress-[#1F1F1F] " max="100" value="70"></progress>
      </div>
      <!--   Time   -->
      <div class="flex flex-col w-full">
        <p class="">03:00 hr <br> <span class="text-xs font-medium">Time</span></p>
        <progress class="progress progress-[#1F1F1F] " max="100" value="70"></progress>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>