<script setup>
import Navbar from "../components/navs/Navbar.vue";
import TabBar from "@/shared/components/navs/TabBar.vue";
import {useAuthStore} from "@/shared/store/authStore.js";
import {watch} from "vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()

/**
 * Route to login page once auth is not available
 */
watch(()=>authStore.access_token, value=>{
  if(!value)
    router.replace("/")
})

</script>

<template>
  <div class="flex flex-col w-full pt-4 pb-28 px-4 lg: px-16 max-w-[1800px] mx-auto min-h-screen">
    <navbar />
    <router-view />
    <tab-bar />
  </div>
</template>
