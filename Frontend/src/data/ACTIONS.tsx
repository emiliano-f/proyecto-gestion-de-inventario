/**
 * Operaciones que se pueden realizar sobre las entidades del modelo.
 * Depende de el nombre de las entidades del MER.
 */
export const ACTIONS: Record<string, any> ={
    "insumos": {
        add: true,
        detail: true,
        stockAdj: true,
        update: true,
        delete: true,
    },
    "tipos-insumo": {
        add: true,
        detail: false,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "herramientas": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "tipos-herramienta": {
        add: true,
        detail: false,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "ordenes-retiro": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "ajustes-stock": {
        add: false,
        detail: false,
        stockAdj: false,
        update: false,
        delete: true,
    },
    "estados-herramienta": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "pedidos-insumo": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "presupuestos": {
        add: false,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "detalle-pedidos": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "usuarios": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,

    },
    "tareas": {
        add: false,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "empleados": {
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "ordenes-servicio": {
        add: false,
        detail: false,
        stockAdj: false,
        update: false,
        delete: false,
    },
    "encuestas-satisfaccion": {
        add: false,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "sectores": {
        add: true,
        detail: false,
        stockAdj: false,
        update: true,
        delete: true,        
    },
    
}

export default ACTIONS;

