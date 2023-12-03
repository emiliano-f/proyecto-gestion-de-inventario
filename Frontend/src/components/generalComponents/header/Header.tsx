import "./header.scss"
import { Button, Col, Container, Dropdown, ListGroup, ListGroupItem, Popover, PopoverBody, PopoverHeader, Row } from "react-bootstrap";

import { Logout, WhoAmI } from "../../../Api/apiService";

import { useAuthData } from "../../providerComponents/authProvider/AuthProvider";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserDropDown(){
  const [authData,setAuthData] = useAuthData();
  const nav = useNavigate();
  const handleLogout = () => {
    Logout()
    .then(()  => {
      setAuthData(
        {
          authenticated: false,
          username: "No consultado",
          email: "No consultado",
          rol: "No consultado",
        }
      );
      nav("/login")
    })
    .catch(e=>{
      setMessage("Error al cerrar sesión",e)
    }) 
  }

  const [visible,setVisible]=useState(false);
  const ja = ()=>{
    setVisible(!visible)
  }
  return (
    <>
    <Dropdown>
      <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" split>
            <div className="user">
              <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
              <span>{authData['username']}</span>
            </div>
      </Dropdown.Toggle>  
      <Dropdown.Menu>
        <Container>
          <div className="fields">
            <Row>
              <Col>
              <ListGroup>
                <ListGroupItem>
                  <span className="header">Nombre de usuario:</span>
                  <span className="content">{authData['username']}</span>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="header">Correo:</span>
                  <span className="content">{authData['email']}</span>
                </ListGroupItem>
                <ListGroupItem>
                  <span className="header">Rol:</span>
                  <span className="content">{authData['rol']}</span>
                </ListGroupItem>
              </ListGroup>
              </Col>
            </Row>
            <Row>
              <Button variant="warning" onClick={()=>{nav("/nueva-contraseña")}}>Cambiar Contraseña</Button>
            </Row>
            <Row>
              <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
            </Row>
          </div>
        </Container>
      </Dropdown.Menu>
    
    </Dropdown>
    </>
  );
}


function Header() {
  return (
    <div className="myheader">
      <div className="logo">
        <img className="transparent" src="https://ingenieria.uncuyo.edu.ar/images/ingenieriablanco2016.png" alt="" />
        <span>Mantenimiento</span>
      </div>
      <div className="icons">
        <UserDropDown/> 
      </div>
    </div>
  );
}

export default Header