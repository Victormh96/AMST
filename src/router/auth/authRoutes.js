
const authRoutes = [
    {
        path: "/registrar-datos-cuenta",
        name: "Registrar",
        props: true,
        component: () => import("@/views/auth/ViewRegister.vue"),
    },
    {
        path: "/recuperar-contrasena",
        name: "Recuperar",
        props: true,
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