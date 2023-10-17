/**
 * Constante que refleja la relación entre el nombre de los atributos que son claves
 * foráneas y el nombre de su correspondiente entidad.
 */
const FOREINGENTITY : Record<string,string> ={
    "insumo":"insumos",
    "tipoInsumo":"tipos-insumo",
    "herramienta":"herramientas",
    "tipoHerramienta":"tipos-herramienta",
    "ordenRetiro":"ordenes-retiro",
    "ajusteStock":"ajustes-stock",
    "estadoHerramienta":"estados-herramienta",
    "pedidoInsumo":"pedidos-insumo",
    "presupuesto":"presupuestos",
    "detallePedido":"detalle-pedidos",
    "usuario":"usuarios",
    "tarea":"tareas",
    "empleado":"empleados",
    "ordenServicio":"ordenes-servicio",
    "encuestaSatisfaccion":"encuestas-satisfaccion",
    "supTarea":"tareas",
}
/**
 * (getter) getUri: en función del nombre de la columna de una tabla que representa una entidad_B, la cual representa
 * un atributo que es una clave foranea (de una entidad_A), devuelve el nombre que corresponde a esa
 * entidad_A en la variable STRUCTURE 
 * @param attribute Nombre del atributo que es clave foránea de la Entidad_B
 * @returns Nombre de la Entidad_B
 */
export function getUri(attribute:string): string {
    var name;
    if(attribute in FOREINGENTITY){
        name = FOREINGENTITY[attribute];
    }else{
        throw new Error(`El campo ${attribute} no tiene uri asignada`);
    }
    return name;
}
