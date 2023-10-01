import "./mainResume.scss"

import RepositionChart from "../../components/chartComponents/repostionChart/RepostionChart"
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
export default MainReusme

/*
  import TopBox from "../../components/chartComponents/topBox/TopBox"
  import ChartBox from "../../components/chartComponents/chartBox/ChartBox"
  import BarChartBox from "../../components/chartComponents/barChartBox/BarChartBox"
  import { PieChartBox } from "../../components/chartComponents/pieChartBox/PieChartBox"
  import { BigChartBox } from "../../components/chartComponents/bigChartBox/BigChartBox"
  import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../data"
  <div className="box box1"><TopBox /></div>
  <div className="box box2"><ChartBox {...chartBoxUser} /></div>
  <div className="box box3"><ChartBox {...chartBoxProduct} /></div>
  <div className="box box4"><PieChartBox /></div>
  <div className="box box5"><ChartBox {...chartBoxConversion} /></div>
  <div className="box box6"><ChartBox {...chartBoxRevenue} /></div>
  <div className="box box7"><BigChartBox /></div>
  <div className="box box8"><BarChartBox {...barChartBoxVisit} /></div>
  <div className="box box9"><BarChartBox {...barChartBoxRevenue} /></div>
*/