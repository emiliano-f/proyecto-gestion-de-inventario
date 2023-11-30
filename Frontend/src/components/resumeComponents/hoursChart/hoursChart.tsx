import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { ListItems } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";

const HoursChart = () => {
    const [stats, setStats] = useState([]);

    useEffect(()=>{
        ListItems(setStats, "stat-hours")
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar estadísticas.`,error)
            })
    },[setStats])
    
    return (
      <div className="topBox">
          <h1>Empleados con más horas trabajadas</h1>
          <div className="list">
              {stats.map((task,key) => (
                  <div className="listItem" key={key}>
                      <div className="user">
                          <div className="userTexts">
                              <span className="username">{task["name"]}</span>
                              <span className="email">{task["type"]}</span>
                          </div>
                      </div>
                      <div className="disp">
                          <span className="value">{task["value"]}</span>
                          <span> / </span>
                          <span className="reposition">{task["repositionValue"]}</span>                        
                      </div>
                  </div>
              ))}
          </div>
      </div>
    )
  }

export default HoursChart