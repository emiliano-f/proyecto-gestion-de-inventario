import "./serviceform.scss"
import { SendServiceRequest } from "../../Api/apiService";
import Header from "../../components/dashboardComponents/header/Header"
import {  setMessage , MessageDisplay } from "../../components/CRUDComponents/messageDisplay/MessageDisplay";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getEdificios,getSectors } from "../../Api/apiService";

export default function ServiceForm(){
    const formRef  = useRef();
    const edificioSelect = useRef();
    const sectorSelect = useRef();

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
            formRef.current.reset()
            setMessage(`Se ha enviado el formulario con éxito`,null)
        })
        .catch((error) => {
            console.log(error)
            setMessage(`Ha surgido un error al enviar el formulario`,error)
        })
    };

    //BLOCK
    const [edificios,setEdificios] = useState([]);
    
    useEffect(()=>{
        getEdificios(setEdificios)
        .catch((error) => {
            setMessage(`No se pudo conectar con el servidor`,error)
        })
    },[setEdificios])


    //endBLOCK


    //BLOCK
    const [sectors,setSectors] = useState([]);
    const [edificio_id,setEdificioID] = useState(null);

    useEffect(()=>{
        if(edificio_id !== null){
            getSectors(setSectors,edificio_id)
            .catch((error) => {
                setMessage(`No se pudo conectar con el servidor`,error)
            })
        }
    },[edificio_id])

    //console.log(sectors)
    //console.log(edificio_id)
    //endBLOCK

    const changeID = () => {
        if(sectorSelect.current!.value !== ""){
            sectorSelect.current.value = "";
        }
        setEdificioID(edificioSelect.current.value);
    }

    console.log(sectors)
    return (
        <>
        <Header/>
        <MessageDisplay {...serviceContext}/>
        <div className="serviceForm">           

            <div className="container">
                
                <h1>Generar Solicitud de Mantenimiento</h1>
                <h5>Formulario para describir las necesidades de mantenimiento detectadas/relevadas por personal de la FI </h5>
                
                <div className="comm-info">Cualquier duda comunicarse al  4135000 interno 2137 o al 2615068289</div>
                
                <form ref={formRef} method="post" onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                    <label>Sector de la necesidad</label>
                        <div className="two-fields">
                            <select required ref={edificioSelect} className="form-select" defaultValue={""} onChange={changeID}>
                                <option value="" disabled selected>Selecciona un Edificio</option>
                                {edificios.map((obj)=><option key={obj.id} value={obj.id}>{obj.nombre}</option>)}
                            </select>
                            <select required ref={sectorSelect} className="form-select" name="sector" defaultValue={""}>
                                <option value="" disabled selected>Selecciona un Sector</option>
                                {sectors.map((obj)=><option key={obj.id} value={obj.id}>{obj.subsector}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción de la necesidad de mantenimiento/reparación</label>
                        <textarea required className="form-control" name="descripcion" maxLength={120} />
                    </div>

                    <div className="form-group">
                        <label>Detalle de la necesidad de mantenimiento/reparación</label>
                        <select required className="form-select" defaultValue={""}>
                            <option value="" disabled selected>Selecciona un tipo</option>
                            <option value="Fabricación">Fabricación</option>
                            <option value="Movimiento">Movimiento de materiales / traslados</option>
                            <option value="Modificación">Modificación/adecuación</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Carácter de la necesidad</label>
                        <select required className="form-select" defaultValue={""}>
                            <option value="" disabled selected>Selecciona el carácter</option>
                            <option value="Normal">Normal (sin urgencia)</option>
                            <option value="Urgente">Urgente</option>
                            <option value="Critica">Crítica</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fecha de Necesidad (cuando debe estar resuelta la necesidad)</label>
                        <input required className="form-control" type="date" name="fechaNecesidad" maxLength={120}/>
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