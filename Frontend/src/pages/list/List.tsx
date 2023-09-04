import { useState } from "react"
import "./list.scss"

import { DataTable } from "../../components/dataTable/DataTable"
import { GridColDef } from "@mui/x-data-grid";

import Add from "../../components/addItem/AddItem";

import {ListItems,GetUrlParts} from "../../Api/apiService";
import GetColumns from "../../components/getColumns/GetColumns";

const List = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    const {module: moduleName,item: itemName} = GetUrlParts();
    ListItems(setItems,itemName)
    const columns: GridColDef[] = GetColumns(moduleName,itemName);
    return (
        <div className="item">
            <div className="info">
                <h1>{itemName}</h1>
                <button className="button" onClick={() => setOpen(true)}>Agregar {itemName}</button>
            </div>
            
            <DataTable columns={columns} rows={items} />
            
            {open && <Add slug={itemName} columns={columns} setOpen={setOpen} />}
        </div>
    )
}

export default List;