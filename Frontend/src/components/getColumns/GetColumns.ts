import { GridColDef } from "@mui/x-data-grid";
import STRUCTURE from "../../data/structure";

export function GetColumns(moduleName:string,itemName:String): GridColDef[]{
    return Object.entries(STRUCTURE[moduleName][itemName])
    .filter(([key,attribute]) => attribute.show === true)
    .map(([key,attribute]) => {
        return {
            field: key,
            headerName: attribute.name,
            type: attribute.type,
            flex: attribute.col_size
        };
    });
}

// export default GetColumns;

export type Field = {
    field: string,
    headerName: string,
    type: string,
    required: boolean
}

export function GetFields(moduleName: string, itemName: String): Field[] {
    return Object.entries(STRUCTURE[moduleName][itemName])
        .map(([key,attribute]) => {
            return {
                field: key,
                headerName: attribute.name,
                type: attribute.type,
                required: attribute.is_obligatory
            };
        });
}
