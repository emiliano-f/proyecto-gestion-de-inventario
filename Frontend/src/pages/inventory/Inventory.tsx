import { useEffect, useState } from "react"
import "./inventory.scss"
import { DataTable } from "../../components/dataTable/DataTable"
import { Add } from "../../components/add/Add"
import { GridColDef } from "@mui/x-data-grid";
// import { inventory } from "../../data";


const columns: GridColDef[] = [
    {
        field: "codigo",
        headerName: "Codigo",
        type: "string",
        width: 200,
    },
    {
        field: "descripcion",
        type: "string",
        headerName: "Descripcion",
        width: 250,
    },
    {
        field: "tipoInsumo",
        headerName: "TipoInsumo",
        width: 200,
    },
    {
        field: "cantidad",
        type: "number",
        headerName: "Cantidad",
        width: 200,
    },
    {
        field: "puntoReposicion",
        headerName: "Pto Reposicion",
        type: "number",
        width: 200,
    },
    
];



const Inventory = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/inventario/insumo",)
        .then((response) => response.json())
        .then((json) => setItems(json))
    })

    return (
        <div className="inventory">
            <div className="info">
                <h1>Insumos</h1>
                <button onClick={() => setOpen(true)}>Agregar Insumo</button>
            </div>
            
            <DataTable slug="inventory" columns={columns} rows={items} />
            
            {open && <Add slug="item" columns={columns} setOpen={setOpen} />}
        </div>
    )
}

export default Inventory;