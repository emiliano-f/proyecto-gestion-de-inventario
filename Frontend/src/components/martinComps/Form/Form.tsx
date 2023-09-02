import {Form, Link, redirect, useLoaderData} from "react-router-dom";
import {ReadItem,resources,GetUrlParts} from "../../dataHandler/Api/apiService";
import { useState } from "react";

/**
 * Se encarga de actualizar la variable de estado cuyo objeto se muestra en los campos.
 * @param {*} item 
 * @param {*} att 
 * @param {*} setData 
 * @returns 
 */
const handleInputChange = (item:any,att:any,setData:any) => (event:any)=> {
    setData((item:any) => ({ ...item, [att]: event.target.value }))
}

function ItemForm(op:any){
    const {module : moduleName,item : itemName} = GetUrlParts()
    const [itemObj,setItemObj] :any= useState(useLoaderData() || [])
    const attributes = resources[moduleName][itemName]
    if(op!=="Create"){
        ReadItem(setItemObj)
    }
    var form = <></>;
    switch(op){
        case "Create":{form = <>
            <h1>Crear nuevo {itemName}</h1>
            <Form method="POST">
                {attributes.map((att:any,index:any)=>{
                    if(index!==0){
                        return(<div key={index} >{att}<input type="text"  value={itemObj[att]||''} name={att} onChange={handleInputChange(itemObj,att,setItemObj)}/></div>);
                    }else{
                        return(<div key={index}></div>)
                    }
                })}
                <button type="submit">Crear</button>
            </Form>
        </>}
        break;
        case "Read":{form = <>
            <h1>Ver {itemName}</h1>
            <Form method="GET">
                {attributes.map((att:any,index:any)=>{return(
                <div key={index}>{att}<input type="text" name={att} value={itemObj[att]||''} onChange={handleInputChange(itemObj,att,setItemObj)}disabled/></div>)})}
                <button type="submit" disabled>Modificar</button>
            </Form>
        </>}
        break;
        case "Update":{form = <>
            <h1>Modificar {itemName}</h1>
            <Form method="PUT">
                {attributes.map((att:any,index:any)=>{return(<div key={index}>{att}<input type="text" name={att} value={itemObj[att]||''} onChange={handleInputChange(itemObj,att,setItemObj)}/></div>)})}
                <button type="submit">Modificar</button>
            </Form>
        </>}
        break;
        case "Delete":{form = <> 
            <h1>Eliminar {itemName}</h1>
            <Form method="DELETE" relative="path">
                {attributes.map((att:any,index:any)=>{return(<div key={index}>{att}<input type="text" name={att} value={itemObj[att]||''} disabled/></div>)})}
               <button type="submit">Eliminar</button>
            </Form>
        </>}
        break;
        default:{

        } 
    }
    return(
    <div>
        {form}
        <Link to={`/Dashboard/inventario/${itemName}`}><button type="button">Atrás</button></Link>
    </div>);
}

export function CreateForm():React.ReactNode{
    return ItemForm("Create")
}
export function UpdateForm():React.ReactNode{
    return ItemForm("Update")
}
export function ReadForm():React.ReactNode{
    return ItemForm("Read")
}
export function DeleteForm():React.ReactNode{
    return ItemForm("Delete")
}