import { createRouter, createWebHistory } from "vue-router";
import { auth } from '@/utils/firebase'

import { publicRoutes } from '@/router/publicRoutes'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...publicRoutes
    ],
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (auth.currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});


export default router;
