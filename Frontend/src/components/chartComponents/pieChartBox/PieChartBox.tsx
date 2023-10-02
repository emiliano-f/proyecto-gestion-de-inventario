import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss"

const data = [
    { name: "Bidón de Agua", value: 80, color: "#0088FE" },
    { name: "Jabón 10 l.", value: 56, color: "#00C49F" },
    { name: "Rollo Papel Higiénico", value: 123, color: "#FFBB28" },
    { name: "Clavos", value: 50, color: "#ff5733" },
];

export const PieChartBox = () => {
  return (
    <div className="pieChartBox">
        <h1>Insumos más consumidos (ultimo mes)</h1>
        <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                    <Tooltip
                    contentStyle={{background:"white", borderRadius:"5px"}}
                    />
                    <Pie
                        data={data}
                        innerRadius={"70%"}
                        outerRadius={"90%"}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((item) => (
                            <Cell
                            key={item.name} fill={item.color} 
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="options">
            {data.map(item=>(
                <div className="option" key={item.name}>
                    <div className="title">
                        <div className="dot" style={{backgroundColor:item.color}} />
                        <span>{item.name}</span>
                    </div>
                    <span>{item.value}</span>
                </div>

            ))}
        </div>
        
    </div>
  )
}
