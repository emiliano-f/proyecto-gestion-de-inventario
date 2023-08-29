import axios from "axios"
import {useEffect} from "react";
import { Link, useParams,useLocation } from "react-router-dom";

type setFunction = React.Dispatch<React.SetStateAction<any>>;

const inventarioAPI = axios.create()
inventarioAPI.defaults.baseURL = "http://127.0.0.1:8000"

export function ListItems(setItems : setFunction) : any {
    const {item,module} = GetUrlParts();
    const url = `${module}/${item}/`;;      
    useEffect(() => {
        async function loadItems(){
            const jsonItem = await inventarioAPI.get(url);
            setItems(jsonItem.data)
        }
        loadItems()
    },[url,setItems]);
}

export function ReadItem(setItem : setFunction) : any {
    const {item,module} = GetUrlParts();
    const {id} = useParams()
    const url = `${module}/${item}/${id}`;
    useEffect(() => {
        async function loadItem(){
            const jsonItem = await inventarioAPI.get(url);
            setItem(jsonItem.data)
        }
        loadItem()
    },[url,setItem]);
}

export async function FormLoader({request} : any) : Promise<any> {
    //let url = new URL(request.url);
    return(null)
}

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
}

async function getResources() : Promise<any> {
  var data = {};
  try{
    const request = await inventarioAPI.get('models_info');
    data = request.data;
  }catch(error){console.log(error)}  
  return data;
}

export const resources = await getResources();

function GetUrlPartsFromRequest(request : any) : any {
    var parts = request.url.split("/").filter((part : string) => part !== '');
    console.log(parts)
    const keys = ["protocol","address","dashboard","module","item","operation"]
    const objeto = Object.assign({}, ...parts.map((valor:any, index:number) => ({ [keys[index]]: valor })));
    return objeto;
}

export function GetUrlParts() : any {
    const location = useLocation()
    const parts = location.pathname.split("/").filter(part => part !== '');
    const keys = ["dashboard","module","item"]
    const objeto = Object.assign({}, ...parts.map((valor, index) => ({ [keys[index]]: valor })));
    return objeto;
}