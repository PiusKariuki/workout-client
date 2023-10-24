<script setup>
import {useNavIcons} from "@/shared/composables/navIcons.js";

const {links} = useNavIcons()

</script>

<template>
  <div
      class="flex items-center justify-between w-full fixed bg-secondary  lg:hidden inset-x-0 bottom-0  py-8 px-4 border-t-[1px] z-20 mt-auto">
    <router-link
        v-for="item in links"
        v-if="links"
        :key="item.link"
        :to="item.link"
        class="flex flex-col gap-2"
        @click="item.handler  && item?.handler()">
      <fa-icon :icon="item.icon" class="text-xl"/>
    </router-link>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-cta;
}

</style>