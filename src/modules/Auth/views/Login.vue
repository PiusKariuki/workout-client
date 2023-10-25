<script setup>
import {ref, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import Swal from "sweetalert2";
import {useAuthStore} from "@/shared/store/authStore.js";
import {useRouter} from "vue-router";


const email = ref(null)
const password = ref(null)
const router = useRouter()


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
    <p class="">Don't have an account? <router-link to="/register" class="underline font-medium" href="">Create an account</router-link></p>
    <form class="flex flex-col gap-8 py-12" @submit="handleSubmit">
      <maz-input type="email" v-model="email" label="Email" required/>
      <maz-input v-model="password" label="Password" required type="password"/>
      <router-link class="self-center underline" to="/recover">Forgot Password?</router-link>
      <spinner v-if="loading" class="self-center text-cta" color="cta"/>
      <button v-else class="primary-btn w-full mt-10">Sign in</button>
    </form>
  </div>
</template>