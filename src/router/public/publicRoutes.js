
const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/public/ViewHome.vue"),
    }
]

export {
    publicRoutes
}