import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./login.scss";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Login as login } from "../../Api/apiService"

function Login() {
  // /admin/login

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log(formData);

      login(formData);

    }
    setValidated(true);
  };
  

  return (
    <div className="background">
  
        <div className="container foreground">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="header">
              <div className="text">Log In</div>
              <div className="underline"></div>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control name="user" type="string" placeholder="Ingrese nombre de usuario" />
              {/*<Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name="password" type="password" placeholder="Contraseña" />
            </Form.Group>
            
            <div className="d-grid">
              <Button className="btn btn-dark btn-lg btn-block" type="submit">
                Ingresar
              </Button>
            </div>
            
          <p className="text-end mt-2">
            <Link to="" className="ms-2">¿Olvidaste tu contraseña?</Link>
          </p>
          </Form>
        </div>

      
      
    </div>
    
    
    
    
  )
}

export default Login