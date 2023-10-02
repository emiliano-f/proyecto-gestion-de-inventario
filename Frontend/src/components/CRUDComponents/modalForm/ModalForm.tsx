import "./modalForm.scss"
import { useState } from "react";

import { GetUrlParts, UpdateItem as Update, CreateItem as Create } from "../../../Api/apiService"
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";
import { Field } from "../getColumns/GetColumns";
import Button from 'react-bootstrap/Button'
import SelectList from "../selectList/SelectList";

import Form from 'react-bootstrap/Form';
import StockAdjusment from "../stockAdjustment/StockAdjustment";

const mesureUnits = [
    "litro",
    "metro",
    "gramo",
    "contable"
]

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


const ModalForm = (props: Props) => {

    const { item: itemName, module: moduleName } = GetUrlParts();
    const [openStockAdj, setOpenStockAdj] = useState(false);
    const [validated, setValidated] = useState(false);


    const updateItem = (item: string, formData: FormData, id: number) => {
        // Comentario jm: sería mejor que la función reciba un int y el casteo lo haga dentro
        Update(item, formData, id.toString())
            .then(() => {
                setMessage(`Se ha modificado ${getSingular(item)} con éxito`,null)
            })
            .catch((error) => {
                setMessage(`Ha surgido un error al modificar ${getSingular(item)}.`,error)
            })
            .finally(() => props.setOpen(false));
    }

    const createItem = (item: string, formData: FormData) => {
        console.log(formData);
        Create(item, formData)
            .then(() => {
                setMessage(`Se ha creado el nuevo ${getSingular(item)} con exito`,null)
            })
            .catch((error) => {
                setMessage(`Ha surgido un error al crear el Nuevo ${getSingular(item)}.`,error)
            })
            .finally(() => props.setOpen(false));
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            if (props.formType === FormType.UPDATE) {
                if (props.row != null)
                    updateItem(itemName, formData, props.row["id"]);
            } else {
                createItem(itemName, formData);
            }

        }
        setValidated(true);

        
    };
    const mesureUnits = [
        "litro",
        "metro",
        "gramo",
        "contable"
    ]
    return (
        <>
            <div className="modal-background">
                <div className="modal-front">
                    <button className="close btn dark" onClick={() => props.setOpen(false)}>X</button>
                    {props.formType === FormType.ADD && <h1>Crear nuevo {getSingular(props.slug)}</h1>}
                    {props.formType === FormType.UPDATE && <h1>Modificar {getSingular(props.slug)}</h1>}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {(props.formType === FormType.ADD || props.formType === FormType.UPDATE) &&
                            props.fields
                                .filter(item => item.editable == true)
                                .map((field, index) => (
                                    <Form.Group className="form-group" key={index}>
                                        <Form.Label>{field.headerName}</Form.Label>
                                        {field.enum ? (
                                            field.field === "unidadMedida" ? (
                                            <div className="row g-2">
                                                <Form.Select
                                                    name="unidadMedida"
                                                    className="form-select"
                                                    defaultValue={(props.formType === FormType.UPDATE && props.row !== null) ? (props.row["unidadMedida"]) : ("")}
                                                    required>
                                                    <option
                                                        value=""
                                                        disabled>
                                                        Elegir unidad de medida
                                                    </option>
                                                    {mesureUnits.map(unidad => (<option value={unidad} key={unidad}>{unidad}</option>))}
                                                </Form.Select>
                                            </div>
                                            ) : (
                                                <div className="row g-2">
                                                    <SelectList
                                                        fieldName={field.field}
                                                        defaultValue={(props.formType === FormType.UPDATE && props.row !== null) ?
                                                            (props.row[field.field]) : ("")} />
                                                </div>
                                            )
                                        ) : (
                                            props.formType === FormType.UPDATE && field.field === "cantidad" && props.slug === "insumos" ?
                                                (
                                                    <div className="row g-2">
                                                        <Form.Control
                                                            className="col"
                                                            name={field.field}
                                                            required={field.required ? true : false}

                                                            placeholder={`Ingrese ${field.headerName}`}
                                                            defaultValue={(props.formType === FormType.UPDATE && props.row !== null) ? (
                                                                props.row[field.field]) : ("")}
                                                            readOnly

                                                        />
                                                        <button type="button" className="button col" onClick={() => { setOpenStockAdj(true)}}><img src="/edit.png" alt="" /></button>

                                                    </div>
                                                ) : (
                                                    <div className="row g-2">
                                                        <Form.Control
                                                            className="col"
                                                            name={field.field}
                                                            required={field.required ? true : false}
                                                            type={field.type}
                                                            placeholder={`Ingrese ${field.headerName}`}
                                                            defaultValue={(props.formType === FormType.UPDATE && props.row !== null) ? (
                                                                props.row[field.field]) : ("")}
                                                        />
                                                    </div>
                                                )

                                        )}

                                        {field.required ?
                                            <Form.Control.Feedback type="invalid">
                                                Este campo es obligatorio
                                            </Form.Control.Feedback>
                                            :
                                            <Form.Control.Feedback />}
                                    </Form.Group>
                                ))
                        }

                        {props.formType === FormType.READ &&
                            props.fields
                                .map((field, index) => (
                                    <Form.Group className="form-group" key={index}>
                                        <Form.Label>{field.headerName}</Form.Label>
                                        {field.enum ?
                                            <Form.Select
                                                name="unidadMedida"
                                                className="form-select"
                                                required>
                                            </Form.Select> :
                                            <Form.Control
                                                name={field.field}
                                                disabled={true}
                                                type={field.type}
                                                defaultValue={(props.row !== null) ? (props.row[field.field]) : ("")}
                                            />
                                        }
                                    </Form.Group>
                                ))
                        }

                        <Button type="submit" className="mt-3"
                            onClick={() => props.switchChange()}
                            disabled={props.formType === FormType.READ}>
                            {props.formType === FormType.ADD && "Crear"}
                            {props.formType === FormType.UPDATE && "Modificar"}
                        </Button>

                    </Form>
                </div>
                


            </div>
            {(openStockAdj && props.row !== null) && <StockAdjusment slug={props.row["nombre"]} setOpen={setOpenStockAdj} id={props.row["id"]} switchChange={props.switchChange} currentValue={props.row["cantidad"]} />}
            
        </>
        
    );
}

export default ModalForm; 