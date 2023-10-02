//======================ENUMS==================================//

/**
 * Unidades de Medida
 */
const mesureUnits: Record<string, string> = {
    L: "litro",
    MT: "metro",
    G: "gramo",
    CONT: "contable"
}


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
        detail: true,
        stockAdj: false,
        update: false,
        delete: false,
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
    "presupuesto": {
        add: true,
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
        add: true,
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
        add: true,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,
    },
    "encuestas-satisfaccion": {
        add: false,
        detail: true,
        stockAdj: false,
        update: true,
        delete: true,

    },


}
/**
 * Objeto que contiene la estructura general de los módulos del dashboard
 */
const STRUCTURE: Record<string, Record<string, Record<string, Record<string, any>>>> = {
    "inventario": {
        "insumos": {
            "id": {
                editable: false,
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "nombre": {
                editable: true,
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
            "tipoInsumo": {
                editable: true,
                show: true,
                name: "Tipo de Insumo",
                type: "string",
                col_size: 0.1,
                required: true,
                select : true,
                enum: false
            },
            "unidadMedida": {
                editable: true,
                show: true,
                name: "Unidad de Medida",
                type: "string",
                col_size: 0.1,
                required: true,
                select : true,
                enum: true
            },
            "cantidad": {
                editable: true,
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.1,
                required: true,
                select : false,
                enum: false
            },
            "codigo": {
                editable: true,
                show: true,
                name: "Código",
                type: "string",
                col_size: 0.1,
                required: false,
                select : false,
                enum: false
            },
            "observaciones": {
                editable: true,
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.1,
                required: false,
                select : false,
                enum: false
            },
            "puntoReposicion": {
                editable: true,
                show: true,
                name: "Punto de Reposición",
                type: "number",
                col_size: 0.1,
                required: false,
                select : false,
                enum: false
            },
            
        },
        "tipos-insumo": {
            "id": {
                editable: false,
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false,
            },
            "nombre": {
                editable: true,
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "descripcion": {
                editable: true,
                show: true,
                name: "Descripción",
                type: "string",
                col_size: 0.2,
                required: false,
                select : false,
                enum: false
            }
        },
        "herramientas": {
            "id": {
                editable: false,
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "nombre": {
                editable: true,
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
            "tipoHerramienta": {
                editable: true,
                show: true,
                name: "Tipo de Herramienta",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "codigo": {
                editable: true,
                show: true,
                name: "Código",
                type: "string",
                col_size: 0.05,
                required: false,
                select : false,
                enum: false
            },
            "estado": {
                editable: true,
                show: true,
                name: "Estado",
                type: "string",
                col_size: 0.15,
                required: true,
                select : true,
                enum: true
            },
            "fechaAlta": {
                editable: false,
                show: true,
                name: "Fecha de Creación",
                type: "date",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
            "observaciones": {
                editable: true,
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.15,
                required: false,
                select : false,
                enum: false
            },
        },
        "tipos-herramienta": {
            "id": {
                editable: false,
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "nombre": {
                editable: true,
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
            "descripcion": {
                editable: true,
                show: true,
                name: "Descripción",
                type: "string",
                col_size: 0.2,
                required: false,
                select : false,
                enum: false
            },
        },
        "ordenes-retiro": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "insumo": {
                editable: true,
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "tarea": {
                editable: true,
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "cantidad": {
                editable: true,
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "fechaHora": {
                editable: false,
                show: false,
                name: "Fecha",
                type: "date",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
        },
        "ajustes-stock": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "insumo": {
                editable: true,
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "cantidad": {
                editable: true,
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "observaciones": {
                editable: true,
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.1,
                required: true,
                select : false,
                enum: false
            },
            "fecha": {
                editable: false,
                show: true,
                name: "Fecha",
                type: "date",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
            "accionCantidad": {
                editable: false,
                show: true,
                name: "Fecha",
                type: "date",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
        },
        "estados-herramienta": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "herramienta": {
                editable: true,
                show: true,
                name: "Herramienta",
                type: "string",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "fecha": {
                editable: false,
                show: true,
                name: "Fecha",
                type: "date",
                col_size: 0.15,
                required: true,
                select : false,
                enum: false
            },
            "estado": {
                editable: true,
                show: false,
                name: "Estado",
                type: "string",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "observaciones": {
                editable: true,
                show: false,
                name: "Observaciones",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
        }
    },
    "compra": {
        "pedidos-insumo": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "fechaHora": {
                editable: false,
                show: true,
                name: "Fecha",
                type: "date",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "observaciones": {
                editable: true,
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
        },
        "presupuesto": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "fecha": {
                editable: true,
                show: true,
                name: "Fechas",
                type: "date",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "proveedor": {
                editable: true,
                show: true,
                name: "Proveedor",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "total": {
                editable: true,
                show: true,
                name: "Total",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "aprobado": {
                editable: true,
                show: true,
                name: "Aprobado",
                type: "boolean",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "pedidoInsumo": {
                editable: true,
                show: true,
                name: "Pedido de Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
        },
        "detalle-pedidos": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "pedidoInsumo": {
                editable: true,
                show: true,
                name: "Pedido de Insumo",
                type: "n[names[18]]umber",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "insumo": {
                editable: true,
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "cantidad": {
                editable: true,
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "observacion": {
                editable: true,
                show: true,
                name: "Observacion",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
        }
    },
    "usuario": {
        "usuarios": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "legajo": {
                editable: true,
                show: true,
                name: "Leagajo",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "nombre": {
                editable: true,
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "apellido": {
                editable: true,
                show: true,
                name: "Apellido",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "cargo": {
                editable: true,
                show: true,
                name: "Cargo",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "mail": {
                editable: true,
                show: true,
                name: "Mail",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "telefono": {
                editable: true,
                show: true,
                name: "Teléfono",
                type: "string",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
        }
    },
    "tarea": {
        "tareas": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "supTarea": {
                editable: true,
                show: true,
                name: "Tarea padre",
                type: "number",
                col_size: 0.05,
                required: false,
                select : true,
                enum: false
            },
            "tipo": {
                editable: true,
                show: true,
                name: "Tipo",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "descripcion": {
                editable: true,
                show: true,
                name: "Descripción",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "fechaTentativa": {
                editable: true,
                show: true,
                name: "Fecha tentantiva",
                type: "date",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "fechaInicio": {
                editable: true,
                show: true,
                name: "Fecha de Inicio",
                type: "date",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "fechaFin": {
                editable: true,
                show: true,
                name: "Fecha de Finalizacion",
                type: "date",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
        },
        "empleados": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "dni": {
                editable: true,
                show: true,
                name: "DNI",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "nombre": {
                editable: true,
                show: true,
                name: "Nombre",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "apellido": {
                editable: true,
                show: true,
                name: "Apellido",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "telefono": {
                editable: true,
                show: true,
                name: "Teléfono",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "mail": {
                editable: true,
                show: true,
                name: "Mail",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "categoria": {
                editable: true,
                show: true,
                name: "Categoría",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
        },
        "ordenes-servicio": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "usuario": {
                editable: true,
                show: true,
                name: "Usuario",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "tarea": {
                editable: true,
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "fechaGeneracion": {
                editable: false,
                show: true,
                name: "Fecha de Generación",
                type: "date",
                col_size: 0.08,
                required: true,
                select : false,
                enum: false
            },
            "sector":{
                editable: true,
                show:false,
                name:"Sector",
                type:"string",
                col_size:0.1,
                required:true,
                enum:false
            },
            "descripción":{
                editable: true,
                show:true,
                name:"Descripción",
                type:"string",
                col_size:0.2,
                required:false,
                enum:false
            },
            "categoria": {
                editable: true,
                show: true,
                name: "Categoría",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "prioridad": {
                editable: false,
                show: true,
                name: "Prioridad",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "fechaNesesidad":{
                editable: true,
                show: true,
                name: "Fecha de Necesidad",
                type: "date",
                col_size: 0.05,
                required: false,
                select : false,
                enum: false
            },
            "comentario":{
                editable: true,
                show:false,
                name:"Descripción",
                type:"string",
                col_size:0.2,
                required:false,
                enum:false
            },
            "estado": {
                editable: true,
                show: true,
                name: "Estado",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
        },
        "encuestas-satisfaccion": {
            "id": {
                editable: false,
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                select : false,
                enum: false
            },
            "ordenServicio": {
                editable: true,
                show: true,
                name: "Orden de Servicio",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
            "satisfaccion": {
                editable: true,
                show: true,
                name: "Satisfacción",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "tiempoRespuesta": {
                editable: true,
                show: true,
                name: "Tiempo de Respuesta",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: true
            },
            "tarea": {
                editable: true,
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                required: true,
                select : true,
                enum: false
            },
        },
    }
}

export default STRUCTURE;

export function getFullName(moduleName: string, itemName: string, fieldName: string): string | undefined {
    let currentValue: Record<string, any> | undefined = STRUCTURE;

    const properties = [moduleName, itemName, fieldName];

    for (const propiedad of properties) {
        currentValue = currentValue[propiedad];

        if (!currentValue) {
            return fieldName;
        }
    }

    return currentValue.name;
}