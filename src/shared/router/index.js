import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/shared/store/authStore.js";
import pinia from "@/shared/store/index.js";
import Swal from "sweetalert2";

export const routes = [
    {
        path: "/",
        name: "index-layout",
        component: () => import("@/shared/layouts/IndexLayout.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("@/modules/Home/views/Home.vue")
            },
            {
                path: "new",
                name: "new-workout",
                component: () => import("@/modules/Workout/views/NewWorkout.vue")
            },
            {
                path: "workouts/:workoutId",
                name: "workout-details",
                component: () => import("@/modules/Workout/views/WorkoutDetails.vue")
            },
            {
                path: 'history',
                name: 'my-history',
                component: () => import("@/modules/Workout/views/MyHistory.vue")
            },
            {
                path: 'reports',
                name: 'my-reports',
                component: () => import("@/modules/Reports/views/Reports.vue")
            },
            {
                path: 'login',
                name: 'login',
                component: () => import("@/modules/Auth/views/Login.vue"),
                meta: {
                    checkAuth: true
                }
            },
            {
                path: 'register',
                name: 'register',
                component: () => import("@/modules/Auth/views/Register.vue"),
                meta: {
                    checkAuth: true
                }
            },
            {
                path: 'recover',
                name: 'recover-password',
                component: () => import("@/modules/Auth/views/RecoverPassword.vue"),
                meta: {
                    checkAuth: true
                }
            },

        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach(to => {
    const authStore = useAuthStore(pinia)
    if (to.meta.checkAuth && authStore.access_token){
        Swal.fire({
            icon: "info",
            text: "You're already logged in ✌️"
        })
        return {name: "home"}
    }

})


export default router