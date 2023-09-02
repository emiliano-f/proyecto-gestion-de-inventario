import { RouteObject, createBrowserRouter,redirect} from "react-router-dom";

import Home from "../../pages/home/Home";
import ItemList  from "../../pages/listItem/ListItem";
import {CreateForm,ReadForm,UpdateForm,DeleteForm} from "../martinComps/Form/Form";
import {ReadItem,FormSubmitter,resources} from "../dataHandler/Api/apiService";

/*información: https://reactrouter.com/en/main/route/route*/


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
/**
 * Array que contiene los objetos que definen las rutas de la aplicación
 */

var routes = [
  {
    path: "/",
    loader: () => (redirect("/home"))
  },
  {
    path: "/home",
    element: <Home/>,
    children : getItemRoutes(),
  }
];
console.log(routes)
const router = createBrowserRouter(routes);
export default router;