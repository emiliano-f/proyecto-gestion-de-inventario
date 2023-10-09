import "./repostionChart.scss"

function RepostionChart(data){
  return(    
    <div className="repositionChart">
        <div className="title">
        <h1>{data.title}</h1>
        </div>
        <div className="table-responsive">
        <table className="table">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
            </tr>
            </thead>
            <tbody>
            {data.content.map((info, index) => (
                <tr key={index} className={(info.prioridad==="alta")?"table-danger":"table-warning"}>
                <td>{info.name}</td>
                <td>{info.cantidad}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
  </div>
  
  );  
}

export default RepostionChart;