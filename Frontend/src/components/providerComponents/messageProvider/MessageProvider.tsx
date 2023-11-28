import React from "react";
import { createContext, useRef, useState } from "react";

export var MessageContext : Context<any>;

type Message = {
    title:string,
    desc:string,
    is_error:boolean
} | null

var message : Message = null;
var setNewMessage : React.Dispatch<React.SetStateAction<Message>>;
var setMessageMemo : React.NamedExoticComponent<object>;

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

function messageChanged(newMessage : Message){
    return message.title === "" && message?.desc === ""
    || !Object.keys(message)
    .map((key) => newMessage[key] === message[key])
    .reduce((ac,val) => ac && val)
} 

export function getMessage() : Message{
    return message;
}

export function setMessage(title: string, error : Promise<AxiosResponse<any,any>>| null): void{
    var newMessage = null;
    var errorDesc = null;
    if(error === null){
        newMessage = {title:title,desc:"",is_error:false};
    }else if(!('code' in error)){
        newMessage = {title:title,desc:"Error inesperado",is_error:true};
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
        newMessage = {title:title, desc:errorDesc, is_error:true};
    }

    if(messageChanged(newMessage)){
        setNewMessage(newMessage);
        const elemento : HTMLElement | null = document.getElementById("msg");
        elemento?.classList.remove('hidden');
        elemento?.classList.add('visible');
        setTimeout(()=>setInvisible(elemento),10000)
    }
}

function setInvisible(elemento : HTMLElement | null ){
    elemento?.classList.remove('visible');
    elemento?.classList.add('hidden');
    setNewMessage({title:"",desc:"",is_error:false})
}

export default MessageProvider;