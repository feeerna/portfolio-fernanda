export const ContactRouter = [
  {
    path: "/contact",
    name: "contact",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/Contact.vue"),
    meta: { requiresAuth: true },
  },
];
