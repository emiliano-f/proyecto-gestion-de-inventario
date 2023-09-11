import "./delete.scss"
import { DeleteItem} from "../../Api/apiService"; 
import { ReadItem,GetUrlParts } from "../../Api/apiService";
import {useState, useContext} from "react";
import { Link, useParams,redirect } from "react-router-dom";
import { translate, crudContext } from "../../data/data";

const Delete = () => {
    const [row, setRow] = useState(null);
    const {item:itemName,module:moduleName} = GetUrlParts();
    const id = useParams().id;

    const [msg,setMsg] = useContext(crudContext)

    ReadItem(setRow,itemName);

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            DeleteItem(itemName,id);
            setMsg([`Se ha eliminado el ${translate[itemName].singular} ${id} con exito`, false])
        }catch(error){
            setMsg([`Ha surgido un error al eliminar el ${translate[itemName].singular} ${id}`, true])
        }finally{
            history.back();
        } 
    };

    var r = <div>
        <h1>El {translate[itemName].singular} con id {id} no existe o ha sido borrado anteriormente.</h1>
    </div>
    if(row){
        r= <div className="addItem">
            <div className="modal">
                <h1>Eliminar {translate[itemName].singular}</h1>
                <h2>¿Está usted seguro de que quiere eliminar el {translate[itemName].singular} con identificador {id}?</h2>
                <form method="post" onSubmit={handleDelete}>
                    <button type="submit">Eliminar</button>
                </form>
                <Link to={`/${moduleName}/${itemName}`} >
                    <button className="button">Atras</button>
                </Link>
            </div>
        </div>
    }
    return (r);
};

export default Delete;