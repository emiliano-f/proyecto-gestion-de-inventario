import "./form.scss"
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { GetUrlParts, UpdateItem as Update, ReadItem as Read } from "../../../Api/apiService"
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";

function Form() {
    const [row , setRow] : [Record<strign,any>, any] = useState([]);
    const { item: itemName, module: moduleName } = GetUrlParts();
    const { id } = useParams();
    
    Read(setRow, itemName)
    .catch((error) => {
        setMessage(`Ha surgido un error al buscar ${getSingular(itemName)}`, true)
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        Update(itemName, formData, id)
        .then(() => {
            setMessage(`Se ha modificado ${getSingular(itemName)} con éxito`, false)
        })
        .catch((error) => {
            setMessage(`Ha surgido un error al modificar ${getSingular(itemName)}`, true)
        })
        .finally(() => history.back());
    };

    return (
        <div className="detail">
            <div className="itemModal">
                <h1>Modificar {itemName}</h1>
                <form method="post" onSubmit={handleSubmit}>
                    {Object.keys(row).map((key : string, index : number) => (
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