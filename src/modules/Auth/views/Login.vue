<script setup>

import {ref, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import Swal from "sweetalert2";
import {useAuthStore} from "@/shared/store/authStore.js";

const email = ref(null)
const password = ref(null)

const authStore = useAuthStore()

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
  }).then(() => {
    authStore.loadToken({access_token: value.access_token, token_type: value.token_type})
  })
})

/**
 * When error happens
 */
watch(error, value => {
  Swal.fire({
    icon: "error",
    text: value?.message
  })
})

/**
 * Submit handler
 * @param evt
 */
const handleSubmit = async evt => {
  evt.preventDefault()

  const formdata = new FormData()
  formdata.append("username", email.value)
  formdata.append("password", password.value)

  await makeRequest({
    url: 'auth/login',
    method: "POST",
    data: formdata,
    headers: {"Content-Type": "multipart/form-data"},
  })
}

</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="text-2xl">Welcome to Boats & Logs, <br> Sign in to continue</p>
    <p class="">Don't have an account? <a class="underline font-medium" href="">Create an account</a></p>
    <form class="flex flex-col gap-8 py-12" @submit="handleSubmit">
      <maz-input v-model="email" label="Email"/>
      <maz-input v-model="password" label="Password" type="password"/>
      <router-link class="self-center underline" to="/">Forgot Password?</router-link>
      <spinner v-if="loading" class="self-center text-cta" color="cta"/>
      <button v-else class="primary-btn w-full mt-10">Sign in</button>
    </form>
  </div>
</template>