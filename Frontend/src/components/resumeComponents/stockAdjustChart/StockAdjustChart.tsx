import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { ListItems } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageProvider/MessageProvider";

const StockAdjustChart = () => {

    const [stats, setStats] = useState([]);

    useEffect(()=>{
        ListItems(setStats, "stat-insumos")
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar estadísticas}.`,error)
            })
    },[setStats])

    const props = {
        color: "#39208",
        dataKey: "value",
        chartData: stats.map((stat)=>(
            { name: stat["name"], value: stat["value"] }
        ))
    }

    return (
    <div className="chartBox">
        <div className="boxInfo">
            <div className="title">
                <span>Cantidad de tareas Ajustes de stock realizados</span>
            </div>
        </div>
        <div className="chartInfo">
            <div className="chart">
                  <ResponsiveContainer width="99%" height="100%">
                      <LineChart data={props.chartData}>
                        <Tooltip contentStyle={{background:"transparent", border:"none"}}
                        labelStyle={{display:"none"}}
                        position={{x:12, y:60}}
                        />
                        <Line type="monotone" dataKey={props["dataKe"]} stroke={props.color} strokeWidth={2} />
                        dot={false}
                      </LineChart>
                  </ResponsiveContainer>
            </div>
            <div className="texts">
                <span className="duration">este mes</span>
            </div>
        </div>
    </div>
  )
}

export default StockAdjustChart