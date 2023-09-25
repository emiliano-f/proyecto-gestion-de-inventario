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

/**
 * Objeto que contiene la estructura general de los módulos del dashboard
 */
const STRUCTURE: Record<string, Record<string, Record<string, Record<string, any>>>> = {
    "inventario": {
        "insumos": {
            "id": {
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "tipoInsumo": {
                show: true,
                name: "Tipo de Insumo",
                type: "string",
                col_size: 0.1,
                required: true,
                enum: true
            },
            "unidadMedida": {
                show: true,
                name: "Unidad de Medida",
                type: "string",
                col_size: 0.1,
                required: true,
                enum: true
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.1,
                required: true,
                enum: false
            },
            "codigo": {
                show: true,
                name: "Código",
                type: "string",
                col_size: 0.1,
                required: false,
                enum: false
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.1,
                required: false,
                enum: false
            },
            "puntoReposicion": {
                show: true,
                name: "Punto de Reposición",
                type: "number",
                col_size: 0.1,
                required: false,
                enum: false
            }
        },
        "tipos-insumo": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false,
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "descripcion": {
                show: true,
                name: "Descripción",
                type: "string",
                col_size: 0.2,
                required: false,
                enum: false
            }
        },
        "herramientas": {
            "id": {
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "tipoHerramienta": {
                show: true,
                name: "Tipo de Herramienta",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: true
            },
            "codigo": {
                show: true,
                name: "Código",
                type: "string",
                col_size: 0.05,
                required: false,
                enum: false
            },
            "estado": {
                show: true,
                name: "Estado",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "fechaAlta": {
                show: true,
                name: "Fecha de Creación",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.15,
                required: false,
                enum: false
            },
        },
        "tipos-herramienta": {
            "id": {
                show: false,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "descripcion": {
                show: false,
                name: "Descripción",
                type: "string",
                col_size: 0.2,
                required: false,
                enum: false
            },
        },
        "ordenes-retiro": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "insumo": {
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "tarea": {
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fechaHora": {
                show: false,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
        },
        "ajustes-stock": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "insumo": {
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.1,
                required: true,
                enum: false
            },
            "fecha": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "accionCantidad": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
        },
        "estados-herramienta": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "herramienta": {
                show: true,
                name: "Herramienta",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fecha": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                required: true,
                enum: false
            },
            "estado": {
                show: false,
                name: "Estado",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "observaciones": {
                show: false,
                name: "Observaciones",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
        }
    },
    "compra": {
        "pedidos-insumo": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fechaHora": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
        },
        "presupuesto": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fecha": {
                show: true,
                name: "Fechas",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "proveedor": {
                show: true,
                name: "Proveedor",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "total": {
                show: true,
                name: "Total",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "aprobado": {
                show: true,
                name: "Aprobado",
                type: "boolean",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "pedidoInsumo": {
                show: true,
                name: "Pedido de Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
        },
        "detalle-pedidos": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "pedidoInsumo": {
                show: true,
                name: "Pedido de Insumo",
                type: "n[names[18]]umber",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "insumo": {
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "observacion": {
                show: true,
                name: "Observacion",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
        }
    },
    "usuario": {
        "usuarios": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "legajo": {
                show: true,
                name: "Leagajo",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "apellido": {
                show: true,
                name: "Apellido",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "cargo": {
                show: true,
                name: "Cargo",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "mail": {
                show: true,
                name: "Mail",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "telefono": {
                show: true,
                name: "Teléfono",
                type: "string",
                col_size: 0.05,
                required: true,
                enum: false
            },
        }
    },
    "tarea": {
        "tareas": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "supTarea": {
                show: true,
                name: "Tarea padre",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "tipo": {
                show: true,
                name: "Tipo",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "descripcion": {
                show: true,
                name: "Descripción",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fechaTentativa": {
                show: true,
                name: "Fecha tentantiva",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fechaInicio": {
                show: true,
                name: "Fecha de Inicio",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fechaFin": {
                show: true,
                name: "Fecha de Finalizacion",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
        },
        "empleados": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "dni": {
                show: true,
                name: "DNI",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "apellido": {
                show: true,
                name: "Apellido",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "telefono": {
                show: true,
                name: "Teléfono",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "mail": {
                show: true,
                name: "Mail",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "categoria": {
                show: true,
                name: "Categoría",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
        },
        "ordenes-servicio": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "usuario": {
                show: true,
                name: "Usuario",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "tarea": {
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "fechaGeneracion": {
                show: true,
                name: "Fecha de Generación",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "prioridad": {
                show: true,
                name: "Prioridad",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "categoria": {
                show: true,
                name: "Categoría",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "estado": {
                show: true,
                name: "Estado",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
        },
        "encuestas-satisfaccion": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "ordenServicio": {
                show: true,
                name: "Orden de Servicio",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "satisfaccion": {
                show: true,
                name: "Satisfacción",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "tiempoRespuesta": {
                show: true,
                name: "Tiempo de Respuesta",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
            "tarea": {
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                required: true,
                enum: false
            },
        },
    }
}

export default STRUCTURE;