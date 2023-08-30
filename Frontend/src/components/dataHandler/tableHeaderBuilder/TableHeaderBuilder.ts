import { GridColDef } from "@mui/x-data-grid";

function getColumnsToExport(module:string){
    const columns: GridColDef[] = tableMetaData[module].map((header:any[]) =>{
        if(header[0]!==true){
            return(
                {
                    field: header[1],
                    headerName: header[2],
                    type: header[3],
                    width: header[4],
                }
            );
        }
        return null;
    });
    return columns;
}

export default getColumnsToExport;

const tableMetaData:any[] = {
    "inventario": {
        "tipoinsumo": [[true,"id","ID","number",90], [true,"nombre","Nombre","string",100], [false,"descripcion","Descripción","string",200]],
        "insumo": [[true,"id","ID","number",90], [true,"tipoInsumo","Tipo de Insumo","number",90],[true,"unidadMedida","Unidad de Medida","number",90],[true,"cantidad","Cantidad","number",90],[true,"codigo","Código","string",90], [false,"observaciones","Observaciones","string",150],[false,"puntoReposicion","Punto de Reposición","number",90]],
        "tipoherramienta": [[true,"id","ID","number",90], [true,"nombre","Nombre","string",100], [false,"descripcion","Descripción","string",200]], 
        "herramienta": [[true,"id","ID","number",90], [true,"nombre","Nombre","string",100], [true,"tipoHerramienta","Tipo de Herramienta","number",90], [true,"codigo","Código","string",90], [true,"estado","Estado","string",100],[false,"fechaAlta","Fecha de Creación","string",100], [false,"observaciones","Observaciones","string",150]],
        "ordenretiro": [[true,"id","ID","number",90], [true,"insumo","Insumo","number",90], [true,"tarea","Tarea","number",90], [true,"cantidad","Cantidad","number",90], [false,"fechaHora","Fecha","string",100]], 
        "ajustestock": [[true,"id","ID","number",90], [true,"insumo","Insumo","number",90], [true,"cantidad","Cantidad","number",90] ,[true,"observaciones","Observaciones","string",120], [false,"fecha","Fecha","string",100], "accionCantidad"], 
        "estadoherramienta": [[true,"id","ID","number",90], "herramienta", [false,"fecha","Fecha","string",100], [false,"estado","Estado","string",100], [true,"observaciones","Observaciones","string",120]]
    }, 
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
    }
}
