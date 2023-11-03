<script setup>
import Navbar from "../components/navs/Navbar.vue";
import TabBar from "@/shared/components/navs/TabBar.vue";
import {useAuthStore} from "@/shared/store/authStore.js";
import {watch} from "vue";
import {useRouter} from "vue-router";
import IndexFooter from "@/shared/components/navs/IndexFooter.vue";

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
  <div class="flex flex-col w-full pb-28  max-w-[1800px] mx-auto min-h-screen">
    <navbar />
    <div class="flex flex-col pt-10 lg:pt-16 px-4 lg:px-16 lg:min-h-[60vh]">
      <router-view />
    </div>

    <tab-bar />
    <index-footer />
  </div>
</template>
