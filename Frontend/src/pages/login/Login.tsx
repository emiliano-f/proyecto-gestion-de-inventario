import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./login.scss";
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {

  return (
    <div className="background">
  
        <div className="container foreground">
          <Form>
            <div className="header">
              
              <div className="text">Log In</div>
              <div className="underline"></div>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Dirección email</Form.Label>
              <Form.Control type="email" placeholder="Ingrese email" />
              {/*<Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
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