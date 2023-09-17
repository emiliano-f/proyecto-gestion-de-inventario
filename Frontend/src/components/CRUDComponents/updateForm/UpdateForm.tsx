import "./updateForm.scss"
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { GetUrlParts, UpdateItem as Update, ReadItem as Read } from "../../../Api/apiService"
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


function UpdateForm() {
    const [row , setRow] : [Record<string,any>, any] = useState([]);
    const { item: itemName, module: moduleName } = GetUrlParts();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    
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
        <div className="updateForm">
            <div className="modal2">
                <h1>Modificar {itemName}</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {Object.keys(row).map((key: string, index: number) => (
                        <div>
                            <Form.Group className="form-group">
                                <Form.Label>{key}</Form.Label>
                                <Form.Control
                                    type="string"
                                    name={key}
                                    defaultValue={row[key]}
                                />
                            </Form.Group>
                            
                        </div>
                       
                        
                        
                    ))}
                    <button className="btn btn-primary" type="submit">Modificar</button>
                    <Link to={`/${moduleName}/${itemName}`} >
                        <button className="btn btn-secondary">Atras</button>
                    </Link>

                </Form>
                

            </div>
        </div>
    );
}

export default UpdateForm; 