import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";


import Dashboard from "../pages/dashboard/Dashboard";
import Insumos from "../pages/insumos/Insumos";
import Insumo from "../pages/insumo/Insumo";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";

/*información: https://reactrouter.com/en/main/route/route*/

/*
function getItemRoutes(){
  var routes :RouteObject[] = [];
  Object.keys(resources).forEach((module) => {
    Object.keys(resources[module]).forEach((item) => {
        const newRoutes:RouteObject[]= [
        {
          path:`${module}/${item}`,
          element: <ItemList />
        },
        {
          path: `${module}/${item}/create/`,
          element: <CreateForm/>,
          action: FormSubmitter
        },
        {
          path: `${module}/${item}/read/:id`,
          element: <ReadForm/>,
          action: ReadItem
        },
        {
          path: `${module}/${item}/update/:id`,
          element: <UpdateForm/>,
          action: FormSubmitter
        },
        {
          path: `${module}/${item}/delete/:id`,
          element: <DeleteForm/>,
          action: FormSubmitter
        }];
        routes = routes.concat(newRoutes)
      return ;});
    return ;});
    routes.push(
      {
        index:true,
        element: <Home/>
      }
    );
    return routes;
  }
  */

/**
 * Array que contiene los objetos que definen las rutas de la aplicación
 */

var routes = [

  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/inventario/insumos",
        element: <Insumos />
      },

      {
        path: "/inventario/insumos/:id",
        element: <Insumo />
      },
      /*
      {
        path: "/inventario/tipos-insumo",
        element: <Insumos />
      },
      {
        path: "/inventario/tipos-insumo/:id",
        element: <Insumo />
      }
      */
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
];

// console.log(routes)
const router = createBrowserRouter(routes);
export default router;