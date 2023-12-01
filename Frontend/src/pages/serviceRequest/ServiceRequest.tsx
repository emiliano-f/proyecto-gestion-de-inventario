import Header from "../../components/generalComponents/header/Header"
import ServiceForm from "../../components/CRUDComponents/createComponents/serviceform/ServiceForm"
import MessageDisplay from "../../components/providerComponents/messageDisplay/MessageDisplay";
import { useEffect, useState } from "react";
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

    const [mesage,setMessage] = useState( {title: "",desc: "",is_error: false});
  
    return (
        <>
            <Header/>
            
            <ServiceForm />
        </>
    )
}

export default ServiceRequest;