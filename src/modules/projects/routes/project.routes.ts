export const ProjectsRouter = [
  {
    path: "/projects",
    name: "projects",
    isAuth: false,
    //@ts-ignore
    component: () => import("../page/Projects.vue"),
    meta: { requiresAuth: true },
  },
];
