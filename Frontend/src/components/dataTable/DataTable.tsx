import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useRef,useState } from "react";
import "./dataTable.scss"
import { Link } from "react-router-dom";



type Props = {
    columns: GridColDef[],
    rows: object[]
}

export const DataTable = (props: Props) => {
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);
    
    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`detail/${params.row.id}/`}>
                        <button className="button"><img src="/read.png" alt="" /></button>
                    </Link>
                    <Link to={`modify/${params.row.id}/`}>
                        <button className="button"><img src="/edit.png" alt="" /></button>
                    </Link>
                    <button className="button" onClick={() => setOpen(true)}><img src="/delete.png" alt="" /></button>
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
                //columnWidth = {containerRef.current ? containerRef.current.offsetWidth / columns.length : 100}
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
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                autoHeight
                disableDensitySelector
                disableColumnSelector
                
            />
        </div>
    )
}

