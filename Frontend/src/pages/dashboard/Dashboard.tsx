import { Outlet } from "react-router-dom"
import Header from "../../components/generalComponents/header/Header"
import Footer from "../../components/generalComponents/footer/Footer"
import Sidebar from "../../components/generalComponents/sidebar/Sidebar"
//import MessageDisplay from "../../components/generalComponents/messageDisplay/MessageDisplay"
import { CreateNav } from "../../components/providerComponents/navComp/navComp"

const MessageDisplay = () =>{return(<></>)}

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
                    <MessageDisplay />
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard