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
        <div>
            <div>
                <div id="msg" className={(msg === "")? "invisible":"visible"}>
                    <div className={error ? "alert alert-danger" : "alert alert-success"}>
                        {msg}
                    </div>
                </div>
            </div>
            <div>
                <img></img>
                <img></img>
                <h1>Generar Solicitud de Mantenimiento</h1>
                <h3>Formulario para describir las necesidades de mantenimiento detectadas/relevadas por personal de la FI </h3>
                <div>Cualquier duda comunicarse al  4135000 interno 2137 o al 2615068289</div>
                <form method="post" onSubmit={handleSubmit}>
                    <input type="email" name="mail" value="" required maxLength={320} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"></input>
                    <input type="text" name="nombre" maxLength={120}></input>
                    <input type="text" name="apellido" maxLength={120}></input>
                    <input type="text" name="sector" maxLength={120}></input>
                    <input type="text" name="descripcion" maxLength={120}></input>
                    <input type="text" name="detalle" maxLength={120}></input>
                    <input type="text" name="caracter" maxLength={120}></input>
                    <input type="text" name="fechaNesesidad" maxLength={120}></input>
                    <input type="text" name="comentario" maxLength={120}></input>
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}