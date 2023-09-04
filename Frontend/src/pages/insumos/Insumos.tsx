import { useEffect, useState } from "react"
import "./insumos.scss"
import { DataTable } from "../../components/dataTable/DataTable"
import Add from "../../components/addItem/AddItem";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
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

const Insumos = () => {
    const [open, setOpen] = useState(false);
    
    const [insumos, setInsumos] = useState([]);


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/inventario/insumos")
        .then((response) => {
            setInsumos(response.data);
        })  
        .catch((error) => {
            console.error("Error al obtener datos de /inventario/insumos");
        });
    }, []);
    
    return (
        <div className="inventory">
            <div className="info">
                <h1>Insumos</h1>
                <button onClick={() => setOpen(true)}>Agregar Insumo</button>
            </div>
            
            <DataTable slug="inventario/insumos" columns={columns} rows={insumos} />
            
            {open && <Add slug="inventario/insumos" columns={columns} setOpen={setOpen} />}
        </div>
    )
}

export default Insumos;