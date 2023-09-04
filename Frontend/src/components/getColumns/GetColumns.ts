import { GridColDef } from "@mui/x-data-grid";

function GetColumns(moduleName:string,itemName:String): GridColDef[]{
    return tableMetaData[moduleName][itemName]
    .filter((colAtts : Array<any>) => colAtts[0]===true)
    .map((colAtts : Array<any>) => {
        return {
            field: colAtts[1],
            headerName: colAtts[2],
            type: colAtts[3],
            flex: colAtts[4],
            resizable: true
        };
    });
}

export default GetColumns;

const tableMetaData:Record<string,Record<string,Array<Array<any>>>> = {
    "inventario": {
        "tipoinsumo": [[true,"id","ID","number",90], [true,"nombre","Nombre","string",100], [false,"descripcion","Descripción","string",200]],
        "insumos": [[true,"id","ID","number",0.05], [true,"tipoInsumo","Tipo de Insumo","number",0.1],[true,"unidadMedida","Unidad de Medida","number",0.1],[true,"cantidad","Cantidad","number",0.1],[true,"codigo","Código","string",0.1], [false,"observaciones","Observaciones","string",0.1],[false,"puntoReposicion","Punto de Reposición","number",0.1]],
        "tipoherramienta": [[true,"id","ID","number",90], [true,"nombre","Nombre","string",100], [false,"descripcion","Descripción","string",200]], 
        "herramienta": [[true,"id","ID","number",90], [true,"nombre","Nombre","string",100], [true,"tipoHerramienta","Tipo de Herramienta","number",90], [true,"codigo","Código","string",90], [true,"estado","Estado","string",100],[false,"fechaAlta","Fecha de Creación","string",100], [false,"observaciones","Observaciones","string",150]],
        "ordenretiro": [[true,"id","ID","number",90], [true,"insumo","Insumo","number",90], [true,"tarea","Tarea","number",90], [true,"cantidad","Cantidad","number",90], [false,"fechaHora","Fecha","string",100]], 
        "ajustestock": [[true,"id","ID","number",90], [true,"insumo","Insumo","number",90], [true,"cantidad","Cantidad","number",90] ,[true,"observaciones","Observaciones","string",120], [false,"fecha","Fecha","string",100], "accionCantidad"], 
        "estadoherramienta": [[true,"id","ID","number",90], [true,"herramienta","Herramienta",90], [false,"fecha","Fecha","string",100], [false,"estado","Estado","string",100], [true,"observaciones","Observaciones","string",120]]
    },
    /* 
    "compra": {
        "pedidoinsumo": ["id", "fechaHora", "observaciones"], "presupuesto": ["id", "fecha", "proveedor", "total", "aprobado", "pedidoInsumo"],
        "detallepedido": ["id", "pedidoInsumo", "insumo", "cantidad", "observacion"]
    },
    "usuario": {
        "usuario": ["id", "legajo", "nombre", "apellido", "cargo", "mail", "telefono"]
    }, 
    "tarea": {
        "empleado": ["id", "dni", "nombre", "apellido", "telefono", "mail", "categoria"], 
        "ordenservicio": ["id", "usuario", "tarea", "fechaGeneracion", "prioridad", "categoria", "estado"], 
        "encuestasatisfaccion": ["id", "ordenServicio", "satisfaccion", "tiempoRespuesta", "observaciones"], 
        "tarea": ["id", "supTarea", "tipo", "descripcion", "fechaTentativa", "fechaInicio", "fechaFin"]
    }*/
}
