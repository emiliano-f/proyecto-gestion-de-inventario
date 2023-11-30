import "./topPendingTasks.scss"
import { useEffect, useState } from "react";
import { ListItems } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";
const TopPendingTasks = () => {

  const [stats, setStats] = useState([]);

  useEffect(()=>{
      ListItems(setStats, "stat-insumos")
          .catch((error) => {
              setMessage(`Ha surgido un error al buscar estadísticas.`,error)
          })
  },[setStats])
  
  return (
    <div className="topBox">
        <h1>Tareas Pendientes</h1>
        <div className="list">
            {stats.map(task => (
                <div className="listItem" key={task["id"]}>
                    <div className="user">
                        <div className="userTexts">
                            <span className="username">{task["name"]}</span>
                            <span className="email">{task["type"]}</span>
                        </div>
                    </div>
                    <span className="amount">{task["value"]/task["repositionValue"]}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopPendingTasks