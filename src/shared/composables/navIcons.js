import {ref} from "vue";
import {useAuthStore} from "@/shared/store/authStore.js";
import pinia from "@/shared/store/index.js";


export const useNavIcons = () => {
    const authStore = useAuthStore(pinia)

    const links = ref([
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
    ])

    if (!authStore.access_token)
        links.value.push({
            icon: "fa-solid fa-right-to-bracket",
            link: "/login",
        })

    return {links}
}