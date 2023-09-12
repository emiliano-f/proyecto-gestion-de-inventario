//import "./form.scss"
import {GetUrlParts,UpdateItem as Update,ReadItem as Read} from "../../Api/apiService"
import { useState, useContext } from "react";
// import { useForm } from 'react-hook-form';
import { Link, useParams, redirect } from "react-router-dom";
import { translate, crudContext } from "../../data/data";


function Form(){
    const [row, setRow] = useState([]);
    const {item:itemName,module:moduleName} = GetUrlParts();
    const {id} = useParams();

    const [msg, setMsg] = useContext(crudContext)

    Read(setRow,itemName);

    interface formDataType { [key: string]: FormDataEntryValue }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        try {
            Update(itemName, formData, id);
            setMsg([`Se ha modificado el ${translate[itemName].singular} ${id} con exito`, false])
        } catch (error) {
            setMsg([`Ha surgido un error al modificar el ${translate[itemName].singular} ${id}`, true])
        } finally {
            history.back();
        }

    };

    return (
        <div className="detail">
            <div className="itemModal">
                <h1>Modificar {itemName}</h1>
                <form method="post" onSubmit={handleSubmit}>
                    {Object.keys(row).map((key, index) => (
                        <div className="mb-2" key={index}>
                            <label className="form-label">{key}</label>
                            <input className="form-control"
                                type="string"
                                name={key}
                                //placeholder={key}
                                defaultValue={row[key]}
                            />
                        </div>
                    ))}
                    <button className="btn btn-primary" type="submit">Modificar</button>
                    <Link to={`/${moduleName}/${itemName}`} >
                        <button className="btn btn-secondary">Atras</button>
                    </Link>
                </form>
                
            </div>
        </div>
    );
}

export default Form; 