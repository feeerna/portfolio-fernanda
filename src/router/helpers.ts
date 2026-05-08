import { additionalPrivateRoutes, notAuthRoutes } from "./aditional-routes";

const isIgnoredRoute = (path: string) => {
  let aditionalRoutes: Array<any> = notAuthRoutes;
  const publicRoutes = notAuthRoutes.filter((route: any) => {
    return route.type == "everyone";
  });
  aditionalRoutes = [...additionalPrivateRoutes, ...publicRoutes];
  for (let i = 0; i < aditionalRoutes.length; i++) {
    const route = aditionalRoutes[i];
    if (path == route.path) return true;
  }
  return false;
};

const verifyRouteAccess = (
  toPathSegments: any
): { redirect: string } => {
  /*
    Si la ruta no está en el store pero aún así se puede acceder a ella
    porque es local y/o publica, se retorna el next
  */
  if (isIgnoredRoute(toPathSegments.join("/"))) {
    return {
      redirect: "next",
    };
  }

  /**
   * Si la ruta no es local (o es local pero no es pública) y el usuario no
   * está logueado, lo manda para el login
   */
  // if (!authStore.user.token) {
  //   return { redirect: "out" };
  // }

  /**
   * Revisa en la lista del store a ver si el usuario actual tiene permiso
   * para acceder a ella
   */

  // for (let i = 0; i < authStore.permissions.moduleAccesses.length; i++) {
  //   const moduleAccess = authStore.permissions.moduleAccesses[i];
  //   if (toPathSegments.includes(moduleAccess.module.name)) {
  //     return { redirect: "next" };
  //   }
  // }
  return { redirect: "forbidden" };
};

export { isIgnoredRoute, verifyRouteAccess };
