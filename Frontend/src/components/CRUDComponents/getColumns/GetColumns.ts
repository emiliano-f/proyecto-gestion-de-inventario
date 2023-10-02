import { GridColDef } from "@mui/x-data-grid";
import STRUCTURE from "../../../data/structure";

export function GetColumns(moduleName: string, itemName: String): GridColDef[] {
    return Object.entries(STRUCTURE[moduleName][itemName])
        .filter(([key, attribute]) => attribute.show === true)
        .map(([key, attribute]) => {
            var getter =  attribute.type === "date" ? 
            params => {console.log(params.value);return new Date(params.value)} : null
            return {
                field: key,
                headerName: attribute.name,
                type: attribute.type,
                flex: attribute.col_size,
                valueGetter: getter
            };
        });
}

// export default GetColumns;

export type Field = {
    field: string,
    headerName: string,
    type: string,
    required: boolean,
    editable : boolean,
    select: boolean,
    enum: boolean;
}

export function GetFields(moduleName: string, itemName: String): Field[] {
    return Object.entries(STRUCTURE[moduleName][itemName])
        .map(([key, attribute]) => {
            return {
                field: key,
                headerName: attribute.name,
                type: attribute.type,
                required: attribute.required,
                editable: attribute.editable,
                select: attribute.select,
                enum: attribute.enum
            };
        });
}
