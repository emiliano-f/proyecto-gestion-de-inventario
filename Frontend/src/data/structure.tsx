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
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "descripcion": {
                show: true,
                name: "Descripción",
                type: "string",
                col_size: 0.1,
                is_obligatory: true,
                enum: null
            },
            "tipoInsumo": {
                show: true,
                name: "Tipo de Insumo",
                type: "string",
                col_size: 0.1,
                is_obligatory: true,
                enum: null
            },
            "unidadMedida": {
                show: true,
                name: "Unidad de Medida",
                type: "string",
                col_size: 0.1,
                is_obligatory: true,
                enum: mesureUnits
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.1,
                is_obligatory: true,
                enum: null
            },
            "codigo": {
                show: true,
                name: "Código",
                type: "string",
                col_size: 0.1,
                is_obligatory: false,
                enum: null
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.1,
                is_obligatory: false,
                enum: null
            },
            "puntoReposicion": {
                show: true,
                name: "Punto de Reposición",
                type: "number",
                col_size: 0.1,
                is_obligatory: false,
                enum: null
            }
        },
        "tipos-insumo": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null,
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "descripcion": {
                show: true,
                name: "Descripción",
                type: "string",
                col_size: 0.2,
                is_obligatory: false,
                enum: null
            }
        },
        "herramientas": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
            "tipoHerramienta": {
                show: true,
                name: "Tipo de Herramienta",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "codigo": {
                show: true,
                name: "Código",
                type: "string",
                col_size: 0.05,
                is_obligatory: false,
                enum: null
            },
            "estado": {
                show: true,
                name: "Estado",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
            "fechaAlta": {
                show: true,
                name: "Fecha de Creación",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.15,
                is_obligatory: false,
                enum: null
            },
        },
        "tipos-herramienta": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
            "descripcion": {
                show: false,
                name: "Descripción",
                type: "string",
                col_size: 0.2,
                is_obligatory: false,
                enum: null
            },
        },
        "ordenes-retiro": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "insumo": {
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "tarea": {
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fechaHora": {
                show: false,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
        },
        "ajustes-stock": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "insumo": {
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.1,
                is_obligatory: true,
                enum: null
            },
            "fecha": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
            "accionCantidad": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
        },
        "estados-herramienta": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "herramienta": {
                show: true,
                name: "Herramienta",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fecha": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.15,
                is_obligatory: true,
                enum: null
            },
            "estado": {
                show: false,
                name: "Estado",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "observaciones": {
                show: false,
                name: "Observaciones",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
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
                is_obligatory: true,
                enum: null
            },
            "fechaHora": {
                show: true,
                name: "Fecha",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "observaciones": {
                show: true,
                name: "Observaciones",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
        },
        "presupuesto": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fecha": {
                show: true,
                name: "Fechas",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "proveedor": {
                show: true,
                name: "Proveedor",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "total": {
                show: true,
                name: "Total",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "aprobado": {
                show: true,
                name: "Aprobado",
                type: "boolean",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "pedidoInsumo": {
                show: true,
                name: "Pedido de Insumo",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
        },
        "detalle-pedidos": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "pedidoInsumo": {
                show: true,
                name: "Pedido de Insumo",
                type: "n[names[18]]umber",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "insumo": {
                show: true,
                name: "Insumo",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "cantidad": {
                show: true,
                name: "Cantidad",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "observacion": {
                show: true,
                name: "Observacion",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
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
                is_obligatory: true,
                enum: null
            },
            "legajo": {
                show: true,
                name: "Leagajo",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "apellido": {
                show: true,
                name: "Apellido",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "cargo": {
                show: true,
                name: "Cargo",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "mail": {
                show: true,
                name: "Mail",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "telefono": {
                show: true,
                name: "Teléfono",
                type: "string",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
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
                is_obligatory: true,
                enum: null
            },
            "supTarea": {
                show: true,
                name: "Tarea padre",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "tipo": {
                show: true,
                name: "Tipo",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "descripcion": {
                show: true,
                name: "Descripción",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fechaTentativa": {
                show: true,
                name: "Fecha tentantiva",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fechaInicio": {
                show: true,
                name: "Fecha de Inicio",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fechaFin": {
                show: true,
                name: "Fecha de Finalizacion",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
        },
        "empleados": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "dni": {
                show: true,
                name: "DNI",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "nombre": {
                show: true,
                name: "Nombre",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "apellido": {
                show: true,
                name: "Apellido",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "telefono": {
                show: true,
                name: "Teléfono",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "mail": {
                show: true,
                name: "Mail",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "categoria": {
                show: true,
                name: "Categoría",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
        },
        "ordenes-servicio": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "usuario": {
                show: true,
                name: "Usuario",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "tarea": {
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "fechaGeneracion": {
                show: true,
                name: "Fecha de Generación",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "prioridad": {
                show: true,
                name: "Prioridad",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "categoria": {
                show: true,
                name: "Categoría",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "estado": {
                show: true,
                name: "Estado",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
        },
        "encuestas-satisfaccion": {
            "id": {
                show: true,
                name: "ID",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "ordenServicio": {
                show: true,
                name: "Orden de Servicio",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "satisfaccion": {
                show: true,
                name: "Satisfacción",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "tiempoRespuesta": {
                show: true,
                name: "Tiempo de Respuesta",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
            "tarea": {
                show: true,
                name: "Tarea",
                type: "number",
                col_size: 0.05,
                is_obligatory: true,
                enum: null
            },
        },
    }
}

export default STRUCTURE;