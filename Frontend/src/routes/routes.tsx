import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";

import Login from "../pages/login/Login";
import MainResume from "../pages/mainResume/MainResume";
import Dashboard from "../pages/dashboard/Dashboard";
import ServiceForm from "../pages/serviceform/ServiceForm"

import List from "../components/CRUDComponents/list/List"

import {SECTIONS} from "../data/data.tsx";

/**
 * Genera a partir de los elementos del menu lateral las url's correspondientes
 * @returns Un arreglo con todas las rutas para inventario
 */
function generateRoutes(){
  var routes :RouteObject[] = [];
  SECTIONS.forEach((section) => {
    section.modules.forEach((module) => {
        routes.push(
          {
            path:module.url,
            loader: () => {return redirect(module.tables[0].url)}
          }
        );
        module.tables?.forEach((table) => {
          routes = routes.concat([
            {
              path: table.url,
              element: <List/>,
            },
          ]);
        })
      });
    });
    return routes;
  }
  
const routes = [
  {
    path: "/",
    element: <Dashboard />,
    children: generateRoutes().concat([
      {
        index:true,
        path: "/",
        element: <MainResume />
      }
    ])
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/orden-servicio/",
    loader: () => {return redirect("/orden-servicio/generate")}
  },
  {
    path: "/orden-servicio/login",
    element: <Login />
  },
  {
    path: "/orden-servicio/generate",
    element: <ServiceForm />
  }
];

const router = createBrowserRouter(routes);
export default router;