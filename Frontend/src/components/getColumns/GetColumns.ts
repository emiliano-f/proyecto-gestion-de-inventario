import { GridColDef } from "@mui/x-data-grid";
import {tableColumnMetaData as tableMetaData} from "../../data/data.tsx";

export function GetColumns(moduleName:string,itemName:String): GridColDef[]{
    return tableMetaData[moduleName][itemName]
    .filter((colAtts : Array<any>) => colAtts[0]===true)
    .map((colAtts : Array<any>) => {
        return {
            field: colAtts[1],
            headerName: colAtts[2],
            type: colAtts[3],
            flex: colAtts[4]
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
    return tableMetaData[moduleName][itemName]
        .map((colAtts: Array<any>) => {
            return {
                field: colAtts[1],
                headerName: colAtts[2],
                type: colAtts[3],
                required: colAtts[5]
            };
        });
}
