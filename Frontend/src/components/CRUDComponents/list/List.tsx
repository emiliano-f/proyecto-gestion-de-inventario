import "./list.scss"

import { useEffect, useRef, useState } from "react"
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../dataTable/DataTable"

import { GetColumns, GetFields, Field } from "../getColumns/GetColumns";
import { ListItems, GetUrlParts } from "../../../Api/apiService";
import { setMessage, MessageDisplay } from "../messageDisplay/MessageDisplay";
import { getSingular, getPlural} from "../../../data/data"

import ModalForm, { FormType } from "../modalForm/ModalForm";

const List = () => {
    const ErrorState = useState(["",false]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [row, setRow]: [Record<string, any>, any] = useState([]);

    const changeRef = useRef(false);

    const switchChange = () => { 
        
        changeRef.current = !changeRef.current;
    }

    const [items, setItems] = useState([]);
    const { module: moduleName, item: itemName } = GetUrlParts();
    useEffect(()=>{

        ListItems(setItems, itemName)
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar ${getPlural(itemName)}`, true)
            })
    }, [changeRef.current])
    
    

    const columns: GridColDef[] = GetColumns(moduleName, itemName);
    const fields: Field[] = GetFields(moduleName, itemName);
    
    return (
        <>
            <MessageDisplay {...ErrorState}/>
            <div className="item">
                <div className="info">
                    <h1>{getPlural(itemName)}</h1>
                    <button className="button" onClick={() => setOpenAdd(true)}>Agregar {getSingular(itemName)}</button>
                </div>

                <DataTable columns={columns} rows={items} setOpenUpdate={setOpenUpdate} setRow={setRow} />

                {openAdd && <ModalForm slug={itemName} fields={fields} setOpen={setOpenAdd} formType={FormType.ADD} row={null} switchChange={switchChange} />}
                {openUpdate && <ModalForm slug={itemName} fields={fields} setOpen={setOpenUpdate} formType={FormType.UPDATE} row={row} switchChange={switchChange} />}
            </div>
        </>

    )
}

export default List;