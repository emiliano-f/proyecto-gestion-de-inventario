import { Link, Outlet, useNavigate } from "react-router-dom"
import Header from "../../components/generalComponents/header/Header"
import Footer from "../../components/generalComponents/footer/Footer"
import Sidebar from "../../components/generalComponents/sidebar/Sidebar"

import MessageDisplay from "../../components/generalComponents/messageDisplay/MessageDisplay"
import MessageProvider from "../../components/providerComponents/messageProvider/MessageProvider"
import { useAuthData } from "../../components/providerComponents/authProvider/AuthProvider"
import { useEffect } from "react"

function Dashboard() {
    
    const [authData] = useAuthData();
    const nav = useNavigate();
    
    useEffect(() =>{
        if(authData["authenticated"] === false){
            nav("/login");
        }
    },[authData])

    if (authData["authenticated"] === false) {
        console.log(authData)
        return <Link to="/login" />;
    }
    
    return (
        <div className="main">
            <Header />
            <div className="container2">
                <div className="menuContainer">
                    <Sidebar />
                </div>
                <div className="contentContainer">
                    <MessageProvider>
                        <MessageDisplay />
                        <Outlet />
                    </MessageProvider>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard