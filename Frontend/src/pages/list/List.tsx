import { useContext, useState } from "react"

import "./list.scss"

import { DataTable } from "../../components/dataTable/DataTable"
import { GridColDef } from "@mui/x-data-grid";

import AddItem from "../../components/addItem/AddItem";

import {ListItems,GetUrlParts} from "../../Api/apiService";
import {GetColumns, GetFields, Field} from "../../components/getColumns/GetColumns";

import { getSingular,getPlural, crudContext } from "../../data/data"

const List = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    const [msg, setMsg] = useContext(crudContext)

    const {module: moduleName,item: itemName} = GetUrlParts();
    try{
        ListItems(setItems,itemName)
    }catch(error){
        setMsg([`Ha surgido un error al buscar ${getPlural(itemName)}`, true])
    }
    const columns: GridColDef[] = GetColumns(moduleName,itemName);
    const fields: Field[] = GetFields(moduleName,itemName);
    
    //console.log(fields);

    return (
        <>
            <div id="msg" className="hiddenMsg">
                <div className={msg[1]?"alert alert-danger":"alert alert-success"}>
                    {msg[0]}
                </div>
            </div>

            <div className="item">
                <div className="info">
                    <h1>{getPlural(itemName)}</h1>
                    <button className="button" onClick={() => setOpen(true)}>Agregar {getSingular(itemName)}</button>
                </div>

                <DataTable columns={columns} rows={items} />

                {open && <AddItem slug={itemName} fields={fields} setOpen={setOpen} />}
            </div>
        </>
        
    )
}

export default List;