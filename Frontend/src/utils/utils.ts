/**
 * Funciones útiles y generales desde todo el código
 */

/**
 * Interfaz para expresar la forma típica de un objeto/Entidad.
 */
interface Entity {
    [key: string]: string;
}


/**
 * Filtra los objetos que no tienen un atributo con valor vacio (por defecto)
 * @param key Nombre del atributo
 * @param objects Listado de objetos/entidades a ser filtradas
 * @returns Listado de objetos/entidades sin atributos/key vacías
 */
export function objectFilteringNoEmptyValues(key: string, objects: Entity[]) {
    const newObjects = objects.filter(item => item[key] !== '');
    return newObjects;
}
