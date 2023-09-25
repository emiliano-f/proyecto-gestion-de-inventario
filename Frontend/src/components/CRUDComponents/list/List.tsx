import "./list.scss"

import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../dataTable/DataTable"

import Add from "../add/Add";

import { GetColumns, GetFields, Field } from "../getColumns/GetColumns";
import { ListItems, GetUrlParts } from "../../../Api/apiService";
import { setMessage, MessageDisplay } from "../messageDisplay/MessageDisplay";
import { getSingular, getPlural} from "../../../data/data"
import UpdateForm from "../modalForm/ModalForm";

import { FormType } from "../modalForm/ModalForm";

const List = () => {
    const ErrorState = useState(["",false]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [row, setRow]: [Record<string, any>, any] = useState([]);
    
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
                    <button className="btn btn-primary" onClick={() => setOpenAdd(true)}>Agregar {getSingular(itemName)}</button>
                </div>

                <DataTable columns={columns} rows={items} setOpenUpdate={setOpenUpdate} setRow={setRow} />

                {openAdd && <UpdateForm slug={itemName} fields={fields} setOpen={setOpenAdd} formType={FormType.ADD} row={null}/>}
                {openUpdate && <UpdateForm slug={itemName} fields={fields} setOpen={setOpenUpdate} formType={FormType.UPDATE} row={row} />}
            </div>
        </>

    )
}

export default List;