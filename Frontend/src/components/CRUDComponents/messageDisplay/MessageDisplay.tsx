import "./messageDisplay.scss"
import { useContext } from "react"
import { crudContext } from "../../../data/data"

var msg, setMsg;

export function MessageDisplay(){    
    [msg, setMsg] = useContext(crudContext)
    return <div id="msg" className={(msg[0] === "")? "hidden":"visible"}>
                <div className={msg[1] ? "alert alert-danger" : "alert alert-success"}>
                    {msg[0]}
                </div>
            </div>
}

export function setMessage(message: string, is_error: boolean): void{
    setMsg([message, is_error]);
    const elemento = document.getElementById("msg");
    elemento?.classList.remove('hidden');
    elemento?.classList.add('visible');
    setTimeout(()=>setInvisible(elemento),4900)
}

function setInvisible(elemento){
    elemento?.classList.remove('visible');
    elemento?.classList.add('hidden');
    setMsg(["",false])
}
