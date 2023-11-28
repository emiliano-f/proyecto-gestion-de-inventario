import Header from "../../components/generalComponents/header/Header"
import ServiceForm from "../../components/CRUDComponents/createComponents/serviceform/ServiceForm"
import MessageDisplay from "../../components/generalComponents/messageDisplay/MessageDisplay"
import MessageProvider from "../../components/providerComponents/messageProvider/MessageProvider"
import { useEffect } from "react";
import { useAuthData } from "../../components/providerComponents/authProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function ServiceRequest(){
    const [authData] = useAuthData();
    const nav = useNavigate();
    
    useEffect(() =>{
        if(authData["authenticated"] === false){
            nav("/login");
        }
    },[])
    
    if (authData["authenticated"] === false) {
        return <Link to="/login" />;
    }

    return (
        <>
            <Header/>
            <MessageDisplay/>
            <MessageProvider>
                <ServiceForm />
            </MessageProvider>
        </>
    )
}

export default ServiceRequest;