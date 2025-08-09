import { Route } from "react-router-dom";
import type { RouteConfigInterface } from "./route-config.interface";


export const generateRoutes = (routes: RouteConfigInterface[]) => {
  return routes.map((routeConfig) => {
    const { 
      path, 
      element: Component, 
      requiresAuth, 
      isPublic
    } = routeConfig;

      //Todo : Ajouter les conditions

    return (
      <Route
        key={path}
        path={path}
        element={<Component />}
      />
    );
  });
};