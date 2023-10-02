import {useEffect} from "react";
import {useParams,useLocation} from "react-router-dom";
import axios, { AxiosResponse } from "axios"
import {backendUrls} from "../data/data.tsx"

const inventarioAPI = axios.create()
inventarioAPI.defaults.baseURL = "http://127.0.0.1:8000"

export function GetUrlParts() : any {
    const location = useLocation()
    const parts = location.pathname.split("/").filter(part => part !== '');
    const keys = ["module","item","id"]
    const objeto = Object.assign({}, ...parts.map((valor, index) => ({ [keys[index]]: valor })));
    return objeto;
}

export function ListItems(setItems : any, itemName : string) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function loadItems() {
            await inventarioAPI.get(backendUrls[itemName])
            .then((response) => {
                setItems(response.data);
                resolve(response)
            })
            .catch((error)=>(reject(error)))
        }
        loadItems()
        
    });
}

export function ReadItem(setItem:any,itemName:string) : Promise<AxiosResponse<any,any>> {
    const {id} = useParams()
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        useEffect(() => {
            async function loadItem(){
                await inventarioAPI.get(
                    backendUrls[itemName]+`${id}/`
                )
                .then((response) => {
                    setItem(response.data)
                    resolve(response)
                })
                .catch((error) => reject(error));
            }
            loadItem()
        }, [itemName, setItem]);
    })
}

export function CreateItem(itemName: string, formData: FormData) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function createData(itemName: string, formData: FormData) {
            await inventarioAPI.post(backendUrls[itemName], formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        
        createData(itemName, formData);
    })
}


export function UpdateItem(itemName:string,formData:FormData,id:string|undefined) : Promise<AxiosResponse<any,any>> {   
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function updateData(itemName:string,id:string|undefined,formData:FormData){
            await inventarioAPI.put(backendUrls[itemName] +`${id}/`, formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        updateData(itemName, id, formData)
    })
}

export function DeleteItem(itemName: string, id: string) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function deleteData(itemName: string, id: string) {
            await inventarioAPI.delete(backendUrls[itemName] +`${id}/`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        deleteData(itemName, id);
    })
}

export function SendServiceRequest(formData: FormData) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function sendData(formData: FormData) {
            await inventarioAPI.post(backendUrls["ordenes-servicio"], formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        sendData(formData);
    })
}

export function GetEnums(setEnum:any) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        useEffect(() => {
            async function loadItem(){
                await inventarioAPI.get("/table-enums")
                .then((response) => {
                    setEnum(response.data)
                    resolve(response)
                })
                .catch((error) => reject(error));
            }
            loadItem()
        }, [setEnum]);
    })
}