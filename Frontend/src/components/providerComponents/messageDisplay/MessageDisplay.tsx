import "./messageDisplay.scss"
import React, { SetStateAction, useContext, useRef } from "react";
import { FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

type Message = {
    title: string,
    desc: string,
    is_error: boolean
};

var message: Message = { title: "", desc: "", is_error: false };
var setNewMessage: React.Dispatch<React.SetStateAction<Message>>;

function messageChanged(newMessage: Message) {
    console.log(newMessage, message)
    return message.title === "" && message?.desc === ""
        || !Object.keys(message)
            .map((key) => newMessage[key] === message[key])
            .reduce((ac, val) => ac && val)
}
function createMessage(title: string, error: Promise<AxiosResponse<any, any>> | null) : Message {
    var errorDesc: string = "";
    var isError : boolean = false;
    if (error !== null) {
        isError = true;
        if ('code' in error) {
          switch (error.code) {
            case "ERR_BAD_RESPONSE":
              errorDesc = "Error interno del servidor (se rechazó la operación)";
              break;
            case "ERR_BAD_REQUEST":
              try {
                const dicc = JSON.parse(error.request.response);
                errorDesc = Object.entries(dicc)
                .map(([field, value]) => `${field}: ${value}`)
                .join('; ') || "Error en el formulario enviado";
              } catch {
                errorDesc = "Error en el formulario enviado";
              }
              break;
            case "ERR_NETWORK":
              errorDesc = "Error de conexión con la base de datos";
              break;
            default:
              errorDesc = error.code;
              break;
          }
        } else {
          errorDesc = "Error inesperado";
        }
      }
    return { title: title, desc: errorDesc, is_error: isError };
}


export function setMessage(title: string, error: Promise<AxiosResponse<any, any>> | null): void {
    const newMessage: Message = createMessage(title, error);
    if (messageChanged(newMessage)) {
        setNewMessage(newMessage);
        const elemento: HTMLElement | null = document.getElementById("msg");
        elemento?.classList.remove('hidden');
        elemento?.classList.add('visible');
        setTimeout(() => {
            elemento?.classList.remove('visible');
            elemento?.classList.add('hidden');
            setNewMessage({ title: "", desc: "", is_error: false });
        }, 10000)
    }
}

function MessageDisplay({stateMessage,setStateMessage}:{stateMessage:Message,setStateMessage:React.Dispatch<SetStateAction<Message>>}) {
    message = stateMessage;
    setNewMessage = setStateMessage; 
    return (
        <div id="msg" className={(message.title === "") ? "hidden" : "visible"}>
            <div className={message.is_error ? "alert alert-danger" : "alert alert-success"}>
                <div className="row">
                    <div className="col-1 icon">
                        {message.is_error ? <FiAlertTriangle size={32} /> : <FiAlertCircle size={32} />}
                    </div>
                    <div className="col-10">
                        <span className="title">{message.title}</span>
                        {message.desc ? <span className="desc">{message.desc}</span> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageDisplay;
