export const additionalPrivateRoutes = [
  { path: "/" },
  { path: "/unauthorized" },
  { path: "/profile" },
  { path: "/admin/dashboard" },
];
export const notAuthRoutes = [{ path: "/login", type: "only-guest" }];
