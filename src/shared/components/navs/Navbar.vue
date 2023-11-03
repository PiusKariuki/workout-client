<template>
  <div
      class="sticky top-0 bg-secondary/95 flex py-4 lg:py-6 shadow-md shadow-cta lg:justify-between items-center z-50 px-4 lg:px-16">
    <router-link :to="{name: 'home'}">
      <img
          alt=""
          class="w-8 h-8 lg:w-12 h-12 rotate-45 cursor-pointer"
          src="/axe.svg">
    </router-link>

    <div class="hidden lg:flex items-center gap-24">
      <router-link
          v-for="item in links"
          v-if="links"
          :key="item.link"
          :to="{name: item.link}"
          class="flex flex-col cursor-pointer text-xl "
          >
        {{ item.title }}
      </router-link>
      <button
          @click="handleLogout"
          v-if="authStore.access_token !==null"
          class="outline-btn">Logout</button>
    </div>
    <router-link class="flex lg:hidden italic self-center justify-center w-full" :to="{name: 'home'}">Boats & Logs</router-link>
  </div>
</template>

<script setup>
import {useNavIcons} from "@/shared/composables/navIcons.js";
import {useAuthStore} from "@/shared/store/authStore.js";
import Swal from "sweetalert2";

const authStore = useAuthStore()
const {links} = useNavIcons()


const handleLogout = () => {
  Swal.fire({
    icon: "question",
    text: "Are you sure you want to logout?",
    showCancelButton: true
  }).then((res) => {
    if (res.isConfirmed) {
      authStore.$reset()
    }
  })
}
</script>

<style scoped>
.router-link-exact-active {
  @apply text-cta underline;
}

</style>
