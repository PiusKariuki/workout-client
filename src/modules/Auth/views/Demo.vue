<script setup>
import {onMounted, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import Swal from "sweetalert2";
import {useAuthStore} from "@/shared/store/authStore.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore()

const router = useRouter()

/**
 * Axios Composable
 */
const {data, loading, error, makeRequest} = useAxios()

/**
 * When login is successful
 */
watch(data, value => {
  Swal.fire({
    icon: "success",
    text: "Login successful"
  }).then(async () => {
    authStore.loadToken({access_token: value.access_token, token_type: value.token_type})
    await router.push("/")
    await window.location.reload()
  })
})


/**
 * When error happens
 */
watch(error, value => {
  if (value)
    Swal.fire({
      icon: "error",
      text: value?.message
    })
})


onMounted(() => {
  makeRequest({
    url: 'auth/demo',
    method: "GET"
  })
})
</script>

<template>

</template>

<style scoped>

</style>