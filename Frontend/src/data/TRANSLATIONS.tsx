/**
 * TRANSLATION: Es un arreglo que contiene objetos que reflejan
 * - Estructura de las secciones del Sidebar
 * - Contenido de las secciones del Sidebar
 * - Atributos propios de la sección del Sidebar
 * La sección Módulos depende de buildModulesSection
 * Depende de el nombre de las entidades del MER.
 */
const TRANSLATION : Record<string,Record<string,string>> = {
    "inventario": {
        singular: "Inventario", 
        plural: "Inventarios"
    },
    "tipos-insumo": {
        singular: "Tipo de Insumo", 
        plural: "Tipos de Insumo"
    },
    "insumos": {
        singular: "Insumo", 
        plural: "Insumos"
    },
    "tipos-herramienta": {
        singular: "Tipo de Herramienta", 
        plural: "Tipos de Herramientas"
    },
    "herramientas": {
        singular: "Herramienta", 
        plural: "Herramientas"
    },
    "ordenes-retiro": {
        singular: "Orden de Retiro", 
        plural: "Ordenes de Retiro"
    },
    "ajustes-stock": {
        singular: "Ajuste de Stock", 
        plural: "Ajustes de Stock"
    },
    "estados-herramienta": {
        singular: "Estado de Herramienta", 
        plural: "Estados de Herramienta"
    },
    "compra": {
        singular: "Compra",
        plural: "Compras"
    },
    "pedidos-insumo": {
        singular: "Pedido de Insumo", 
        plural: "Pedidos de Insumo"
    },
    "presupuestos": {
        singular: "Presupuesto", 
        plural: "Presupuestos"
    },
    "detalle-pedidos": {
        singular: "Detalle de Pedido", 
        plural: "Detalles de Pedido"
    },
    "usuarios": {
        singular: "Usuario", 
        plural: "Usuarios"
    },
    "usuario": {
        singular: "Usuario", 
        plural: "Usuarios"
    },
    "tarea": {
        singular: "Tarea", 
        plural: "Tareas"
    },
    "empleados": {
        singular: "Empleado", 
        plural: "Empleados"
    },
    "ordenes-servicio": {
        singular: "Orden de Servicio", 
        plural: "Ordenes de Servicio"
    },
    "encuestas-satisfaccion": {
        singular: "Encuesta de Satisfacción", 
        plural: "Encuestas de Satisfacción"
    },
    "tareas": {
        singular: "Tarea", 
        plural: "Tareas"
    },
    "sectores":{
        singular: "Sector", 
        plural: "Sectores"
    }
}

//================GETTERS Y FUNCIONES================//

export function getSingular(name: string){
    try{
        return TRANSLATION[name].singular
    }catch(e){
        throw new Error(`No existe ${name} en el diccionario`)
    }
}

export function getPlural(name: string){
    try{
        return TRANSLATION[name].plural
    }catch(e){
        throw new Error(`No existe ${name} en el diccionario`)
    }
}