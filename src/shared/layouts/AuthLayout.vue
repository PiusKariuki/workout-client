<script setup>


</script>

<template>
  <div class="flex flex-col bg-image bg-center bg-no-repeat bg-cover text-secondary min-h-screen items-center
  justify-center px-6 ">
      <div class="flex flex-col max-w-md-xl gap-8 rounded-xl bg-primary/30 p-4 shadow-md shadow-cta">
        <p class="italic font-semibold text-2xl  mb-5">Welcome to Boats & Logs</p>
        <router-view />
      </div>
  </div>
</template>

<style scoped>
  .bg-image{
    background-image: url("https://images.pexels.com/photos/371049/pexels-photo-371049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  }
</style>