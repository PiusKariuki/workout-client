import {ref} from "vue";


export const useNavIcons = () => {


    const links = ref([
        {
            icon: "fa-solid fa-house",
            link: "home"
        },
        {
            icon: "fa-regular fa-calendar-days",
            link: "my-history"
        },
        {
            icon: "fa-solid fa-circle-plus",
            link: "new-workout"
        },
        {
            icon: "fa-solid fa-chart-line",
            link: "my-reports"
        },
    ])


    return {links}
}