import "./header.scss"
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";

import { Logout, WhoAmI } from "../../../Api/apiService";

import { useAuthData } from "../../providerComponents/authProvider/AuthProvider";
import { setMessage } from "../../providerComponents/messageDisplay/MessageDisplay";
import { useNavigate } from "react-router-dom";

function UserDropDown(){
  console.log(useAuthData());
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

  return (
    <Dropdown>
      <Dropdown.Toggle split variant="primary" id="dropdown-split-basic">
            <div className="user">
              <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
              <span>{authData['username']}</span>
            </div>
      </Dropdown.Toggle>  
      <Dropdown.Menu>
        <Container>
          <div className="fields">
            <Row>
              <Col><div className="header">Nombre de usuario:</div></Col>
            </Row>
            <Row>
              <Col><div className="content">{authData['username']}</div></Col>
            </Row>
            <Row>
              <Col><div className="header">Correo:</div></Col>
            </Row>
            <Row>
              <Col><div className="content">{authData['email']}</div></Col>
            </Row>
            <Row>
              <Col><div className="header">Rol:</div></Col>
            </Row>
            <Row>
              <Col><div className="content">{authData['rol']}</div></Col>
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