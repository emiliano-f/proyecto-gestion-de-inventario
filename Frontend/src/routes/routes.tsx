import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";

import Login from "../pages/login/Login";
import MainResume from "../pages/mainResume/MainResume";
import Dashboard from "../pages/dashboard/Dashboard";
import ServiceForm from "../pages/serviceform/ServiceForm"
import Detail from "../components/CRUDComponents/detail/Detail.tsx";
import NotFound from "../pages/notFound/NotFound.tsx";
import TaskForm from "../components/CRUDComponents/taskForm/TaskForm.tsx";
import List from "../components/CRUDComponents/list/List"
import RepositionForm from "../components/CRUDComponents/repositionForm/RepositionForm.tsx"
import SECTIONS from "../data/SECTIONS.tsx";
import ListByEntity from "../components/CRUDComponents/listByEntity/ListByEntity.tsx";


/**
 * Genera a partir de los elementos del menu lateral las url's correspondientes
 * (getter + function) generateRoutes(): devuelve un arreglo de objetos que representan las rutas
 * del frontend, en función de los objetos definidos en la variable SECTIONS.
 * Las url's creadas indirectamente a partir de los grupos y entidades de la variable STRUCTURE.
 * @returns Un arreglo con todas las rutas para inventario
 */
function generateRoutes() {
  var routes: RouteObject[] = [];
  SECTIONS.forEach((section) => {
    section.modules.forEach((group) => {

      routes.push(
        {
          path: group.url,
          loader: () => { return redirect(group.tables[0].url) }
        }
      );

      group.tables?.forEach((table) => {

        routes = routes.concat([
          {
            path: table.url,
            element: <List />,
          },
          {
            path: table.url + "/detail/:id/",
            element: <Detail />
          }
        ]);
      });
    });
  });
  //Special url's
  routes = routes.concat([
    {
      path: "/tarea/crear-tarea/:id/",
      element: <TaskForm />
    },
    {
      path: "/compra/detalle-pedido",
      element: <ListByEntity entityNameToFilterBy={"pedido-insumo"} entityNameToList={"detalle-pedido"}/>
    },
    {
      path: "/compra/presupuesto",
      element: <ListByEntity entityNameToFilterBy={"pedido-insumo"} entityNameToList={"presupuesto"}/>
    }
  ]);
  return routes;
}

const routes = [
  {
    path: "/",
    element: <Dashboard />,
    children: generateRoutes().concat([
      {
        index: true,
        path: "/",
        element: <MainResume />
      }
    ])
  },
  {
    path: "/orden-servicio/",
    loader: () => { return redirect("/orden-servicio/generate") }
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/orden-servicio/generate",
    element: <ServiceForm />
  },
  {
    path: "*",
    element: <NotFound />
  }
];

const router = createBrowserRouter(routes);
export default router;