<script setup>
import Navbar from "../components/navs/Navbar.vue";
import TabBar from "@/shared/components/navs/TabBar.vue";



</script>

<template>
  <div class="flex flex-col w-full py-4 px-4 max-w-[1800px] mx-auto min-h-screen">
    <navbar />
    <router-view />
    <tab-bar />
  </div>
</template>
