<script setup>

import {ref, watch} from "vue";
import {useAxios} from "@/shared/composables/axiosComposable.js";
import Swal from "sweetalert2";
import {useAuthStore} from "@/shared/store/authStore.js";
import {useRouter} from "vue-router";

const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const passwordError = ref(null)

/**
 * Password error watcher
 */
watch(confirmPassword, value => {
  if (value !== password.value)
    passwordError.value = `Passwords don't match`
  else passwordError.value = null
})


const router = useRouter()


const authStore = useAuthStore()

/**
 * Axios Composable
 */
const {data, loading, error, makeRequest} = useAxios()


/**
 * When login is successful
 */
watch(data, async(value)=> {
    authStore.loadToken({access_token: value.access_token, token_type: value.token_type})
    await router.push("/")
    await window.location.reload()
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
  if (!passwordError.value)
    await makeRequest({
      url: 'auth/register',
      method: "POST",
      data: {
        username: email.value,
        password: password.value
      },
    })
}

</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="">Have an account?
      <router-link class="underline font-medium" href="" to="/">Login</router-link>
    </p>
    <form class="flex flex-col gap-8 py-12" @submit="handleSubmit">
      <maz-input v-model="email" label="Email" required/>
      <maz-input v-model="password" label="Password" required type="password"/>
      <div class="flex flex-col gap-1">
        <maz-input v-model="confirmPassword" label="Confirm Password" required type="password"/>
        <p class="text-danger text-sm font-light">{{ passwordError }}</p>
      </div>
      <spinner v-if="loading" class="self-center text-cta" color="cta"/>
      <button v-else class="primary-btn w-full mt-10">Sign up</button>
    </form>
  </div>
</template>