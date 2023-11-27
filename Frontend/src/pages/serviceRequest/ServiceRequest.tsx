import Header from "../../components/generalComponents/header/Header"
import ServiceForm from "../../components/CRUDComponents/createComponents/serviceform/ServiceForm"
import MessageDisplay from "../../components/generalComponents/messageDisplay/MessageDisplay"
import MessageProvider from "../../components/providerComponents/messageProvider/MessageProvider"

function ServiceRequest(){
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