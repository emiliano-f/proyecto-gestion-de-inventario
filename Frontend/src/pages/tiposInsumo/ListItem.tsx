import "./listItem.scss"

import { useState } from "react";

import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/dataHandler/dataTable/DataTable"
import { Add } from "../../components/dataHandler/addItem/AddItem";
import  getColumnsToExport  from "../../components/dataHandler/tableHeaderBuilder/TableHeaderBuilder"
import { GetUrlParts } from "../../components/dataHandler/Api/apiService";
import { ListItems as getItems } from "../../components/dataHandler/Api/apiService";

const ListItem = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    getItems(setItems);
    const {module,item:itemName} = GetUrlParts();
    const columns: GridColDef[] = getColumnsToExport(module);
    
    return (
        <div className="listItem">
            <div className="info">
                <h1>{itemName}</h1>
                <button onClick={()=>setOpen(true)}>Add New {itemName}</button>
            </div>
            <DataTable slug="users" columns={columns} rows={items}/>
            {open && <Add slug="user" columns={columns} setOpen={setOpen}/>}
        </div>
    )
}

export default ListItem;