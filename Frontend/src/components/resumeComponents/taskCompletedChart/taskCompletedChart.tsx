import { useEffect, useState } from "react";
import "./taskCompletedChart.scss"
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts"
import { ListItems } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";
type Props= {
    title: string;
    color: string;
    dataKey: string;
    chartData: object[];
}

const TaskCompletedChart = (props: Props) => {

    const [stats,setStats] = useState([]);
    
    useEffect(()=>{
        ListItems(setStats, "stat-completed")
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar estadísticas.`,error)
            })
    },[setStats])

    return (
    <div className="barChartBox">
        <h1>{props.title}</h1>
        <div className="chart">
            <ResponsiveContainer width="99%" height={150}>
                <BarChart data={props.chartData}>
                    <Tooltip 
                    contentStyle={{background: "#2a3447", borderRadius:"5px"}}
                    labelStyle={{display:"none"}}
                    cursor={{fill:"none"}}
                    />
                    <Bar dataKey={props.dataKey} fill={props.color} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default TaskCompletedChart