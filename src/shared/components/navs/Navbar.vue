<template>
  <div class="flex content-container py-[25px] lg:py-[40px] justify-between items-center z-50 ">
    <router-link :to="{name: 'home'}">
      <img
          class="w-8 h-8 rotate-45 cursor-pointer"
          src="/axe.svg"
          alt="">
    </router-link>

    <div class="flex items-center gap-24">
      <router-link
          :to="{name: item.link}"
          v-for="item in links"
          v-if="links"
          :key="item.link"
          @click="router.push({name:item.link})"
          class="flex flex-col cursor-pointer text-xl ">
        {{item.title}}
      </router-link>
    </div>
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
