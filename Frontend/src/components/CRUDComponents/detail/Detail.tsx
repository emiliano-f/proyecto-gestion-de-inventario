import "./detail.scss"
import { useState } from "react";
import { ReadItem } from "../../../Api/apiService";
import { GetUrlParts } from "../../../data/FRONTURLS";
import { getSingular } from "../../../data/TRANSLATIONS";
import { setMessage } from "../messageDisplay/MessageDisplay";
import { getFullName } from "../../../data/STRUCTURE";

const Detail = () => {
    const [row, setRow] = useState(null);
    const {group,entity} = GetUrlParts();
    
    ReadItem(setRow, entity)
    .catch((error) => {
        setMessage(`Ha surgido un error al buscar ${getSingular(entity)}`,error)
    });
    
    return (
        <div className="detail">
            <div className="card custom-card mb-3">
                <div className="card-header">
                    {row && <h2>{row["nombre"] ? row["nombre"] : `${getSingular(entity)} ${row["id"]}`}</h2>}
                </div>
                <div className="card-body">
                    {row 
                        ? Object.keys(row).map((key, index) => (
                            (key !== "id" && key !== "nombre") && 
                            (
                                <div className="row" key={index}>
                                    <span className="title">{getFullName(group, entity, key)} : </span>
                                    <span className="value">{row[key]}</span>
                                </div>
                            )
                        )) 
                        : <h1>El {getSingular(entity)} solicitado no se 
                        encuentra en la base de datos con esa id</h1>
                    }
                </div>
            </div>

            <div className="activities">
                <h3>Última actividad</h3>
                <ul>
                    <li>
                        <div>
                            <p>Actividad 4</p>
                            <time>Hace 1 semana</time>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Actividad 3</p>
                            <time>Hace 3 semanas</time>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Actividad 2</p>
                            <time>Hace 1 mes</time>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Actividad 1</p>
                            <time>Hace 2 meses</time>
                        </div>
                    </li>

                </ul>

            </div>
        </div>
    )
}

export default Detail

