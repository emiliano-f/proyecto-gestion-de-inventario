import "./bigChartBox.scss"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Enero",
        Bidón_Agúa: 30,
        Jabón: 50,
        Papel_Higenico: 75,
    },
    {
        name: "Febrero",
        Bidón_Agúa: 33,
        Jabón: 60,
        Papel_Higenico: 80,
    },
    {
        name: "Marzo",
        Bidón_Agúa: 35,
        Jabón: 55,
        Papel_Higenico: 90,
    },
    {
        name: "Abril",
        Bidón_Agúa: 28,
        Jabón: 52,
        Papel_Higenico: 70,
    },
    {
        name: "Mayo",
        Bidón_Agúa: 32,
        Jabón: 48,
        Papel_Higenico: 85,
    },
    {
        name: "Junio",
        Bidón_Agúa: 36,
        Jabón: 58,
        Papel_Higenico: 78,
    },
    {
        name: "Agosto",
        Bidón_Agúa: 31,
        Jabón: 54,
        Papel_Higenico: 88,
    },
    {
        name: "Septiembre",
        Bidón_Agúa: 29,
        Jabón: 62,
        Papel_Higenico: 72,
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
