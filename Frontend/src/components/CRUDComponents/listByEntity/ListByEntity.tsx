import "./listByEntity.scss"

import { ListItems, ListItemsFiltered } from "../../../Api/apiService"
import {AiOutlineSelect} from "react-icons/ai"
import { FixedSizeList } from 'react-window';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { PureComponent, useEffect, useRef, useState } from "react";
import { MessageDisplay, setMessage } from "../messageDisplay/MessageDisplay";
import { Button, Card } from "react-bootstrap";
import { getPlural, getSingular } from "../../../data/TRANSLATIONS";
import { Field, GetColumns, GetFields } from "../../../data/STRUCTURE";
import getACTION from "../../../data/ACTIONS";
import ModalForm, { FormType } from "../modalForm/ModalForm";
import DeleteAlert from "../deleteAlert/DeleteAlert";
import { DataTable } from "../dataTable/DataTable";

function FilteredDataGrid({ filterID, filteredEntity,  setFilterID }): React.ReactElement {
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openRead, setOpenRead] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    
    const [row, setRow]: [Record<string, any>, any] = useState([]);

    const changeRef = useRef(false);

    const switchChange = () => {
        changeRef.current = !changeRef.current;
    }

    const [items, setItems] = useState([]);

    useEffect(()=>{
        if(filterID>=0){
            ListItemsFiltered(setItems, filteredEntity, filterID)
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar ${getPlural(filteredEntity)}.`,error)
            })
        }
    }, [changeRef.current, filteredEntity, setFilterID,filterID])

    const columns: GridColDef[] = GetColumns("compra", filteredEntity);
    const fields: Field[] = GetFields("compra", filteredEntity);

    return (
        <>
            <div className="item">
                <div className="info">
                    <h1>{getPlural(filteredEntity)}</h1>
                    {(getACTION(filteredEntity)["add"]) && <button className="btn btn-primary" onClick={() => setOpenAdd(true)}>Agregar {getSingular(filteredEntity)}</button>}
                </div>

                <DataTable slug={filteredEntity} columns={columns} rows={items} setOpenUpdate={setOpenUpdate} setOpenRead={setOpenRead} setOpenDelete={setOpenDelete} setRow={setRow} />

                {openAdd && <ModalForm slug={filteredEntity} fields={fields} setOpen={setOpenAdd} formType={FormType.ADD} row={null} switchChange={switchChange} />}
                {openUpdate && <ModalForm slug={filteredEntity} fields={fields} setOpen={setOpenUpdate} formType={FormType.UPDATE} row={row} switchChange={switchChange} />}
                {openRead && <ModalForm slug={filteredEntity} fields={fields} setOpen={setOpenRead} formType={FormType.READ} row={row} switchChange={switchChange} />}
                {openDelete && <DeleteAlert slug={filteredEntity} id={row["id"]} setOpen={setOpenDelete} switchChange={switchChange} />}
            </div>
        </>

    )
}

class renderRow extends PureComponent {
    render() {

        const filters = this.props.data["filters"];
        const setFilterID = this.props.data["setFilter"];
        const handleClick = (filter) => setFilterID(filter["id"]);

        const readClick = () => (console.log("Abrir modal Read"))
        return (
            filters.map((filter,index) => {
            return (
                <ListItem key={index}>
                    <ListItemButton onClick={() => handleClick(filter)}>
                        <ListItemText primary={`${filter["id"]}\n${Date(filter["fechaHora"])}`} />
                        <ListItemIcon>
                            <AiOutlineSelect/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            );
        })
        );
    }
}


function ListFilters({ setFilterID, filterName }): React.ReactElement {

    const [filters, setFilters] = useState([]);

    useEffect(() => {
        ListItems(setFilters, filterName)
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar ${getPlural(filterName)}.`, error)
            })
    }, [setFilters])
    
    return (
        <div className="Filters">
                <h4>Pedidos de Insumo</h4>
            <Card>
                <FixedSizeList
                    height={570}
                    width={300}
                    itemSize={50}
                    itemCount={filters.length}
                    overscanCount={1}
                    itemData={{filters:filters,setFilter:setFilterID}}
                >   
                    {renderRow}
                </FixedSizeList>
            </Card>
        </div>
    );
}

const ListByEntity = ({ entityNameToFilterBy, entityNameToList }) => {
    const ErrorState = useState(["", false]);
    
    //Operaciones de Filtro
    const [openRead, setOpenRead] = useState(false);

    // Operaciones de etnidad

    const [filterID, setFilterID] = useState(-1);
    console.log(filterID)
    return (
        <>
            <MessageDisplay {...ErrorState} />
            <div className="ListByEntity">
                <ListFilters setFilterID={setFilterID} filterName={entityNameToFilterBy} />
                <FilteredDataGrid filterID={filterID} filteredEntity={entityNameToList} setFilterID={setFilterID}/>
            </div>
            
        </>
    );
}

export default ListByEntity;