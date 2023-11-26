import "./header.scss"

import { AuthContext } from "../../CRUDComponents/authProvider/AuthProvider"
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { Logout, WhoAmI } from "../../../Api/apiService";
import { setMessage } from "../../CRUDComponents/messageDisplay/MessageDisplay";
import {getNav} from "../../CRUDComponents/navComp/navComp"

function UserDropDown(){

  //const {authData,setAuthData} = useContext(AuthContext);
  const [user,setUser]= useState(
    {
      username: "No consultado",
      email: "No consultado",
      rol: "No consultado",
    }
  )
  useEffect(()=>{
    WhoAmI()
    .then((r)=>{
      setUser({
        username: r.data["username"],
        email: r.data["email"],
        rol: r.data["rol"],
      });
    })
    .catch((e)=>{
      setMessage("Error al cargar usuario",e)
    })
  },[setUser])
  
  const handleLogout = () => {
    Logout()
    .then(()  => {
      (getNav())("/login")
    })
    .catch(e=>{
      setMessage("Error al cerrar sesión",e)
    }) 
  }

  return (
    <Dropdown>
      <Dropdown.Toggle split variant="primary" id="dropdown-split-basic">
            <div className="user">
              <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
              <span>{user['username']}</span>
            </div>
      </Dropdown.Toggle>  
      <Dropdown.Menu>
        <Container>
          <div className="fields">
            <Row>
              <Col><div className="header">Nombre de usuario:</div></Col>
            </Row>
            <Row>
              <Col><div className="content">{user['username']}</div></Col>
            </Row>
            <Row>
              <Col><div className="header">Correo:</div></Col>
            </Row>
            <Row>
              <Col><div className="content">{user['email']}</div></Col>
            </Row>
            <Row>
              <Col><div className="header">Rol:</div></Col>
            </Row>
            <Row>
              <Col><div className="content">{user['rol']}</div></Col>
            </Row>
            <Row>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Row>
          </div>
        </Container>
      </Dropdown.Menu>
    
    </Dropdown>
  );
}


function Header() {
  return (
    <div className="header">
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