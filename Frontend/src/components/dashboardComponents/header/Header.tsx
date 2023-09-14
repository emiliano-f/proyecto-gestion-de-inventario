import "./header.scss"

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src="logo.png" alt="" />
        <span>Mantenimiento</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
          <span>Aldo</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />

      </div>
      
    </div>
  )
}

export default Header