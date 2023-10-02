import "./bigChartBox.scss"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Lun",
        Bidón_Agúa: 3,
        Jabón: 3,
        Papel_Higenico: 15,
    },
    {
        name: "Mar",
        Bidón_Agúa: 5,
        Jabón: 30,
        Papel_Higenico: 15,
    },
    {
        name: "Mier",
        Bidón_Agúa: 2,
        Jabón: 30,
        Papel_Higenico: 15,
    },
    {
        name: "Jue",
        Bidón_Agúa: 8,
        Jabón: 30,
        Papel_Higenico: 15,
    },
    {
        name: "Vier",
        Bidón_Agúa: 1,
        Jabón: 30,
        Papel_Higenico: 15,
    },
    {
        name: "Sab",
        Bidón_Agúa: 20,
        Jabón: 30,
        Papel_Higenico: 15,
    },
    {
        name: "Dom",
        Bidón_Agúa: 20,
        Jabón: 30,
        Papel_Higenico: 15,
    },
];

export const BigChartBox = () => {
  return (
    <div className="bigChartBox">
        <h1>Insumos más consumidos (Anual)</h1>
        <div className="chart">
            <ResponsiveContainer width="99%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Bidón_Agúa" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="Jabón" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="Papel_Higenico" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}
