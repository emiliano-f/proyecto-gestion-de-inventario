import { ListItems } from "../../../Api/apiService"
import {AiOutlineSelect} from "react-icons/ai"
import { FixedSizeList } from 'react-window';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { PureComponent, useEffect, useState } from "react";
import { MessageDisplay } from "../messageDisplay/MessageDisplay";
import { Button } from "react-bootstrap";
import { getPlural, getSingular } from "../../../data/TRANSLATIONS";

function FilteredDataGrid({ filterID, setFilterID, filteredName }): React.ReactElement {
    const [filteredRows, setFilteredRows] = useState([])
    useEffect(() => {
        if (filterID) {
            ListItems(setFilteredRows, filteredName)
                .catch((error) => {
                    setMessage(`Ha surgido un error al buscar ${getPlural(filteredName)}.`, error)
                })
        }
    }, [setFilterID])

    return (
        <div className="DataGrid">

        </div>
    );
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
                    <ListItemText primary={`${filter["id"]} ${Date(filter["fechaHora"])}`} />
                    <ListItemButton onClick={() => handleClick(filter)}>
                        <ListItemIcon>
                            <AiOutlineSelect/>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={() => readClick()}>
                            <ListItemIcon>
                                <img src="/read.png" alt="" />
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
            <FixedSizeList
                height={400}
                width={360}
                itemSize={50}
                itemCount={filters.length}
                overscanCount={1}
                itemData={{filters:filters,setFilter:setFilterID}}
            >   
                {renderRow}
            </FixedSizeList>
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
            <h1>{`${getPlural(entityNameToList)} por ${getSingular(entityNameToFilterBy)}`}</h1>
            <ListFilters setFilterID={setFilterID} filterName={entityNameToFilterBy} />
            <Button>{`Crear ${getSingular(entityNameToList)}`}</Button>
            <FilteredDataGrid filterID={filterID} setFilterID={setFilterID} filteredName={entityNameToList} />
        
            {openRead && <ModalForm slug={entityName} fields={fields} setOpen={setOpenRead} formType={FormType.READ} row={row} switchChange={switchChange} />}
        </>
    );
}

export default ListByEntity;