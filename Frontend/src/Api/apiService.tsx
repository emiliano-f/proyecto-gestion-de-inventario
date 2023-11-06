import {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios, { AxiosResponse } from "axios"
import {BASEURL, getBackendUrl} from "../data/BACKENDURLS"

const inventarioAPI = axios.create()
inventarioAPI.defaults.baseURL = BASEURL

export function ListItems(setItems : any, itemName : string) : Promise<AxiosResponse<any,any>> {
    //console.log(getBackendUrl(itemName))
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function loadItems() {
            await inventarioAPI.get(getBackendUrl(itemName))
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
    const {id} = useParams();
    console.log(getBackendUrl(itemName) + `${id}/`)
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
    
        async function loadItem(){
            await inventarioAPI.get(
                getBackendUrl(itemName)+`${id}/`
            )
            .then((response) => {
                setItem(response.data)
                resolve(response)
            })
            .catch((error) => reject(error));
        }
        loadItem()
        
    })
}

export function CreateItem(itemName: string, formData: FormData | string) : Promise<AxiosResponse<any,any>> {
    console.log(formData);
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function createData(itemName: string, formData: FormData) {
            await inventarioAPI.post(getBackendUrl(itemName), formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        createData(itemName, formData);
    })
}


export function UpdateItem(itemName:string,formData:FormData,id:string|undefined) : Promise<AxiosResponse<any,any>> {   
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function updateData(itemName:string,id:string|undefined,formData:FormData){
            await inventarioAPI.put(getBackendUrl(itemName) +`${id}/`, formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        updateData(itemName, id, formData)
    })
}

export function DeleteItem(itemName: string, id: string) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function deleteData(itemName: string, id: string) {
            await inventarioAPI.delete(getBackendUrl(itemName) +`${id}/`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        deleteData(itemName, id);
    })
}

export function getSectors(setSectors : any,edificioName : number) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function listSectors() {
            await inventarioAPI.get(`tarea/sector/subsectores/${edificioName}/`)
            .then((response) => {
                setSectors(response.data);
                resolve(response);
            })
            .catch((error) => reject(error));
        }
        listSectors();
    })
}

export function SendServiceRequest(formData: FormData) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function sendData(formData: FormData) {
            await inventarioAPI.post(getBackendUrl("ordenes-servicio"), formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        sendData(formData);
    })
}

export function GetEnums(setEnum:any) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
            
            async function loadItem(){
                await inventarioAPI.get(getBackendUrl("enums"))
                .then((response) => {
                    setEnum(response.data)
                    resolve(response)
                    
                })
                .catch((error) => reject(error));
            }
            loadItem();
            
        });
}

export function ListItemsFiltered(setItems, filteredEntityName, filterID){
    console.log(`${filteredEntityName}-filtered`)
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function loadItems() {
            await inventarioAPI.get(getBackendUrl(`${filteredEntityName}-filtered`).concat(`${filterID}/`))
            .then((response) => {
                setItems(response.data);
                resolve(response)
            })
            .catch((error)=>(reject(error)))
        }
        loadItems()
    });
}

export function Login(formData: FormData): Promise<AxiosResponse<any, any>> {
    return new Promise<AxiosResponse<any, any>>((resolve, reject) => {
        async function loginUser() {
            try {
                const response = await inventarioAPI.post('/admin/login', formData);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        }
        loginUser();
    });
}

/*
export function register(){
    
}
*/