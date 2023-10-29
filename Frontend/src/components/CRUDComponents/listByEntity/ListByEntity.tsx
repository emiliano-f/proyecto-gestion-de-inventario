import { ListItems } from "../../../Api/apiService"

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
    }, [setFilteredRows, setFilterID])

    return (
        <div className="DataGrid">

        </div>
    );
}

class renderRow extends PureComponent {
    render() {
        const filters = this.props.data;
        
        filters.map((filter, index) => {
            return (
                <ListItem>
                    <ListItemButton onClick={() => handleClick(filter)}>
                        <ListItemText primary={`${filter["id"]}|${filter["fechaHora"]}`} />
                        <ListItemButton onClick={() => readClick()}>
                            <ListItemIcon>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItemButton>
                </ListItem>
            );
        })
    }
}


function ListFilters({ setFilterID, filterName }): React.ReactElement {

    const [filters, setFilters] = useState([]);

    useEffect(() => {
        ListItems(setFilters, filterName)
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar ${getPlural(filterName)}.`, error)
            })
    }, [filterName])

    const handleClick = (filter) => setFilterID(filter["id"]);

    const readClick = () => (console.log("Abrir modal Read"))

    return (
        <div className="Filters">
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
                itemData={filters}
            >   
                {renderRow}
            </FixedSizeList>
        </div>
    );
}

const ListByEntity = ({ entityNameToFilterBy, entityNameToList }) => {
    const ErrorState = useState(["", false]);
    const [filterID, setFilterID] = useState(-1);
    return (
        <>
            <MessageDisplay {...ErrorState} />
            <h1>{`${getPlural(entityNameToList)} por ${getSingular(entityNameToFilterBy)}`}</h1>
            <Button>{`Crear ${getSingular(entityNameToFilterBy)}`}</Button>
            <ListFilters setFilterID={setFilterID} filterName={entityNameToFilterBy} />
            <Button>{`Crear ${getSingular(entityNameToList)}`}</Button>
            <FilteredDataGrid filterID={filterID} setFilterID={setFilterID} filteredName={entityNameToList} />
        </>
    );
}

export default ListByEntity;