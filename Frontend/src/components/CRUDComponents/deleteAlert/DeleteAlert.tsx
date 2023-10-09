import "./deleteAlert.scss"
import { useState } from "react";

import { GetUrlParts, UpdateItem as Update, CreateItem as Create, DeleteItem } from "../../../Api/apiService"
import { getSingular } from "../../../data/data";
import { setMessage } from "../messageDisplay/MessageDisplay";
import { Field } from "../getColumns/GetColumns";
import Button from 'react-bootstrap/Button'
import SelectList from "../selectList/SelectList";

import Form from 'react-bootstrap/Form';

const mesureUnits = [
    "litro",
    "metro",
    "gramo",
    "contable"
]


type Props = {
    slug: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: number | string,
    switchChange: () => void,
}


const DeleteAlert = (props: Props) => {

    const { item: itemName, module: moduleName } = GetUrlParts();

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        DeleteItem(itemName, props.id.toString())
            .then((response) => {
                setMessage(`Se ha eliminado el ${getSingular(itemName)} ${props.id} con exito`,null)
            })
            .catch((error) => {
                setMessage(`Ha surgido un error al eliminar el ${getSingular(itemName)} ${props.id}`, error)
            })
            .finally(() => props.setOpen(false));
    };


    return (
        <div className="modal-background">
            <div className="modal-front">
                <button className="close btn dark" onClick={() => props.setOpen(false)}>X</button>
                
                <h1>Eliminar {getSingular(props.slug)}</h1>
                
                <div className="deleteAlert">
                    <p>¿ Está usted seguro de que eliminar el {getSingular(props.slug)} con identificador {props.id} ?</p>

                    <form method="post" onSubmit={handleDelete}>
                        <Button type="submit" className="btn btn-danger"
                            onClick={() => props.switchChange()}>
                            Eliminar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteAlert; 