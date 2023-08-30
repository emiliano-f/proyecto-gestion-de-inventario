import "./navbar.scss"

function Header() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.png" alt="" />
        <span>Mantenimiento</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notifications">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
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