
const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/ViewHome.vue"),
    },{
        path: "/register",
        name: "Register",
        component: () => import("../views/auth/ViewRegister.vue"),
    },{
        path: "/recuperar",
        name: "Recuperar",
        component: () => import("../views/auth/ViewRecoveryPassword.vue"),
    },{
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/ViewDashboard.vue"),
    },
]

export {
    publicRoutes
}