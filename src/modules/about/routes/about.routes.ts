export const AboutRouter = [
  {
    path: "/about",
    name: "about",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/About.vue"),
    meta: { requiresAuth: true },
  },
];
