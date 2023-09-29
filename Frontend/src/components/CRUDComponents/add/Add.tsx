import "./add.scss"
import {useState } from "react";
import { GetUrlParts, CreateItem as Create } from "../../../Api/apiService"
import { getSingular } from "../../../data/data";
import { Field } from "../getColumns/GetColumns";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import SelectList from "../selectList/SelectList";

import { setMessage } from "../messageDisplay/MessageDisplay";

const mesureUnits = [
    "litro",
    "metro",
    "gramo",
    "contable"
]

type Props = {
    slug: string,
    fields: Field[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add = (props: Props) => {

    const [validated, setValidated] = useState(false);
    
    const { item: itemName } = GetUrlParts();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        console.log(formData);
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        Create(itemName, formData)
        .then(()=>{
            setMessage(`Se ha creado el nuevo ${getSingular(itemName)} con exito`, false)
        })
        .catch((error) =>{
            setMessage(`Ha surgido un error al crear el Nuevo ${getSingular(itemName)}`, true)
        })
        .finally(()=>{
            props.setOpen(false)
        })
    };
    return (
        <div className="add">
            <div className="modal2">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Crear nuevo {getSingular(props.slug)}</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                
                    {props.fields
                        .filter(item => item.field !== "id")
                        .map(field => {
                            return (
                                <Form.Group className="form-group">
                                    <Form.Label>{field.headerName}</Form.Label>
                                    {field.enum ? (
                                        field.field==="unidadMedida" ? (
                                            <Form.Select name="unidadMedida" className="form-select" defaultValue="" required>
                                                <option selected value="" disabled>Elegir unidad de medida</option>
                                                {mesureUnits.map(unidad => (
                                                    <option value={unidad} key={unidad}>{unidad}</option>
                                                ))}
                                            </Form.Select>
                                        ) : (  
                                            <SelectList fieldName={field.field}/>
                                        )
                                    ) : (
                                        <Form.Control
                                            name={field.field}
                                            required={field.required ? true : false}
                                            type={field.type}
                                            placeholder={`Ingrese ${field.headerName}`}
                                        />

                                    )
                                    }
                                    {field.required ? (
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                    ) : (<Form.Control.Feedback>

                                    </Form.Control.Feedback>)}
                                </Form.Group>
                            )
                        })
                    }
                    <Button type="submit" className="mt-3">Crear</Button>
                </Form>
            </div>
        </div>
    );
};

export default Add;