
import "./mainResume.scss"

import TopBox from "./chartComponents/topBox/TopBox"
import ChartBox from "./chartComponents/chartBox/ChartBox"
import BarChartBox from "./chartComponents/barChartBox/BarChartBox"
import { PieChartBox } from "./chartComponents/pieChartBox/PieChartBox"
import { BigChartBox } from "./chartComponents/bigChartBox/BigChartBox"
import { chartBoxUser, chartBoxUser2 } from "../../data/resumeData"

function MainResume() {
  return (
    <div className="home">
      <div className="box box1"><TopBox /></div>
      <div className="box box2"><ChartBox {...chartBoxUser} /></div>
      <div className="box box2"><ChartBox {...chartBoxUser2} /></div>
      <div className="box box4"><PieChartBox /></div>
      <div className="box box7"><BigChartBox /></div>
    </div>
  )
}

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