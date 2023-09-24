import "./header.scss"

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <span>Mantenimiento</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
          <span>Aldo</span>
        </div>
      </div>
    </div>
  )
}

/*Un slider para poder cambiar el color de la pagina pero no funciona
<div className="menu-desplegable">
          <label className="switch">
            <input type="checkbox" id="interruptor"/>
            <span className="slider"></span>  
          </label>
        </div>
*/

export default Header