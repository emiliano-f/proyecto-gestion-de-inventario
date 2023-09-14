import { useState } from "react"
import { Outlet } from "react-router-dom"

import { crudContext } from "../../data/data"

import Header from "../../components/dashboardComponents/header/Header"
import Footer from "../../components/dashboardComponents/footer/Footer"
import Sidebar from "../../components/dashboardComponents/sidebar/Sidebar"

function Dashboard() {
    const data = useState(["", false]);
    return (
        <div className="main">
            <Header />
            <div className="container2">
                <div className="menuContainer">
                    <Sidebar />
                </div>
                <div className="contentContainer">
                    <crudContext.Provider value={data}>
                        <Outlet />
                    </crudContext.Provider>
                </div>
            </div>
            <Footer />
        </div>
    )
}



export default Dashboard