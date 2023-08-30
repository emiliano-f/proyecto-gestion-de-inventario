import TopBox from "../../components/topBox/TopBox"
import ChartBox from "../../components/chartBox/ChartBox"
import "./home.scss"
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../data"
import BarChartBox from "../../components/barChartBox/BarChartBox"
import { PieChartBox } from "../../components/pieChartBox/PieChartBox"
import { BigChartBox } from "../../components/bigChartBox/BigChartBox"

function Home() {
  return (
    <div className="home">
      <h1>Bienvenido!</h1>
    </div>
  )
}

export default Home