import { useLocation } from "react-router-dom";

import STRUCTURE
 from "../structure";
/**
* Construye las url's del frontend, en función de la los grupos lógicos
* y las entidades que se reflejan en la variable STRUCTURE.
* @returns Diccionario<entidad|grupo,url>
*/
function buildURLs() : Record<string, string> {
    const urls: Record<string, string> = {};    
    Object.keys(STRUCTURE).map((group) => {
        urls[group]=`/${group}`;
        Object.keys(STRUCTURE[group]).map((entity) => (
            urls[entity] = `/${group}/${entity}`
        ));
    });
    
    return urls;
}

export const FRONTURLS : Record<string, string>  = buildURLs();

export function GetUrlParts() : any {
    const location = useLocation()
    const parts = location.pathname.split("/").filter(part => part !== '');
    const keys = ["group","entity","id"]
    const objeto = Object.assign({}, ...parts.map((valor, index) => ({ [keys[index]]: valor })));
    return objeto;
}
