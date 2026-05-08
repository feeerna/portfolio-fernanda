export const ServicesRouter = [
  {
    path: "/services",
    name: "services",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/Services.vue"),
    meta: { requiresAuth: true },
  },
];
