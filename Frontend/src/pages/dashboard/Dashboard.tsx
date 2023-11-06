import { Outlet } from "react-router-dom"
import Header from "../../components/dashboardComponents/header/Header"
import Footer from "../../components/dashboardComponents/footer/Footer"
import Sidebar from "../../components/dashboardComponents/sidebar/Sidebar"
import { CreateNav } from "../../components/CRUDComponents/navComp/navComp"

function Dashboard() {
    return (
        <div className="main">
            <CreateNav/>
            <Header />
            <div className="container2">
                <div className="menuContainer">
                    <Sidebar />
                </div>
                <div className="contentContainer">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard