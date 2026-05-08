import { createRouter, createWebHistory } from "vue-router";
// import { verifyRouteAccess } from "./helpers";
import HelloWorld from "../components/HelloWorld.vue";
import { AboutRouter } from "../modules/about/routes/about.routes";
import { ProjectsRouter } from "../modules/projects/routes/project.routes";
import { ServicesRouter } from "../modules/services/routes/services.routes";
import { ContactRouter } from "../modules/contact/routes/contact.routes";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...AboutRouter,
    ...ProjectsRouter,
    ...ServicesRouter,
    ...ContactRouter,
  ],
});

// router.beforeEach((to, from, next) => {
//   from;
//   const toPathSegments = to.path.split("/");
//   let { redirect } = verifyRouteAccess(toPathSegments);

//   const enablePermissions = import.meta.env.VITE_ENABLE_PERMISSIONS === "true";
//   if (to.path === "/") {
//     next('/home')
//     return
//   }
//   if (!enablePermissions){
//     next();
//     return;
//   }
  
//   if (redirect == "next") {
//     next();
//     return;
//   }
//   if (redirect == "out") {
//     next("/login");
//     return;
//   }
//   if (redirect == "forbidden") {
//     next("/unauthorized");
//     return;
//   }
// });

export default router;
