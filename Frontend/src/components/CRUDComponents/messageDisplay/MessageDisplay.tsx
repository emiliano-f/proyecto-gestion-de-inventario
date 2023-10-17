import "./messageDisplay.scss"
import {FiAlertTriangle, FiAlertCircle} from "react-icons/fi"

type msgError = [
    (string | boolean)[], 
    React.Dispatch<React.SetStateAction<(string | boolean)[]>>
]

var setMsg : React.Dispatch<React.SetStateAction<(string | boolean)[]>>;

export function MessageDisplay(state : msgError){   
    const [msg,errorDesc,is_error] = state[0] 
    setMsg = state[1]; 
    return <div id="msg" className={(msg === "")? "hidden":"visible"}>
                <div className={is_error ? "alert alert-danger" : "alert alert-success"}>
                    <div className="row">
                        <div className="col-1 icon">
                            {is_error? <FiAlertTriangle size={32}/> : <FiAlertCircle size={32}/>}
                        </div>
                        <div className="col-10">
                            <span className="title">{msg}</span>
                            {errorDesc?<span className="desc">{errorDesc}</span>:null}
                        </div>  
                    </div>
                </div>
            </div>
}

export function setMessage(message: string, error : Promise<AxiosResponse<any,any>>| null): void{
    var errorDesc = null;
    if(error === null){
        setMsg([message, false]);
    }else{
        var dicc : any;
        switch(error.code){
            case "ERR_BAD_RESPONSE":
                errorDesc = "Error de Interno del servidor (Se rechazo la operación)"
                break;
            case "ERR_BAD_REQUEST":
                try{
                    dicc = JSON.parse(error.request.response);
                    errorDesc = Object.keys(dicc).map(field => (`${field}: ${dicc[field]}`)).join('; ')
                }catch{
                    errorDesc = "Error en el formulario enviado"
                }
                break;
            case "ERR_NETWORK":
                errorDesc = "Error de conección con base de datos"
                break;
            default:{
                errorDesc = error.code;
                break;
            }
        }
        setMsg([message, errorDesc, true])
    }
    const elemento : HTMLElement | null = document.getElementById("msg");
    elemento?.classList.remove('hidden');
    elemento?.classList.add('visible');
    setTimeout(()=>setInvisible(elemento),10000)
}

function setInvisible(elemento : HTMLElement | null ){
    elemento?.classList.remove('visible');
    elemento?.classList.add('hidden');
    setMsg(["",false])
}