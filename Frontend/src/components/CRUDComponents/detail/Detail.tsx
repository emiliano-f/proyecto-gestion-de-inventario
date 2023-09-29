import "./detail.scss"
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ReadItem, GetUrlParts } from "../../../Api/apiService";
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";

const Detail = () => {
    const [row, setRow] = useState(null);
    const { item: itemName, module: moduleName } = GetUrlParts();
    
    ReadItem(setRow, itemName)
    .catch((error) => {
        setMessage(`Ha surgido un error al buscar ${getSingular(itemName)}`, true)
    });
    
    return (
        <div className="detail">
            <div className="card custom-card mb-3">
                <div className="detailBotton">
                    <Link to={`/${moduleName}/${itemName}`} >
                        <button className="btn light" onClick={() => props.setOpen(false)}>X</button>
                    </Link>
                </div>
                <div className="card-header">
                    <h1>{getSingular(itemName)}</h1>
                </div>
                <div className="card-body">
                    {row 
                        ? Object.keys(row).map((key, index) => (
                            <div className="row" key={index}>
                                <span className="col1">{key} : </span>
                                <input className="col2" type="text" placeholder={row[key]} readOnly>{}</input>
                            </div>
                        )) 
                        : <h1>El {getSingular(itemName)} solicitado no se 
                        encuentra en la base de datos con esa id</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default Detail

