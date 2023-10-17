import STRUCTURE from "./STRUCTURE";
import {FRONTURLS} from "./FRONTURLS";
import { getSingular } from "./TRANSLATIONS";

/**
 * (getter + function) buildModulesSection: crea un objeto utilizado 
 * para reflejar la estructura lógica de grupos de entidades utilizado en en
 * la parte de Módulos del sidebar, Donde la estructura está en función de aquella 
 * reflejada en la variable STRUCTURE. Además, los atributos se encuentran en función de
 * translation. y las url's del front end, no se encuentran construidas a partir de las url's
 * del backend, pero si dependen de Structure al igual que buildUrls.
 * Depende de STRUCTURE, y de TRANSLATIONS.
 * @returns Un objeto que representa la sección de Módulos
 */
function buildModulesSection() {
    return Object.keys(STRUCTURE).map((group, index) => {
                return {
                    id: index,
                    title: getSingular(group),
                    url: FRONTURLS[group],
                    icon: `/${group}.svg`,
                    tables: Object.keys(STRUCTURE[group]).map((entity, index) => {
                        return {
                            id: index,
                            title: getSingular(entity),
                            url: FRONTURLS[entity],
                        }
                    })
                }
            })
}

/**
 * (datastructure) SECTIONS: Es un arreglo que contiene objetos que reflejan
 *  - Estructura de las secciones del Sidebar
 *  - Contenido de las secciones del Sidebar
 *  - Atributos propios de la sección del Sidebar
 *  La sección Módulos depende de buildModulesSection
 */
const SECTIONS = [
    {
        id: 1,
        title: "Principal",
        modules: [
            {
                id: 1,
                title: "Resumen",
                url: "/",
                icon: "/chart.svg",
            },
        ],
    },
    {
        id: 2,
        title: "Módulos",
        modules : buildModulesSection(),
    },
    /*{
        id: 4,
        title: "Opciones",
        modules: [
            {
                id: 1,
                title: "Opciones",
                url: "/opciones",
                icon: "/setting.svg",
            },
            {
                id: 2,
                title: "Backups",
                url: "/",/home.svg
                icon: "/backup.svg",
            }
        ],
    },*/
    /*{
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
    },*/
];

export default SECTIONS;