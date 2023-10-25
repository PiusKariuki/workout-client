<script setup>
import {useNavIcons} from "@/shared/composables/navIcons.js";
import {useAuthStore} from "@/shared/store/authStore.js";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";


const router = useRouter()

const {links} = useNavIcons()
const authStore = useAuthStore()


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

<template>
  <div
      class="flex items-center justify-between w-full fixed bg-secondary  lg:hidden inset-x-0 bottom-0  py-8 px-4 border-t-[1px] z-20 mt-auto">
    <div
        v-for="item in links"
        v-if="links"
        :key="item.link"
        @click="router.push({name:item.link})"
        class="flex flex-col gap-2 cursor-pointer">
      <fa-icon :icon="item.icon" class="text-xl"/>
    </div>
    <button v-if="authStore.access_token !==null"
            class="outline-btn"
            @click="handleLogout">Logout
    </button>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-cta;
}

</style>