
const userRoutes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/user/ViewDashboard.vue"),
        meta: { rutaProtegida: true, rutaAuth: true }
    }
]

export {
    userRoutes
}