
const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/public/ViewHome.vue"),
        meta: { rutaSinAuth: true }
    }
]

export {
    publicRoutes
}