import "./stockAdjustment.scss";
import { useState } from "react";

import { GetUrlParts, UpdateItem as Update, CreateItem as Create } from "../../../Api/apiService"
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";
import { Field } from "../getColumns/GetColumns";
import Button from 'react-bootstrap/Button'
import SelectList from "../selectList/SelectList";

import Form from 'react-bootstrap/Form';



type Props = {
    slug: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: number,
    id: number,
    switchChange: () => void,
}


const StockAdjusment = (props: Props) => {

    const { item: itemName, module: moduleName } = GetUrlParts();

    const [validated, setValidated] = useState(false);
    console.log(itemName);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("insumo", props.id.toString());
        formData.append('accionCantidad', '+');
        

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            Create('ajustes-stock', formData)
                .then(() => {
                    setMessage(`El ajuste de stock sobre ${props.slug} se ha realizado con exito`, null)
                })
                .catch((error) => {
                    setMessage(`Ha surgido un error al realizar el ajuste de stock sobre ${props.slug}.`, error)
                })
                .finally(() => props.setOpen(false));
            console.log("Ajuste de stock realizado");

        }
        setValidated(true);
        props.setOpen(false);


    };

    return (

        <div className="modal-background2">
            <div className="modal-front2">
                <button className="close btn dark" onClick={() => props.setOpen(false)}>X</button>

                <h1>Ajuste de stock</h1>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="row g-2">
                        <Form.Group className="form-group col-5">
                            <Form.Label>Insumo</Form.Label>
                            <Form.Control
                                name="insumo"
                                required
                                type="string"
                                placeholder={props.slug}
                                disabled
                            />
                            <Form.Control.Feedback />
                        </Form.Group>
                        <Form.Group className="form-group col">
                            <Form.Label>Cantidad actual</Form.Label>
                            <Form.Control
                                name="cantidad"
                                required
                                placeholder={props.currentValue.toString()}
                                disabled
                            />
                            <Form.Control.Feedback />
                        </Form.Group>

                        <Form.Group className="form-group col">
                            <Form.Label>Cantidad a ajustar</Form.Label>
                            <Form.Control
                                name="cantidad"
                                required
                                type="number"
                                placeholder="Ingrese cantidad"
                                defaultValue={0}
                            />
                            <Form.Control.Feedback />
                        </Form.Group>

                    </div>
                    <div className="row g-2">
                        <Form.Group className="form-group col">
                            <Form.Label>Motivo</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="observaciones"
                                required
                                type="text"
                                placeholder="Ingrese motivo"
                                defaultValue=""
                            />
                            <Form.Control.Feedback />
                        </Form.Group>

                    </div>
                    

                    <Button type="submit" className="mt-3"
                        onClick={() => props.switchChange()}>
                        Hacer ajuste
                    </Button>

                </Form>
            </div>

        </div>
        

    );
}

export default StockAdjusment; 