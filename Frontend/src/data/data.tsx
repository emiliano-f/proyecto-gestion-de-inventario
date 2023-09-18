import {createContext} from "react"
import STRUCTURE from "./structure.tsx"

//==================REACT CONTEXT=============================//

/**
 * Contexto para compa"tarea"rtir variables entre las vistas CRUD.
 * 
 * Se utiliza para informar al componente List que se ha realizado
 * una operación correcta en el ApiService y retornar el mensaje 
 * correspondiente. 
 */
export const crudContext = createContext([]);

//==================BACKEND URL'S============================//
 
/**
* Construye el diccionario en funcion de tableClumnMetaData
* @returns Diccionario<tabla,url>
*/
function buildUrls() {
    const urls: Record<string, string> = {};
    Object.keys(STRUCTURE).forEach((module) => {
        Object.keys(STRUCTURE[module]).forEach((entity) => {
            urls[entity] = `/${module}/${entity}/`
        })
    })
    return urls;
}

/**
 * Endpoints(URL's) del backend utilizados por apiService.tsx
 */
export const backendUrls: Record<string, string> = buildUrls()

//======================NAMES CONSTANTS==================================//

function getNames(): Array<string>{
    const Names = Object.keys(STRUCTURE);
    Object.keys(STRUCTURE).map((module) => {
        Names.concat(Object.keys(STRUCTURE[module]))
    })
    return Names
}

const names : Array<string> = getNames();

/**
 *  Obtiene el nombre del final del uri correspondiente a partir del nombre de un campo.
 * El campo debe ser una columna con referencia foránea
 * @param fieldName 
 * @returns 
 */
export function getUri(fieldName:string): string {
    switch(fieldName) {
        case "tipoInsumo":
            return "tipos-insumo";
            break;
        case "tipoHerramienta":
            return "tipos-herramienta";
            break;
        default:
            throw new Error(`El campo ${fieldName} no tiene uri asignada`);

    }
}

//=======================SIDEBAR VARIABLES=================================//
const translations : Record<string,Record<string,string>> = {
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
    "presupuesto": {
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
}

export function getSingular(name: string){
    //console.log(name)
    return translations[name].singular
}

export function getPlural(name: string){
    return translations[name].plural
}

//=======================SIDEBAR VARIABLES=================================//

/**
 * Una función que genera todas las secciones y entidades que se gestionan
 * @returns Un objeto que representa la seccion de Modulos
 */
function buildModulesSection() {
    return {
        id: 2,
        title: "Modulos",
        modules:
            Object.keys(STRUCTURE).map((module, index) => {
                return {
                    id: index,
                    title: getSingular(module),
                    url: `/${module}`,
                    icon: `/${module}.svg`,
                    tables: Object.keys(STRUCTURE[module]).map((entity, index) => {
                        return {
                            id: index,
                            title: getSingular(entity),
                            url: `/${module}/${entity}`,
                        }
                    })
                }
            }),
    }
}

/**
 * Lista de objetos que representan cada sección del panel menú
 * lateral izquierdo de la vista Dashboard.
 */
export const SECTIONS = [
    {
        id: 1,
        title: "Principal",
        modules: [
            {
                id: 1,
                title: "Home",
                url: "/",
                icon: "/home.svg",
            },
            {
                id: 2,
                title: "Perfil",
                url: "/users/1",
                icon: "/usuario.svg",
            },
        ],
    },
    buildModulesSection(),
    {
        id: 4,
        title: "Opciones",
        modules: [
            {
                id: 1,
                title: "Opciones",
                url: "/",
                icon: "/setting.svg",
            },
            {
                id: 2,
                title: "Backups",
                url: "/",
                icon: "/backup.svg",
            },
        ],
    },
    {
        id: 5,
        title: "Analíticas",
        modules: [
            {
                id: 1,
                title: "Charts",
                url: "/",
                icon: "/chart.svg",
            },
            {
                id: 2,
                title: "Logs",
                url: "/",
                icon: "/log.svg",
            },
        ],
    },
];