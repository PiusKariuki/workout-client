<template>
  <div
      class="sticky top-0 bg-secondary/95 flex py-4 lg:py-6 shadow-md shadow-cta lg:justify-between items-center z-50 px-4 lg:px-16">
    <router-link :to="{name: 'home'}">
      <img
          alt=""
          class="w-8 h-8 rotate-45 cursor-pointer"
          src="/axe.svg">
    </router-link>

    <div class="hidden lg:flex items-center gap-24">
      <router-link
          v-for="item in links"
          v-if="links"
          :key="item.link"
          :to="{name: item.link}"
          class="flex flex-col cursor-pointer text-xl "
          @click="router.push({name:item.link})">
        {{ item.title }}
      </router-link>
    </div>
    <div class="flex lg:hidden italic self-center justify-center w-full">Boats & Logs</div>
  </div>
</template>

<script setup>
import {useNavIcons} from "@/shared/composables/navIcons.js";


const {links} = useNavIcons()
</script>

<style scoped>
.router-link-exact-active {
  @apply text-cta underline;
}

</style>
