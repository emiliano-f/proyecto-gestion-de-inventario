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
    "inventarios": {
        singular: "Inventario", 
        plural: "Inventarios"
    },
    "tipos-insumo": {
        singular: "Tipo de Insumo", 
        plural: "Tipos de Insumo"
    },
    "tipo-insumo": {
        singular: "Tipo de Insumo", 
        plural: "Tipos de Insumo"
    },
    "insumos": {
        singular: "Insumo", 
        plural: "Insumos"
    },
    "insumo": {
        singular: "Insumo", 
        plural: "Insumos"
    },
    "tipos-herramienta": {
        singular: "Tipo de Herramienta", 
        plural: "Tipos de Herramientas"
    },
    "tipo-herramienta": {
        singular: "Tipo de Herramienta", 
        plural: "Tipos de Herramientas"
    },
    "herramientas": {
        singular: "Herramienta", 
        plural: "Herramientas"
    },
    "herramienta": {
        singular: "Herramienta", 
        plural: "Herramientas"
    },
    "ordenes-retiro": {
        singular: "Orden de Retiro", 
        plural: "Ordenes de Retiro"
    },
    "orden-retiro": {
        singular: "Orden de Retiro", 
        plural: "Ordenes de Retiro"
    },
    "ajustes-stock": {
        singular: "Ajuste de Stock", 
        plural: "Ajustes de Stock"
    },
    "ajuste-stock": {
        singular: "Ajuste de Stock", 
        plural: "Ajustes de Stock"
    },
    "estados-herramienta": {
        singular: "Estado de Herramienta", 
        plural: "Estados de Herramienta"
    },
    "estado-herramienta": {
        singular: "Estado de Herramienta", 
        plural: "Estados de Herramienta"
    },
    "compra": {
        singular: "Compra",
        plural: "Compras"
    },
    "compras": {
        singular: "Compra",
        plural: "Compras"
    },
    "pedidos-insumo": {
        singular: "Pedido de Insumo", 
        plural: "Pedidos de Insumo"
    },
    "pedido-insumo": {
        singular: "Pedido de Insumo", 
        plural: "Pedidos de Insumo"
    },
    "presupuestos": {
        singular: "Presupuesto", 
        plural: "Presupuestos"
    },
    "presupuesto": {
        singular: "Presupuesto", 
        plural: "Presupuestos"
    },
    "detalle-pedidos": {
        singular: "Detalle de Pedido", 
        plural: "Detalles de Pedido"
    },
    "detalles-pedidos": {
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
    "crear-tarea": {
        singular: "Crear Tarea",
        plural: "Crear Tareas"
    },
    "tareas": {
        singular: "Tarea", 
        plural: "Tareas"
    },
    "empleados": {
        singular: "Empleado", 
        plural: "Empleados"
    },
    "empleado": {
        singular: "Empleado", 
        plural: "Empleados"
    },
    "ordenes-servicio": {
        singular: "Orden de Servicio", 
        plural: "Ordenes de Servicio"
    },
    "orden-servicio": {
        singular: "Orden de Servicio", 
        plural: "Ordenes de Servicio"
    },
    "encuestas-satisfaccion": {
        singular: "Encuesta de Satisfacción", 
        plural: "Encuestas de Satisfacción"
    },
    "encuesta-satisfaccion": {
        singular: "Encuesta de Satisfacción", 
        plural: "Encuestas de Satisfacción"
    },
    "sectores":{
        singular: "Sector", 
        plural: "Sectores"
    },
    "sector":{
        singular: "Sector", 
        plural: "Sectores"
    },
    "edificios":{
        singular: "Edificio", 
        plural: "Edificios"
    },
    "edificio":{
        singular: "Edificio", 
        plural: "Edificios"
    },
}

//================GETTERS Y FUNCIONES================//

export function getSingular(name: string){
    //console.log(name)
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