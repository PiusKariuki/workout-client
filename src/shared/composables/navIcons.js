import {ref} from "vue";


export const useNavIcons = () => {


    const links = ref([
        {
            title: "Home",
            icon: "fa-solid fa-house",
            link: "home"
        },
        {
            title: "History",
            icon: "fa-regular fa-calendar-days",
            link: "my-history"
        },
        {
            title: "New Workout",
            icon: "fa-solid fa-circle-plus",
            link: "new-workout"
        },
        {
            title: "Reports",
            icon: "fa-solid fa-chart-line",
            link: "my-reports"
        },
    ])


    return {links}
}