import "./dataTable.scss"
import { useRef } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

type Props = {
    columns: GridColDef[],
    rows: object[],
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    setRow: React.Dispatch<React.SetStateAction<number>>;
}

export const DataTable = (props: Props) => {
    const containerRef = useRef(null);

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
  
                    <button className="button" onClick={() => {props.setOpenUpdate(true); props.setRow(params.row)}}><img src="/edit.png" alt="" /></button>

                    <Link to={`delete/${params.row.id}/`}>
                        <button className="button" ><img src="/delete.png" alt="" /></button>
                    </Link>
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

