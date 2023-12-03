import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ServiceForm from "../pages/serviceRequest/ServiceRequest"
import NotFound from "../pages/notFound/NotFound";
import ChangePassword from "../pages/ChangePassword/ChangePassword.tsx"

import MainResume from "../components/resumeComponents/MainResume";
import List from "../components/CRUDComponents/listComponentes/listEntity/List.tsx";
import ListByEntity from "../components/CRUDComponents/listComponentes/listByEntity/ListByEntity.tsx";
import Detail from "../components/CRUDComponents/detailEntity/Detail.tsx";
import TaskForm from "../components/CRUDComponents/createComponents/taskForm/TaskForm.tsx";
import SECTIONS from "../data/SECTIONS.tsx";

/**
 * Genera a partir de los elementos del menu lateral las url's correspondientes
 * (getter + function) generateRoutes(): devuelve un arreglo de objetos que representan las rutas
 * del frontend, en función de los objetos definidos en la variable SECTIONS.
 * Las url's creadas indirectamente a partir de los grupos y entidades de la variable STRUCTURE.
 * @returns Un arreglo con todas las rutas para inventario
 */
function generateRoutes() {
  var routes: RouteObject[] = [];
  //Special url's que tienen prioridad sobre las generadas posteriormente
  routes = routes.concat([
    {
      path: "/tarea/crear-tarea/:id/",
      element: <TaskForm action="create"/>
    },
    {
      path: "/tarea/modificar-tarea/:id/",
      element: <TaskForm action="update"/>
    },
    {
      path: "/compra/detalle-pedidos",
      element: <ListByEntity entityNameToFilterBy={"pedidos-insumo"} entityNameToList={"detalle-pedidos"}/>
    },
    {
      path: "/compra/presupuestos",
      element: <ListByEntity entityNameToFilterBy={"pedidos-insumo"} entityNameToList={"presupuestos"}/>
    }
  ]);

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
  return routes;
}

const routes = [
  {
    path: "/login",
    element: <Login />
  },
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
    path: "/orden-servicio/generate",
    element: <ServiceForm />
  },
  {
    path:"/nueva-contraseña",
    element: <ChangePassword/>
  },
  {
    path: "*",
    element: <NotFound />
  }
];

const router = createBrowserRouter(routes);
export default router;