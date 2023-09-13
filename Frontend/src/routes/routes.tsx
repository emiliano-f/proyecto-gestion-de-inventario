import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";

import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";

import List from "../pages/list/List"
import Detail from "../components/detail/Detail"
import Form from "../components/form/Form"
import Delete from "../components/delete/Delete"

import ServiceForm from "../pages/serviceform/ServiceForm"

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
        module.tables?.forEach((item) => {
          routes = routes.concat([
            {
              path: item.url,
              element: <List/>,
            },
            {
              path: item.url+"/detail/:id/",
              element: <Detail/>
            },
            {
              path: item.url+"/modify/:id/",
              element: <Form/>,
            },
            {
              path: item.url+"/delete/:id/",
              element: <Delete/>,
            }
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
        element: <Home />
      }
    ])
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/orden-de-servicio/login",
    element: <Login />
  },
  {
    path: "/orden-de-servicio/generate",
    element: <ServiceForm />
  }
];

const router = createBrowserRouter(routes);
export default router;