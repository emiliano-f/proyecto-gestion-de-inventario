import "./delete.scss"
import { DeleteItem} from "../../Api/apiService"; 
import { ReadItem,GetUrlParts } from "../../Api/apiService";
import {useState} from "react";
import { Link, useParams } from "react-router-dom";

const Delete = () => {
    const [row, setRow] = useState(null);
    const {item:itemName,module:moduleName} = GetUrlParts();
    const id = useParams().id;
    ReadItem(setRow,itemName);

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        DeleteItem(itemName,id);
    };

    var r = <div>
        <h1>El {itemName} con id {id} no existe o ha sido borrado anteriormente.</h1>
    </div>
    if(row){
        r= <div className="delete">
            <div className="modal2">
                <h2>Eliminar {itemName}</h2>
                <h1>¿Está usted seguro de que quiere eliminar el {itemName} con identificador {id}?</h1>
                <form method="post" onSubmit={handleDelete}>
                    <button className="btn btn-danger" type="submit">Eliminar</button>
                </form>
                
                <Link to={`/${moduleName}/${itemName}`} >
                    <button className="btn btn-secondary btn-lg">Atras</button>
                </Link>
            </div>
        </div>
    }
    return (r);
};

export default Delete;