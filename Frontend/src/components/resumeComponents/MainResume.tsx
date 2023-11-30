
import "./mainResume.scss"

import TopPendingTasks from "./topPendingTasks/TopPendingTasks"
import TopPendingReposition from "./topPendingReposition/TopPendingReposition"
import PieConsumed from "./pieConsumed/PieConsumed";
import TaskCompletedChart from "./stockAdjustChart/StockAdjustChart";
import StockAdjustChart from "./stockAdjustChart/StockAdjustChart";

function MainResume() {

  //Tareas pendientes (Primeras 10)
  //Stock bajo del punto de reposición (Primero 10)  
  //Productos-más consumidos por tareas en general (Grafico Torta, 5)
  //Cantidad de Ajustes de stock realizadas por mes este año(Historico)
  //Cantidad de tareas completadas por més este año (Historico)
  
  return (
    <div className="home">
    </div>
  )
}
/*
  <div className="box box1"><TopPendingTasks/></div>  
  <div className="box box2"><StockAdjustChart/></div>
  <div className="box box3"><TaskCompletedChart/></div>
  <div className="box box1"><TopPendingReposition/></div>
  <div className="box box7"><PieConsumed/></div>
*/

export default MainResume;


/*
      <div className="box box1"><TopBox /></div>

export default Home

import RepositionChart from "./chartComponents/repostionChart/RepostionChart"
import { inventarioReposition,herramientaReposition } from "../../data/resumeData"

function MainReusme() {
  return (
    <div className="mainResume">
      <div className="inventarioModule">
        <h1>INVENTARIO</h1>
        <div className="content">
          <RepositionChart {...inventarioReposition}/>
          <RepositionChart {...herramientaReposition}/>
        </div>
      </div>
      <div className="compraModule">
        <h1>COMPRA</h1>
        <div className="content">
          
        </div>
      </div>
      <div className="usuarioModule">
        <h1>USUARIO</h1>
        <div className="content">

        </div>
      </div>
      <div className="tareaModule">
        <h1>TAREA</h1>
        <div className="content">

        </div>
      </div>
    </div>
  )
}
*/