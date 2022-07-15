
const userRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/user/ViewDashboard.vue"),
        meta: {
            requiresAuth: true
        }
    }
]

export {
    userRoutes
}