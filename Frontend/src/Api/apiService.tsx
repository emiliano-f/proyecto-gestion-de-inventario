import axios from "axios"
import {useEffect} from "react";
import { Link, useParams,useLocation, ActionFunctionArgs } from "react-router-dom";

const inventarioAPI = axios.create()
inventarioAPI.defaults.baseURL = "http://127.0.0.1:8000"

const backendUrls: Record<string,string>  ={
    "insumos":"/inventario/insumos",
    "tipos-insumo":"/inventario/tiposInsumo",
    "Herramientas":"/inventario/herramienta",
    "Tipo De Herramienta":"/inventario/tipoHerramienta",
}

export function ListItems(setItems : any, itemName : string) : any {
    console.log(itemName)
    useEffect(() => {
        async function loadItems(){
            await inventarioAPI.get(backendUrls[itemName])
            .then((response) => {
                setItems(response.data);
            })  
            .catch((setItemerror) => {
                console.error(`Error al obtener datos de ${backendUrls[itemName]}`);
            });
        }
        loadItems()
    },[setItems,itemName]);
}

export function ReadItem(setItem:any,itemName:string) : any {
    const {id} = useParams()
    console.log(backendUrls[itemName]+`/${id}`)
    useEffect(() => {
        async function loadItem(){
            const jsonItem = await inventarioAPI.get(backendUrls[itemName]+`/${id}`);
            setItem(jsonItem.data)
        }
        loadItem()
    },[itemName,setItem]);
}

export function GetUrlParts() : any {
    const location = useLocation()
    const parts = location.pathname.split("/").filter(part => part !== '');
    const keys = ["module","item","id"]
    const objeto = Object.assign({}, ...parts.map((valor, index) => ({ [keys[index]]: valor })));
    return objeto;
}

export function DeleteItem(itemName:string,id:number){
    async function deleteData(itemName :string,id:number){
        //Esta funcion puede cambiar
        await inventarioAPI.delete(backendUrls[itemName] +`${id}/`)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    deleteData(itemName,id);    
}

/*
export async function FormSubmitter({request,params} : any) : Promise<any> {
    
    //importante que la url este correcta
    //No puedo usar hooks en actions ni loaders
    const {item,module} = GetUrlPartsFromRequest(request);
    const id = params.id
    const url = `${module}/${item}/`;
    
    //FormData to object
    let formData = await request.formData();
    var data : any = {}
    
    for ( const [key,val] of formData) {
        data[key] = val;
    }

    var result;
    try{
        switch(request.method){
            case "POST":
                result = await inventarioAPI.post(url,data);
                break;
            case "PUT":
                result = await inventarioAPI.put(url.concat(`${id}/`),data);
                break;
            case "DELETE":
                result = await inventarioAPI.delete(url.concat(`${id}/`));
                break;
            default:{}
        }
    }catch(error : any){
        result = error.response.data
    }
    <Link to="../../" relative="path"/>
    console.log(result)
    return null;
}*/