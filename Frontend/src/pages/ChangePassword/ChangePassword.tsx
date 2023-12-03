import "./ChangePass.scss"
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { newPassword } from "../../Api/apiService";

const ChangePassword = () =>{
    const [Password, setPassword] = useState('');
    const [oldPass,setOldPass] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg,setMsg] = useState("");
    const nav = useNavigate();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      console.log("doing")
      if (Password === confirmPassword) {
        newPassword(formData)
        .then(()=>{
            nav("/login")
        })
        .catch((error)=>{
            console.log(error)
            setMsg("Error de la aplicación al cambiar la contraseña.")
        })
      } else {
        console.log("error")
        setMsg('Las contraseñas no coinciden.')
      }
    };
  
    return (
        <>
        <div className="background">    
          <div className="container foreground">
          <h1>Cambiar contraseña</h1>
          <span className="err">{msg}</span>
          <Form onSubmit={handleSubmit}>
              
              <Form.Label>
              Contraseña actual:
              </Form.Label>
              <Form.Control
                  type="password"
                  name="password"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  required
              />
              <br />

              <Form.Label>
              Nueva contraseña:
              </Form.Label>
              <Form.Control
                  type="password"
                  name="new_password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <br />
      
              <Form.Label>
              Confirmar nueva contraseña:
              </Form.Label>
              <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
              <br />
      
              <Button type="submit">Cambiar Contraseña</Button>
          </Form>
          <span className="adv">
            (Si la contraseña que posee es la brinda por un administrador debe cambiarla.)
          </span>
          </div>
        </div>
        </>
    );
  };

export default ChangePassword;