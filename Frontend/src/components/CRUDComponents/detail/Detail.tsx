import "./detail.scss"
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ReadItem, GetUrlParts } from "../../../Api/apiService";
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";
import { Field } from "../getColumns/GetColumns";
import {getFullName} from "../../../data/structure";

const Detail = () => {
    const [row, setRow] = useState(null);
    const { item: itemName, module: moduleName } = GetUrlParts();
    console.log(itemName);
    ReadItem(setRow, itemName)
    .catch((error) => {
        setMessage(`Ha surgido un error al buscar ${getSingular(itemName)}`,error)
    });
    
    return (
        <div className="detail">    
                
            <div className="card custom-card mb-3">
                <div className="card-header">
                    {row && <h2>{row["nombre"] ? row["nombre"] : `${getSingular(itemName)} ${row["id"]}`}</h2>}
                    
                </div>
                <div className="card-body">
                    {row 
                        ? Object.keys(row).map((key, index) => (
                            (key !== "id" && key !== "nombre") && 
                            (
                                <div className="row" key={index}>
                                    <span className="title">{getFullName(moduleName, itemName, key)} : </span>
                                    <span className="value">{row[key]}</span>
                                </div>
                            )
                            
                        )) 
                        : <h1>El {getSingular(itemName)} solicitado no se 
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

