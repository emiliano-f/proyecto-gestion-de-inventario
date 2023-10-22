import {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios, { AxiosResponse } from "axios"
import {BACKENDURLS,BASEURL} from "../data/BACKENDURLS"

const inventarioAPI = axios.create()
inventarioAPI.defaults.baseURL = BASEURL

export function ListItems(setItems : any, itemName : string) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function loadItems() {
            await inventarioAPI.get(BACKENDURLS[itemName])
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
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        useEffect(() => {
            async function loadItem(){
                await inventarioAPI.get(
                    BACKENDURLS[itemName]+`${id}/`
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
            await inventarioAPI.post(BACKENDURLS[itemName], formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        createData(itemName, formData);
    })
}


export function UpdateItem(itemName:string,formData:FormData,id:string|undefined) : Promise<AxiosResponse<any,any>> {   
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function updateData(itemName:string,id:string|undefined,formData:FormData){
            await inventarioAPI.put(BACKENDURLS[itemName] +`${id}/`, formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        updateData(itemName, id, formData)
    })
}

export function DeleteItem(itemName: string, id: string) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function deleteData(itemName: string, id: string) {
            await inventarioAPI.delete(BACKENDURLS[itemName] +`${id}/`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        deleteData(itemName, id);
    })
}

export function getEdificios(setEdificios : any) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function listEdificios() {
            await inventarioAPI.get("tarea/edificio/")
            .then((response) => {
                setEdificios(response.data);
                resolve(response);
            })
            .catch((error) => reject(error));
        }
        listEdificios();
    })
}

export function getSectors(setSectors : any,edificio_id : number) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
        async function listSectors() {
            await inventarioAPI.get(`tarea/sector/${edificio_id}`)
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
            await inventarioAPI.post(BACKENDURLS["ordenes-servicio"], formData)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        }
        sendData(formData);
    })
}

export function GetEnums(setEnum:any) : Promise<AxiosResponse<any,any>> {
    return new Promise<AxiosResponse<any,any>>((resolve,reject) => {
            async function loadItem(){
                await inventarioAPI.get(BACKENDURLS["enums"])
                .then((response) => {
                    setEnum(response.data)
                    resolve(response)
                })
                .catch((error) => reject(error));
            }
            loadItem()
        });
}