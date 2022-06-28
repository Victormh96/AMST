import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({

    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../views/ViewHome.vue"),
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("../views/auth/ViewRegister.vue"),
        },
        {
            path: "/recuperar",
            name: "Recuperar",
            component: () => import("../views/auth/ViewRecoveryPassword.vue"),
        },
        {
            path: "/css",
            name: "Css",
            component: () => import("../views/ViewExample.vue"),
        },
    ],
});

export default router;
