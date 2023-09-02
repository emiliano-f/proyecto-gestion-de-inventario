import "./home.scss"
import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import Footer from "../../components/footer/Footer"

function Home() {
  return (
    <div className="home">
      <Header/>
      <Sidebar/>
      <Footer/>
    </div>
  )
}

export default Home