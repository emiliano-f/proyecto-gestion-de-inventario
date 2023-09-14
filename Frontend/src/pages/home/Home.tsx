import "./home.scss"
import TopBox from "../../components/chartComponents/topBox/TopBox"
import ChartBox from "../../components/chartComponents/chartBox/ChartBox"
import BarChartBox from "../../components/chartComponents/barChartBox/BarChartBox"
import { PieChartBox } from "../../components/chartComponents/pieChartBox/PieChartBox"
import { BigChartBox } from "../../components/chartComponents/bigChartBox/BigChartBox"
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../data"

function Home() {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2"><ChartBox {...chartBoxUser} /></div>
      <div className="box box3"><ChartBox {...chartBoxProduct} /></div>
      <div className="box box4"><PieChartBox /></div>
      <div className="box box5"><ChartBox {...chartBoxConversion} /></div>
      <div className="box box6"><ChartBox {...chartBoxRevenue} /></div>
      <div className="box box7"><BigChartBox /></div>
      <div className="box box8"><BarChartBox {...barChartBoxVisit} /></div>
      <div className="box box9"><BarChartBox {...barChartBoxRevenue} /></div>
    </div>
  )
}

export default Home