import "./serviceform.scss"
import { SendServiceRequest } from "../../Api/apiService";
export default function ServiceForm(){
    
    var msg = "";
    var error = false;
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        SendServiceRequest(formData)
        .then(() => {
            msg =`Se ha enviado el formulario con éxito`
            error = false
        })
        .catch((error) => {
            msg = `Ha surgido un error al enviar el formulario`
            error = true
        })
        .finally(() => history.back());
    };

    return (

        
        <div className="serviceForm">
            <div>
                <div id="msg" className={(msg === "")? "invisible":"visible"}>
                    <div className={error ? "alert alert-danger" : "alert alert-success"}>
                        {msg}
                    </div>
                </div>
            </div>
            <div className="container">
                <img></img>
                <img></img>
                <h1>Generar Solicitud de Mantenimiento</h1>
                <h5>Formulario para describir las necesidades de mantenimiento detectadas/relevadas por personal de la FI </h5>
                <div className="comm-info">Cualquier duda comunicarse al  4135000 interno 2137 o al 2615068289</div>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" name="mail" value="" required maxLength={320} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" placeholder="nombre.apellido@ingenieria.uncuyo.edu.ar"></input>
                    </div>
                    <div className="row">
                        <div className="form-group col">
                            <label>Nombre</label>
                            <input className="form-control" type="text" name="nombre" maxLength={120}></input>
                        </div>
                        <div className="form-group col">
                            <label>Apellido</label>
                            <input className="form-control" type="text" name="apellido" maxLength={120}></input>
                        </div> 
                    </div>
                    <div className="form-group">
                        <label>Legajo</label>
                        <input className="form-control" type="text" name="sector" maxLength={120}></input>
                    </div>
                    <div className="form-group">
                        <label>Sector de la necesidad</label>
                        <input className="form-control" type="text" name="sector" maxLength={120}></input>
                    </div>
                    <div className="form-group">
                        <label>Descripción de la necesidad de mantenimiento/reparación</label>
                        <textarea className="form-control" name="descripcion" maxLength={120}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Detalle de la necesidad de mantenimiento/reparación</label>
                        <input className="form-control" type="text" name="detalle" maxLength={120}></input>
                    </div>
                    
                    <div className="form-group">
                        <label>Caracter</label>
                        <select className="form-select">
                            <option value="Normal">Normal (sin urgencia)</option>
                            <option value="Urgente">Urgente</option>
                            <option value="Critica">Crítica</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fecha de Necesidad (cuando debe estar resuelta la necesidad)</label>
                        <input className="form-control" type="date" name="fechaNecesidad" maxLength={120}></input>
                    </div>
                    <div className="form-group">
                        <label>Añadir algún comentario</label>
                        <textarea className="form-control" name="comentario" maxLength={120}></textarea>
                    </div>
  
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}