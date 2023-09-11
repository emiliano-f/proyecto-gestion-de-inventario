
import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import Sidebar from "../../components/sidebar/Sidebar"

import {crudContext} from "../../data/data"
import { useState } from "react"

function Dashboard() {   
    const data = useState(["",false]);
    return (
        <div className="main">
            <Navbar />
            <div className="container2">
                <div className="menuContainer">
                    <Sidebar />
                </div>
                <div className="contentContainer">
                    <crudContext.Provider value={data}>
                        <Outlet/>
                    </crudContext.Provider>
                </div>
            </div>
            <Footer />
        </div>
    )
}



export default Dashboard