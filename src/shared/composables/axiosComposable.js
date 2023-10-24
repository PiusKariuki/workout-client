import {ref} from "vue";
import axios from "axios";
import {useAuthStore} from "@/shared/store/authStore.js";
import pinia from "@/shared/store/index.js";


export const useAxios = () => {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const authStore = useAuthStore(pinia)


    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASEURL,

    })

    const makeRequest = async (config) => {
        loading.value = true
        error.value = null


        if (authStore.access_token)
            config['headers']= {
                'Authorization': `${authStore.token_type} ${authStore.access_token}`
            }

        try {
            const response = await axiosInstance(config)
            data.value = response.data
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    }

    return {data, loading, error, makeRequest}

}