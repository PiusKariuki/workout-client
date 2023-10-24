import {shallowRef} from "vue";
import {useAuthStore} from "@/shared/store/authStore.js";
import pinia from "@/shared/store/index.js";
import {useRouter} from "vue-router";


export const useNavIcons = () => {
    const authStore = useAuthStore(pinia)
    const router = useRouter()

    const links = shallowRef([
        {
            icon: "fa-solid fa-house",
            link: "/"
        },
        {
            icon: "fa-regular fa-calendar-days",
            link: "/history"
        },
        {
            icon: "fa-solid fa-circle-plus",
            link: "/new"
        },
        {
            icon: "fa-solid fa-chart-line",
            link: "/reports"
        },
        {
            icon: authStore.access_token ? "fa-solid fa-power-off" : "fa-solid fa-right-to-bracket",
            link: authStore.access_token ? "/login" : "/login",
            handler: () => {
                if (authStore.access_token) {
                    authStore.$reset()
                    router.push("/")
                    window.location.reload()
                }
            }
        },
    ])

    return {links}
}