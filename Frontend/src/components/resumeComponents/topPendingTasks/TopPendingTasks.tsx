import "./topPendingTasks.scss"
import { useEffect, useState } from "react";
import { ListItems } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageProvider/MessageProvider";

const TopPendingTasks = () => {
    const [stats, setStats] = useState([]);

    useEffect(()=>{
        ListItems(setStats, "stat-tasks")
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar estadísticas.`,error)
            })
    },[setStats])
    
    return (
      <div className="topBox">
          <h1>Tareas pendientes</h1>
          <div className="list">
              {stats.map((task,key) => (
                  <div className="listItem" key={key}>
                      <div className="task">
                            <div className="identifiers">
                                <span className="name">{task["id"]}</span>
                                <span className="type">{task["tipo"]}</span>
                                <span className="class">{task["clasificacion"]}</span>
                            </div>
                            <div className="location">
                                <span>{task["edificio"]}</span>
                                <span>{task["sector"]}</span>
                            </div>
                            <div className="clasification">
                                <span className="value">{task["prioridad"]}</span>
                                <span className="reposition">{task["estado"]}</span>                        
                            </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    )
  }

export default TopPendingTasks