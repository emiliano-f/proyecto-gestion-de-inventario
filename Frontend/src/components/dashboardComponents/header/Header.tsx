import "./header.scss"

import { AuthContext } from "../../CRUDComponents/authProvider/AuthProvider"
import { useContext, useEffect } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { Logout, WhoAmI } from "../../../Api/apiService";
import { setMessage } from "../../CRUDComponents/messageDisplay/MessageDisplay";
import {getNav} from "../../CRUDComponents/navComp/navComp"
function UserDropDown(){

  const {authData,setAuthData} = useContext(AuthContext);

  useEffect(()=>{
    WhoAmI()
    .then((r)=>{
      setAuthData(
        {
          authenticated:true,
          username: r.data.get("username"),
          mail: "From Log",
          rol: "From log",
        }
      )
    })
    .catch((e)=>{
      console.log("e")
    })
  },[])
  
  const handleLogout = () => {
    Logout()
    .then(()  => {
      (getNav())("/login")
    })
    .catch(e=>{
      setMessage("Error al cerrar sesión",e)
    }) 
  }

  console.log(authData)
  return (
    <Dropdown>
      <Button variant="primary">
        <div className="icons">
          <div className="user">
            <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
            <span>{authData['username']}</span>
          </div>
        </div>
      </Button>
      <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Container>
          <Row>
            <Col>
              <p>Nombre: {authData['username']}</p>
              <p>Email: {authData['mail']}</p>
              <p>Rol: {authData['rol']}</p>
            </Col>
            <Col>
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Col>
          </Row>
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
      <UserDropDown/> 
    </div>
  );
}

/*

<div className="icons">
            <div className="user">
              <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
              <span>{authData.userName}</span>
            </div>
          </div>

Un slider para poder cambiar el color de la pagina pero no funciona
<div className="menu-desplegable">
          <label className="switch">
            <input type="checkbox" id="interruptor"/>
            <span className="slider"></span>  
          </label>
        </div>
*/

export default Header