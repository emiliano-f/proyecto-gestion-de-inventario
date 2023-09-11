import "./form.scss"
import {GetUrlParts,UpdateItem as Update,ReadItem as Read} from "../../Api/apiService"
import { useState, useContext} from "react";
import { Link, useParams, redirect } from "react-router-dom";
import { translate,crudContext } from "../../data/data";

function Form(){
    const [row, setRow] = useState([]);
    const {item:itemName,module:moduleName} = GetUrlParts();
    const {id} = useParams();

    const [msg,setMsg] = useContext(crudContext)

    Read(setRow,itemName);

    interface formDataType { [key: string]: FormDataEntryValue }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        try{
            Update(itemName,formData,id);
            setMsg([`Se ha modificado el ${translate[itemName].singular} ${id} con exito`,false])
        }catch(error){
            setMsg([`Ha surgido un error al modificar el ${translate[itemName].singular} ${id}`,true])
        }finally{
            history.back();
        } 
    };

    return (
        <div>
            <div className="modals">
                <h1>Modificar {itemName}</h1>
                <form method="post" onSubmit={handleSubmit}>
                    {Object.keys(row).map((key,index) => (
                            <div className="item" key={index}>
                                <label htmlFor="1">{key}</label>
                                <input
                                    type="string"
                                    name={key}
                                    //placeholder={key}
                                    defaultValue={row[key]}
                                    />
                            </div>
                        ))}
                    <button type="submit">Modificar</button>
                </form>
                <Link to={`/${moduleName}/${itemName}`} >
                      <button className="button">Atras</button>
                </Link>
            </div>
        </div>
    );
}

export default Form; 