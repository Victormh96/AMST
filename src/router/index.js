//Others
import { firebaseAuth } from "@/utils/google"
import { createRouter, createWebHistory } from "vue-router"

//Component
import { authRoutes } from "@/router/auth/authRoutes"
import { userRoutes } from "@/router/user/userRoutes"
import { publicRoutes } from "@/router/public/publicRoutes"

//Routes
const routes = [
    ...authRoutes,
    ...publicRoutes,
    ...userRoutes
]

//Initialization
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

//Guards
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await firebaseAuth.getCurrentUser()) {
        next('/');

    } else if (!requiresAuth && await firebaseAuth.getCurrentUser()) {
        next('/dashboard');
    }
    else {
        next();
    }
});

export default router;
