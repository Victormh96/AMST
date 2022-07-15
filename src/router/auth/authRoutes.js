
const authRoutes = [
    {
        path: "/registrar-datos-cuenta",
        name: "Registrar",
        component: () => import("@/views/auth/ViewRegister.vue"),
    },
    {
        path: "/recuperar-contrasena",
        name: "Recuperar",
        component: () => import("@/views/auth/ViewRecoveryPassword.vue"),
    },
    {
        path: "/validar-cuenta",
        name: "Validar",
        component: () => import("@/views/auth/ViewVerifyCode.vue"),
    }
]

export {
    authRoutes
}