export const authRoutes = [
    {
        path: "/",
        name: "auth-layout",
        component: () => import("@/shared/layouts/AuthLayout.vue"),
        meta: {
            checkAuth: true
        },
        children: [
            {
                path: '',
                name: 'login',
                component: () => import("@/modules/Auth/views/Login.vue"),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import("@/modules/Auth/views/Register.vue"),
            },
            {
                path: 'recover',
                name: 'recover-password',
                component: () => import("@/modules/Auth/views/RecoverPassword.vue"),
            },
            {
                path: 'demo',
                name: 'demo',
                component: () => import("@/modules/Auth/views/Demo.vue"),
            },
        ]
    },
]