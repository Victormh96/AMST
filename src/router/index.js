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
            path: "/Services",
            name: "Services",
            component: () => import("../views/ViewServices.vue"),
        },
    ],
});

export default router;