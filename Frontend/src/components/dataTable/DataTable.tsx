import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss"
import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";


type Props = {
    columns: GridColDef[],
    rows: object[],
    slug: string
}

const handleDelete = (slug: string, id: number) => {
    // delete the item
    // axios.delete(`/api/${slug}/id)
    
    // axios.delete(`http://127.0.0.1:8000/${slug}/${id}`);

    console.log(id + ": no se puede borrar. Método no permitido")
}

export const DataTable = (props: Props) => {
    console.log(props.rows)
    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <img src="/view.svg" alt="" />
                    </Link>
                    <div className="delete" onClick={() => handleDelete(props.slug, params.row.id)}>
                        <img src="/delete.svg" alt="" />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="dataTable">
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
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick

                disableDensitySelector
                disableColumnSelector
            />
        </div>
    )
}
