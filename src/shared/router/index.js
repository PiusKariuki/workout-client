import {createRouter, createWebHistory} from "vue-router";

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

        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router