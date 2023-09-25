import "./serviceform.scss"
import { SendServiceRequest } from "../../Api/apiService";
import Header from "../../components/dashboardComponents/header/Header"
import {  setMessage , MessageDisplay } from "../../components/CRUDComponents/messageDisplay/MessageDisplay";
import { createContext, useContext, useState } from "react";

export default function ServiceForm(){
    const UserContext =  createContext({
        user_id:1,
        user_name:"Aldo",
        user_email:"Aldo.Trillini.Ingenieria@gmail.com",
        user_legajo:12345,
    });
    
    const user = useContext(UserContext);
    const serviceContext = useState(["",false]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("usuario",user.user_id.toString())
        SendServiceRequest(formData)
        .then(() => {
            setMessage(`Se ha enviado el formulario con éxito`,false)
        })
        .catch((error) => {
            setMessage(`Ha surgido un error al enviar el formulario`,true)
        })
    };

    return (
        <>
        <Header/>
        <MessageDisplay {...serviceContext}/>
        <div className="serviceForm">           

            <div className="container">
                
                <h1>Generar Solicitud de Mantenimiento</h1>
                <h5>Formulario para describir las necesidades de mantenimiento detectadas/relevadas por personal de la FI </h5>
                
                <div className="comm-info">Cualquier duda comunicarse al  4135000 interno 2137 o al 2615068289</div>
                
                <form method="post" onSubmit={handleSubmit}>
                    

                    <div className="form-group">
                        <label>Sector de la necesidad</label>
                        <input className="form-control" name="sector" maxLength={32}/>
                    </div>

                    <div className="form-group">
                        <label>Descripción de la necesidad de mantenimiento/reparación</label>
                        <textarea className="form-control" name="descripcion" maxLength={120}/>
                    </div>

                    <div className="form-group">
                        <label>Detalle de la necesidad de mantenimiento/reparación</label>
                        <select className="form-select">
                            <option value="Fabricación">Fabricación</option>
                            <option value="Movimiento">Movimiento de materiales / traslados</option>
                            <option value="Modificación">Modificación/adecuación</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Carácter de la necesidad</label>
                        <select className="form-select">
                            <option value="Normal">Normal (sin urgencia)</option>
                            <option value="Urgente">Urgente</option>
                            <option value="Critica">Crítica</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fecha de Necesidad (cuando debe estar resuelta la necesidad)</label>
                        <input className="form-control" type="date" name="fechaNecesidad" maxLength={120}/>
                    </div>
                    <div className="form-group">
                        <label>Añadir algún comentario</label>
                        <textarea className="form-control" name="comentario" maxLength={120}/>
                    </div>

                    <button className="btn btn-primary" type="submit">Enviar</button>
                </form>
            </div>
        </div>
        <div className="footer">
            <span>UNCUYO- Facultad de Ingeniería</span>
            <img src="/SAEFyDISG.png" width="430" height="50"/>
        </div>
        </>
    )
}