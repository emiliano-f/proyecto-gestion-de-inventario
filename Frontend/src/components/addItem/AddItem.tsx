import { GridColDef } from "@mui/x-data-grid"
import "./addItem.scss"
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
    slug: string,
    columns: GridColDef[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}
/*
export function setItem(item:any) {
    return fetch(`http://127.0.0.1:8000/inventario/insumo/${props.slug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    })
        .then(data => data.json())
}
*/

const AddItem = (props: Props) => {

    interface formDataType { [key: string]: FormDataEntryValue }
    const responseBody: formDataType = {}

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // console.log(e.currentTarget);
        

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        axios.post(`http://127.0.0.1:8000/${props.slug}/`, formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });



        // const formData = new FormData(e.currentTarget);

        // axios.post(`http://127.0.0.1:8000/${props.slug}`,)
        /*
        console.log(e.target);
        // Read the form data
        const form  = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        //console.log(formJson);
        //console.log(formData)
        await axios.post(`localhost:8000/${props.slug}')
        */
    };


    return (
        <div className="addItem">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Crear nuevo {props.slug}</h1>
                <form method="post" onSubmit={handleSubmit}>
                    {props.columns
                        .filter(item => item.field !== "id" && item.field !== "img")
                        .map(column => (
                            <div className="item">
                                <label htmlFor="1">{column.headerName}</label>
                                <input
                                    type={column.type}
                                    name={column.field}
                                    placeholder={column.field} />
                            </div>
                        ))}
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;