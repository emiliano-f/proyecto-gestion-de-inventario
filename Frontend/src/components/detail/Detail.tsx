import { ReadItem,GetUrlParts } from "../../Api/apiService";
import {useState} from "react";
import {Link} from "react-router-dom"
import "./detail.scss"
import { useParams} from "react-router-dom";
import { translate } from "../../data/data";

const Detail = () => {
    const [row, setRow] = useState(null);
    const {item:itemName,module:moduleName} = GetUrlParts();
    ReadItem(setRow,itemName);
    
    return (
        <div className="card text-bg-dark mb-3">    
            <div className="card-header">
                <h1>{translate[itemName].singular}</h1>
                <Link to={`/${moduleName}/${itemName}/modify/${useParams().id}`} className="button"><button className="btn btn-primary">Modificar</button></Link> 
            </div>
            
            <div className="details card-body">
                {row?
                Object.keys(row).map((key,index) => (
                <div className="mb-2" key={index}>
                    <span className="itemTitle">{key}: </span>
                    <span className="itemValue">{row[key]}</span>
                </div>
                )):<h1>El {itemName} solicitado no se encuentra en la base de datos con esa id</h1>
                }
            </div>
            <Link to={`/${moduleName}/${itemName}`} >
                <button className="btn btn-secondary">Atras</button>
            </Link>
                

      </div>
    )
}

export default Detail

