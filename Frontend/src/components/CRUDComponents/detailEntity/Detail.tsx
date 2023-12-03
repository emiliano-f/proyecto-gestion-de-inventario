import "./detail.scss"
import { useState } from "react";
import { ReadItem } from "../../../Api/apiService";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";
import { GetUrlParts } from "../../../data/FRONTURLS";
import { getSingular } from "../../../data/TRANSLATIONS";
import { getFullName } from "../../../data/STRUCTURE";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Detail = () => {
    const [row, setRow] = useState(null);
    const {group,entity} = GetUrlParts();
    const nav = useNavigate();
    ReadItem(setRow, entity)
    .catch((error) => {
        setMessage(`Ha surgido un error al buscar ${getSingular(entity)}`,error)
    });
    console.log(row);
    
    const keys2show2ndLvl = ["nombre", "apellido", "cantidad", "insumo"];
    return (
        <div className="detail">
            <div className="card custom-card mb-3">
                <div className="card-header">
                    <Button onClick={()=>nav(-1)}>Atras</Button>
                    {row && <h2>{row["nombre"] ? row["nombre"] : `${getSingular(entity)} ${row["id"]}`}</h2>}
                </div>
                <div className="card-body">
                    {row 
                        ? Object.keys(row).map((key, index) => (
                            (key !== "id" && key !== "nombre" && key !=="userAuth") && 
                            (
                                <div className="row" key={index}>
                                    <span className="title">{getFullName(group, entity, key)} : </span>
                                    {Array.isArray(row[key]) ? (
                                        <div className="value">
                                            {row[key].map((item,idx) => (
                                                <div key={idx}>
                                                    {Object.keys(item).map((itemKey, itemIdx) => (
                                                        keys2show2ndLvl.includes(itemKey) && (
                                                            <div key={itemIdx} style={{ display: 'inline-block'}}>
                                                            {(itemKey ==="cantidad") ? (
                                                                <span>[{item[itemKey]}]&nbsp;</span>
                                                            ) : (
                                                                <span>{item[itemKey]}&nbsp;</span>
                                                            )}

                                                            
                                                        </div>
                                                        )
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="value">{row[key]}</span>
                                    )}

                                </div>
                            )
                        )) 
                        : <h1>El {getSingular(entity)} solicitado no se 
                        encuentra en la base de datos con esa id</h1>
                    }
                </div>
            </div>

        </div>
    )
}

export default Detail

