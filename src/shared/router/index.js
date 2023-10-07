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
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router