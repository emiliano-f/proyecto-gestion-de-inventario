import "./topBox.scss"
import { topDealUsers } from "../../../../data/resumeData"

const TopBox = () => {
  return (
    <div className="topBox">
        <h1>Tareas Pendientes</h1>
        <div className="list">
            {topDealUsers.map(task => (
                <div className="listItem" key={task.id}>
                    <div className="user">
                        <div className="userTexts">
                            <span className="username">{task.name}</span>
                            <span className="email">{task.usuario}</span>
                        </div>
                    </div>
                    <span className="amount">{task.date}</span>

                </div>
                
            ))}
        </div>
    </div>
  )
}

export default TopBox