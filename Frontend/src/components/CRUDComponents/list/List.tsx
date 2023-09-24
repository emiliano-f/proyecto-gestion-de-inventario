import "./list.scss"

import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../dataTable/DataTable"

import Add from "../add/Add";

import { GetColumns, GetFields, Field } from "../getColumns/GetColumns";
import { ListItems, GetUrlParts } from "../../../Api/apiService";
import { setMessage, MessageDisplay } from "../messageDisplay/MessageDisplay";
import { getSingular, getPlural} from "../../../data/data"

const List = () => {
    const ErrorState = useState(["",false]);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const { module: moduleName, item: itemName } = GetUrlParts();

    ListItems(setItems, itemName)
    .catch((error) => {
        setMessage(`Ha surgido un error al buscar ${getPlural(itemName)}`, true)
    })

    const columns: GridColDef[] = GetColumns(moduleName, itemName);
    const fields: Field[] = GetFields(moduleName, itemName);
    
    return (
        <>
            <MessageDisplay {...ErrorState}/>
            <div className="item">
                <div className="info">
                    <h1>{getPlural(itemName)}</h1>
                    <button className="button" onClick={() => setOpen(true)}>Agregar {getSingular(itemName)}</button>
                </div>

                <DataTable columns={columns} rows={items} />

                {open && <Add slug={itemName} fields={fields} setOpen={setOpen} />}
            </div>
        </>

    )
}

export default List;