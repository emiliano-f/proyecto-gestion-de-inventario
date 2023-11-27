import "./dataTable.scss"
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import getACTION from "../../../../data/ACTIONS"


type Props = {
    slug: string;
    columns: GridColDef[],
    rows: object[],
    setOpenRead: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>,
    setRow: React.Dispatch<React.SetStateAction<number>>;
}

export const DataTable = (props: Props) => {
    const containerRef = useRef(null);
    
    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Acciones ",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action">
                    {
                        props.slug === "ordenes-servicio" &&
                        <Link to={`/tarea/crear-tarea/${params.row.id}/`}>
                            <button className="button"><BsPlusCircle /></button>
                        </Link>
                    }
                    
                    {
                        getACTION(props.slug).detail && 
                        <Link to={`detail/${params.row.id}/`}>
                            <button className="button"><img src="/read.png" alt="" /></button>
                        </Link>
                    }
                    {getACTION(props.slug).update &&
                        <button className="button" onClick={() => { props.setOpenUpdate(true); props.setRow(params.row) }}><img src="/edit.png" alt="" /></button>
                    }
                    {
                        props.slug === "tareas" &&
                        <Link to={`/tarea/modificar-tarea/${params.row.id}/`}>
                            <button className="button"><img src="/edit.png" alt="" /></button>
                        </Link>
                    }
                    {getACTION(props.slug).delete &&
                        <button className="button" onClick={() => { props.setOpenDelete(true); props.setRow(params.row) }}><img src="/delete.png" alt="" /></button>
                    }
                </div>
            )
        },
    }

    return (
        <div className="dataTable" ref={containerRef}>
            <DataGrid
                className="dataGrid"
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },

                    }
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight
                disableDensitySelector
                disableColumnSelector

            />
        </div>
    )
}

