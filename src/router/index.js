//Others
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

export default router;
