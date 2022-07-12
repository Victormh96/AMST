
const userRoutes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/user/ViewDashboard.vue"),
        meta: {
            requiresAuth: true
        }
    }
]

export {
    userRoutes
}