import { createContext, useState } from "react";

export var MessageContext : Context<any>;

type Message = {
    title:string,
    desc:string,
    is_error:boolean
} | null

var message : Message = null;
var setNewMessage : React.Dispatch<React.SetStateAction<Message>>;

function MessageProvider({ children }) {
    [message,setNewMessage] = useState(
        () : Message => (
            {
                title:"",
                desc: "",
                is_error:false
            }
        )
    );
    MessageContext = createContext(setNewMessage);
    return (
      <MessageContext.Provider value={setNewMessage}>
        {children}
      </MessageContext.Provider>
    );
  }

export function getMessage() : Message{
    return message;
}

export function setMessage(title: string, error : Promise<AxiosResponse<any,any>>| null): void{
    console.log("error: "+error)
    var errorDesc = null;
    if(error === null){
        setNewMessage({title:title,desc:"",is_error:false});
    }else if(!('code' in error)){
        setNewMessage({title:title,desc:"Error inesperado",is_error:true});
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
        setNewMessage({title:title, desc:errorDesc, is_error:true});
    }

    const elemento : HTMLElement | null = document.getElementById("msg");
    elemento?.classList.remove('hidden');
    elemento?.classList.add('visible');
    setTimeout(()=>setInvisible(elemento),10000)
}

function setInvisible(elemento : HTMLElement | null ){
    elemento?.classList.remove('visible');
    elemento?.classList.add('hidden');
    setNewMessage({title:"",desc:"",is_error:false})
}

export default MessageProvider;