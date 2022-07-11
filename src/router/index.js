//Others
import store from "@/store"
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

router.beforeEach((to, from, next) => {

    let auth
    try {
        auth = store.state.auth.user.token
    } catch (error) {
        auth = false
    }

    //console.log(auth)
    if (to.meta.rutaProtegida) {

        if (auth !== false) {
            if (to.meta.rutaSinAuth) {
                next('/dashboard')
            }
            else {
                next()
            }
        } else {
            next('/')
        }
    } else {
        if (auth !== false && to.meta.rutaSinAuth) {
            next('/dashboard')
        } else {
            next();
        }
    }
});

export default router;
