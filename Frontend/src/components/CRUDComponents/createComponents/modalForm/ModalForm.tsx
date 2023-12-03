import "./modalForm.scss"
import React, { useContext } from "react";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { SiBetfair } from 'react-icons/si'

import { UpdateItem as Update, CreateItem as Create } from "../../../../Api/apiService"
import { setMessage } from "../../../providerComponents/messageDisplay/MessageDisplay";
import SelectList from "../selectComponentes/selectList/SelectList";
import SelectEnum from "../selectComponentes/selecEnum/SelectEnum";
import StockAdjusment from "./stockAdjustment/StockAdjustment";

import { GetUrlParts } from "../../../../data/FRONTURLS";
import { getSingular } from "../../../../data/TRANSLATIONS";
import { Field } from "../../../../data/STRUCTURE";


export enum FormType {
    ADD = "add",
    UPDATE = "update",
    READ = "read",
    DELETE = "delete",
}

type Props = {
    slug: string,
    fields: Field[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    formType: FormType,
    row: [Record<string, any>, any] | null
    switchChange: () => void,
}

function CreateSelect({field,props}) {
    //console.log(field)
    const selectAtt = {
        fieldName: field.field,
        required: field.required,
        defaultValue:
            (props.formType === FormType.UPDATE && props.row !== null) ?
                (props.row[field.field]) : "",
    };
    return (field.enum ? <SelectEnum props={selectAtt} /> : <SelectList props={selectAtt} />);
}

function CreateControl({field,props,setOpenStockAdj}) {
    return <>
        {(field.type==="checkbox")?
            <Form.Control
            id="staffCheck"
            className="checkbox"
            name={field.field}
            required={field.required}
            type={field.type}
            value={""}
          />
        :
            <Form.Control
            className={(field.type==="checkbox")?"checkbox":"col"}
            name={field.field}
            required={field.required}
            type={field.type}
            placeholder={`Ingrese ${field.headerName}`}
            readOnly={
                props.formType === FormType.UPDATE &&
                field.field === "cantidad" &&
                props.slug === "insumos"
            }
            defaultValue={
                (props.formType === FormType.UPDATE && props.row !== null) ?
                    (props.row[field.field]) : ("")
            }
        />
        }
        {
            props.formType === FormType.UPDATE && field.field === "cantidad" &&
            props.slug === "insumos" && <div className="col-3">
                <button
                    type="button"
                    className="btn btn-light col"
                    onClick={() => { setOpenStockAdj(true) }}
                ><SiBetfair /></button>
            </div>
        }
    </>
}

const ModalForm = (props: Props) => {

    const {entity : entityName} = GetUrlParts();
    const [openStockAdj, setOpenStockAdj] = useState(false);
    const [validated, setValidated] = useState(false);

    const updateItem = (entity: string, formData: FormData, id: number) => {
        // Comentario jm: sería mejor que la función reciba un int y el casteo lo haga dentro
        Update(entity, formData, id.toString())
            .then(() => {
                setMessage(`Se ha modificado ${getSingular(entity)} con éxito`, null)
                props.setOpen(false)
                props.switchChange()
            })
            .catch((error) => {
                setMessage(`Ha surgido un error al modificar ${getSingular(entity)}.`, error)
            })
    }

    const createItem = (entity: string, formData: FormData) => {
        Create(entity, formData)
            .then(() => {
                setMessage(`Se ha creado el nuevo ${getSingular(entity)} con exito`, null)
                props.setOpen(false)
                props.switchChange()
            })
            .catch((error) => {
                console.log(error)
                setMessage(`Ha surgido un error al crear el Nuevo ${getSingular(entity)}.`, error)
            })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const check = document.getElementById("staffCheck");
        if(check!==null){
            formData.append("is_staff:",check.checked);
        }
        console.log(formData)
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            if (props.formType === FormType.UPDATE) {
                if (props.row != null)
                    updateItem(entityName, formData, props.row["id"]);
            } else {
                createItem(entityName, formData);
            }

        }
        setValidated(true);
    };

    return (
        <>
            <div className="modal-background">
                <div className="modal-front">
                    <button className="close btn dark" onClick={() => props.setOpen(false)}>X</button>
                    {props.formType === FormType.ADD && <h1>Crear nuevo {getSingular(props.slug)}</h1>}
                    {props.formType === FormType.UPDATE && <h1>Modificar {getSingular(props.slug)}</h1>}

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {props.fields
                            .filter(item => item.editable == true)
                            .map((field, index) => (
                                <Form.Group className="form-group" key={index}>
                                    <Form.Label>{field.headerName}</Form.Label>
                                    <div className="row g-2">{
                                        field.select ? (
                                            <CreateSelect field={field} props={props} />
                                        ) : (
                                            <CreateControl field={field} props={props} setOpenStockAdj={setOpenStockAdj} />
                                        )
                                    }</div>
                                    {field.required ?(
                                            <Form.Control.Feedback type="invalid">
                                                Este campo es obligatorio
                                            </Form.Control.Feedback> 
                                        ) :(
                                            <Form.Control.Feedback />
                                        ) 
                                    }
                                </Form.Group>
                            ))
                        }

                        <Button type="submit" className="mt-3"
                            disabled={props.formType === FormType.READ}>
                            {props.formType === FormType.ADD && "Crear"}
                            {props.formType === FormType.UPDATE && "Modificar"}
                        </Button>

                    </Form>
                </div>
            </div>
            {
                (openStockAdj && props.row !== null) &&
                <StockAdjusment
                    slug={props.row["nombre"]}
                    setOpen={setOpenStockAdj}
                    id={props.row["id"]}
                    switchChange={props.switchChange}
                    currentValue={props.row["cantidad"]}
                />
            }
        </>
    );
}

export default ModalForm; 