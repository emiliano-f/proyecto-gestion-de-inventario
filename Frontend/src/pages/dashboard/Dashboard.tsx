import { Outlet } from "react-router-dom"
import Header from "../../components/generalComponents/header/Header"
import Footer from "../../components/generalComponents/footer/Footer"
import Sidebar from "../../components/generalComponents/sidebar/Sidebar"
import { CreateNav } from "../../components/providerComponents/navComp/navComp"

import MessageDisplay from "../../components/generalComponents/messageDisplay/MessageDisplay"
import MessageProvider from "../../components/providerComponents/messageProvider/MessageProvider"

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
                    <MessageProvider>
                    <Outlet />
                    </MessageProvider>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard