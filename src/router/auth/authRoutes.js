
const authRoutes = [
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/auth/ViewRegister.vue"),
    },
    {
        path: "/recuperar",
        name: "Recuperar",
        component: () => import("@/views/auth/ViewRecoveryPassword.vue"),
    },
    {
        path: "/verificacion-codigo",
        name: "verificar",
        component: () => import("@/views/auth/ViewVerifyCode.vue"),
    }
]

export {
    authRoutes
}