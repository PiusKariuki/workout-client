import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/shared/store/authStore.js";
import pinia from "@/shared/store/index.js";
import {authRoutes} from "@/shared/router/authRoutes.js";
import {homeRoutes} from "@/shared/router/homeRoutes.js";

export const routes = [
    ...authRoutes,
    ...homeRoutes,
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach(to => {
    const authStore = useAuthStore(pinia)
    if (to.meta.checkAuth && authStore.access_token) {
        return {name: "home"}
    }

    if (to.meta.requiresAuth && !authStore.access_token) {
        return {name: "login"}
    }

})


export default router