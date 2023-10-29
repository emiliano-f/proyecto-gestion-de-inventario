import "./list.scss"

import { useEffect, useRef, useState } from "react"
import { GridColDef } from "@mui/x-data-grid";

import { DataTable } from "../dataTable/DataTable"
import { ListItems } from "../../../Api/apiService";
import { setMessage, MessageDisplay } from "../messageDisplay/MessageDisplay";
import ModalForm, { FormType } from "../modalForm/ModalForm";
import DeleteAlert from "../deleteAlert/DeleteAlert";

import { GetUrlParts } from "../../../data/FRONTURLS";
import { GetColumns, GetFields, Field } from "../../../data/STRUCTURE";
import { getSingular, getPlural} from "../../../data/TRANSLATIONS"
import { ACTIONS } from "../../../data/ACTIONS";
import { Link } from "react-router-dom";


const List = () => {
    const ErrorState = useState(["",false]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openRead, setOpenRead] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openStockAdj, setOpenStockAdj] = useState(false);
    
    const [row, setRow]: [Record<string, any>, any] = useState([]);

    const changeRef = useRef(false);

    const switchChange = () => {
        changeRef.current = !changeRef.current;
    }

    const [items, setItems] = useState([]);
    const { group: groupName, entity: entityName } = GetUrlParts();

    useEffect(()=>{
        ListItems(setItems, entityName)
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar ${getPlural(entityName)}.`,error)
            })
    }, [changeRef.current, entityName])

    const columns: GridColDef[] = GetColumns(groupName, entityName);
    const fields: Field[] = GetFields(groupName, entityName);
    console.log(items)
    return (
        <>
            <MessageDisplay {...ErrorState}/>
            <div className="item">
                <div className="info">
                    <h1>{getPlural(entityName)}</h1>
                    {(ACTIONS[entityName].add) && <button className="btn btn-primary" onClick={() => setOpenAdd(true)}>Agregar {getSingular(entityName)}</button>}
                </div>

                <DataTable slug={entityName} columns={columns} rows={items} setOpenUpdate={setOpenUpdate} setOpenRead={setOpenRead} setOpenDelete={setOpenDelete} setRow={setRow} />

                {openAdd && <ModalForm slug={entityName} fields={fields} setOpen={setOpenAdd} formType={FormType.ADD} row={null} switchChange={switchChange} />}
                {openUpdate && <ModalForm slug={entityName} fields={fields} setOpen={setOpenUpdate} formType={FormType.UPDATE} row={row} switchChange={switchChange} />}
                {openRead && <ModalForm slug={entityName} fields={fields} setOpen={setOpenRead} formType={FormType.READ} row={row} switchChange={switchChange} />}
                {openDelete && <DeleteAlert slug={entityName} id={row["id"]} setOpen={setOpenDelete} switchChange={switchChange} />}
            </div>
        </>

    )
}

export default List;