<script setup>

</script>

<template>
  <div class="flex flex-col rounded-xl border-[1px] border-cta shadow-xl px-4 py-4 gap-12 bg-secondary">
    <div class="flex justify-between items-center">
      <div class="flex flex-col gap-6">
        <p class="font-semibold text-xl">Today's  Activities</p>
        <div class="my-badge">Push day</div>
      </div>
      <div
          class="radial-progress text-cta"
          style="--value:70; --size:6rem; --thickness: 2px;">
        70%
      </div>
    </div>

    <div class="flex justify-between items-end gap-16">
      <!--      calories-->
      <div class="flex flex-col w-full">
        <fa-icon icon="fa-solid fa-fire" class="w-4" />
        <p class="">1200 kcal</p>
      </div>
      <!--   Time   -->
      <div class="flex flex-col w-full">
        <fa-icon icon="fa-solid fa-clock" class="w-4" />
        <p class="">03:00 hr</p>
      </div>
    </div>

  </div>
</template>
