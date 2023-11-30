import { useEffect, useState } from "react";
import "./taskCompletedChart.scss"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { ListItems } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";
type Props = {
    title: string;
    color: string;
    dataKey: string;
    chartData: object[];
}

const TaskCompletedChart = () => {

    const [stats, setStats] = useState([]);

    useEffect(() => {
        ListItems(setStats, "stat-completed")
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar estadísticas.`, error)
            })
    }, [setStats])
    const porps ={
        color: "#FF8042",
        dataKey: "visit",
        chartData: stats,
    }
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <span>{"Tareas completadas"}</span>
                </div>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.chartData}>\
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 12, y: 60 }}
                            />
                            <Line type="monotone"
                                dataKey={props.dataKey}
                                stroke={props.color}
                                strokeWidth={2}
                            />
                            dot={false}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span className="duration">este año</span>
                </div>
            </div>
        </div>
    )
}

export default TaskCompletedChart