<script setup>

</script>

<template>
  <div
      class="hidden lg:flex flex-col gap-12 items-center justify-between w-full  bg-secondary py-8 px-4 border-t-[1px]
      border-cta mt-40">
    <p class="text-3xl capitalize">We're just getting warmed up.</p>

    <div class="grid grid-cols-4 place-content-between place-items-center items-start w-full">
      <router-link :to="{name: 'home'}" class="flex items-center">
        <img
            alt=""
            class="w-8 h-8 lg:w-12 lg:h-12 -rotate-45 cursor-pointer"
            src="/axe.svg">
        <p class="">Boats & Logs</p>
      </router-link>

      <div class="flex flex-col gap-8">
        <p class="italic font-medium">.Talk</p>
        <a class="flex items-center gap-2" href="mailto:piuskariuki19@gmail.com">
          <fa-icon icon="fa-solid fa-envelope"/>
          <p class="text-cta">piuskariuki19@gmail.com</p>
        </a>
      </div>

      <div class="flex flex-col gap-8">
        <p class="italic font-medium">.Portfolio</p>
        <a class="flex items-center gap-2" href="https://www.vonnie.io/" referrerpolicy="no-referrer" target="_blank">
          <fa-icon icon="fa-solid fa-briefcase"/>
          <p class="text-cta">vonnie.io</p>
        </a>
      </div>

      <div class="flex flex-col gap-8">
        <p class="italic font-medium">.Socials</p>
        <div class="flex items-center gap-8 text-cta text-2xl">

          <a class="flex items-center gap-2" href="https://twitter.com/gichuhi_pius_ke" referrerpolicy="no-referrer" target="_blank">
            <fa-icon icon="fa-brands fa-x-twitter"/>
          </a>
          <a class="flex items-center gap-2" href="https://github.com/PiusKariuki" referrerpolicy="no-referrer" target="_blank">
            <fa-icon icon="fa-brands fa-github-alt"/>
          </a>
          <a class="flex items-center gap-2" href="https://www.instagram.com/_kariuki_pius/" referrerpolicy="no-referrer" target="_blank">
            <fa-icon icon="fa-brands fa-instagram"/>
          </a>
          <a class="flex items-center gap-2" href="https://www.linkedin.com/in/pius-kariuki-1796041b4/" referrerpolicy="no-referrer" target="_blank">
            <fa-icon icon="fa-brands fa-linkedin"/>
          </a>

        </div>

      </div>

    </div>


  </div>
</template>

<style scoped>

</style>