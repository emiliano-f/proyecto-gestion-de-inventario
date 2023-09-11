import axios from "axios"
import {useEffect} from "react";
import { Link, useParams,useLocation, ActionFunctionArgs } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
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

export function ListItems(setItems: any, itemName: string): any {
    useEffect(() => {
        async function loadItems() {
            await inventarioAPI.get(backendUrls[itemName])
                .then((response) => {
                    setItems(response.data);
                })
                .catch((error) => { throw error });
        }
        loadItems()
    }, [setItems, itemName]);
}

export function ReadItem(setItem: any, itemName: string): any {
    const { id } = useParams()
    useEffect(() => {
        async function loadItem() {
            const jsonItem = await inventarioAPI.get(
                backendUrls[itemName] + `/${id}`
            ).catch((error) => { throw error });
            setItem(jsonItem.data)
        }
        loadItem()
    }, [itemName, setItem]);
}

export function CreateItem(itemName: string, formData: FormData) {
    async function createData(itemName: string, formData: FormData) {
        await inventarioAPI.post(backendUrls[itemName], formData)
            .catch((error) => { throw error });
    }
    createData(itemName, formData);
}

export function UpdateItem(itemName: string, formData: FormData, id: string | undefined) {
    async function updateData(itemName: string, id: string | undefined, formData: FormData) {
        await inventarioAPI.put(backendUrls[itemName] + `/${id}/`, formData)
            .catch((error) => { throw error });
    }
    updateData(itemName, id, formData)
}

export function DeleteItem(itemName: string, id: string) {
    async function deleteData(itemName: string, id: string) {
        //Esta funcion puede cambiar
        await inventarioAPI.delete(backendUrls[itemName] + `/${id}/`)
            .catch((error) => { throw error });
    }
    deleteData(itemName, id);
}
