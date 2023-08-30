import { GridColDef } from "@mui/x-data-grid"
import "./add.scss"
import { useState } from "react";

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

export const Add = (props: Props) => {


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // add new item
        // setItem(e)
    }

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={()=>props.setOpen(false)}>X</span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                    .filter(item=>item.field !== "id" && item.field !== "img")
                    .map(column => (
                        <div className="item">
                            <label htmlFor="">{column.headerName}</label>
                            <input type={column.type} placeholder={column.field} />
                        </div>
                    ))}
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}
