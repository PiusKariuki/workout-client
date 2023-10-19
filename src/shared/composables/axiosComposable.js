import {ref} from "vue";
import axios from "axios";


export const useAxios = () => {
    const data = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASEURL
    })

    const makeRequest = async (config) => {
        loading.value = true
        error.value = null

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