import {useParams,Form, useLocation,useNavigate} from "react-router-dom";
import { CreateItem,DeleteItem, ReadItem as ReadItemHandle, UpdateItem, resources} from "../components/Api/apiService";
import { useState } from "react";

export function Detail(){
    const {item} = useParams();
    const {op} = useLocation().state || "";
    const [ReadItem,SetReadItem] = useState([])
    const [newItem,SetNewItem]= useState([])
    
    const nav = useNavigate();
    
    var form = <></>;
    const attributes = resources[item]
    if(op==="Create"){
        form = <>
                <h1>Crear nuevo {item}</h1>
                <Form onSubmit={<CreateItem data={newItem}/>} state={{op:"Update"}}>
                {attributes.map((att,index)=>{
                    var r = <></>
                    if(index!==0){
                        r = <div key={index} >
                            {att}
                            <input key={index}
                            type="text" 
                            value={newItem[att]} 
                            name={att} 
                            onChange={(event)=>handleInputChange(event,newItem,att,SetNewItem)}
                            />
                        </div>
                    }
                    return r;
                })
                }
                <button type="submit">Crear</button>
                </Form>
            </>
    }else{
        ReadItemHandle(SetReadItem)
        switch(op){
            case "Read":
            form=<>
                <h1>Ver {item}</h1>
                {attributes.map((att,index)=>{return(<div key={index} >{att}<input type="text" name={att} value={ReadItem[att]} disabled/></div>)})}
                <button type="submit" disabled>Guardar</button>
            </>
            break;
        case "Update":
            form=<>
                <h1>Modificar {item}</h1>
                <Form method="PUT" onSubmit={<UpdateItem data={ReadItem}/>}>
                {attributes.map((att,index)=>{return(<div key={index} >{att}<input type="text" name={att} value={ReadItem[att]} onChange={handleInputChange(ReadItem,att,SetReadItem)}/></div>)})}
                <button type="submit">Modificar</button>
                </Form>
            </>
            break;
        case "Delete":
            form=<>
                <h1>Eliminar {item}</h1>
                <Form method="DELETE" onSubmit={<DeleteItem/>}>
                {attributes.map((att,index)=>{return(<div key={index} >{att}<input type="text" name={att} value={ReadItem[att]} disabled/></div>)})}
                <button type="submit">Eliminar</button>
                </Form>
            </>
            break;
        default:
            throw new Error("Unexpected action. You must enter into this view from List view")
        }
    }
    return(
    <div>
        {form}
        <button type="button" onClick={()=>{nav(-1)}}>Atrás</button>
    </div>);
  }

  const handleInputChange = (item,att,SetReadItem) => (event)=> {
            //Chequeo
            SetReadItem((item) => ({ ...item, [att]: event.target.value }))
        }