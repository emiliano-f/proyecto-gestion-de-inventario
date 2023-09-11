import { useContext, useState } from "react"
import "./list.scss"

import { DataTable } from "../../components/dataTable/DataTable"
import { GridColDef } from "@mui/x-data-grid";

import Add from "../../components/addItem/AddItem";

import {ListItems,GetUrlParts} from "../../Api/apiService";
import GetColumns from "../../components/getColumns/GetColumns";
import {translate,crudContext} from "../../data/data"

const List = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    const [msg,setMsg] = useContext(crudContext)

    const {module: moduleName,item: itemName} = GetUrlParts();
    ListItems(setItems,itemName)
    const columns: GridColDef[] = GetColumns(moduleName,itemName);
    return (
        <>
            <div id="msg" className="hiddenMsg">
                <div className={msg[1]?"alert alert-danger":"alert alert-success"}>
                    {msg[0]}
                </div>
            </div>
            <div className="item">
                
                <div className="info">
                    <h1>{translate[itemName].plural}</h1>
                    <button className="button" onClick={() => setOpen(true)}>Agregar {translate[itemName].singular}</button>
                </div>
                
                <DataTable columns={columns} rows={items} />
                
                {open && <Add slug={itemName} columns={columns} setOpen={setOpen} />}
            </div>
        </>
    )
}

export default List;