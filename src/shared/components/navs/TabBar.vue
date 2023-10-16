<script setup>

const links = [
  {
    icon: "fa-solid fa-house",
    link: "/"
  },
  {
    icon: "fa-regular fa-calendar-days",
    link: "/history"
  },
  {
    icon: "fa-solid fa-circle-plus",
    link: "/new"
  },
  {
    icon: "fa-solid fa-chart-line",
    link: "/reports"
  },
  {
    icon: "fa-regular fa-circle-user",
    link: "/profile"
  },

]
</script>

<template>
  <div
      class="flex items-center justify-between w-full fixed lg:hidden inset-x-0 bottom-0  py-8 px-4 border-t-[1px] z-20 bg-light-secondary">
    <router-link
        v-for="item in links"
        :key="item.link"
        :to="item.link"
        class="flex flex-col gap-2">
      <fa-icon :icon="item.icon" class="text-xl"/>
    </router-link>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-info
}

</style>