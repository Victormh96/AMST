
const userRoutes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/user/ViewDashboard.vue"),
    }
]

export {
    userRoutes
}