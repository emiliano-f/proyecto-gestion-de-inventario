import {Outlet} from "react-router-dom";

export default function Home() : React.ReactNode{
    return(
        <>
        <div>
            <h3>Autenticarse</h3>
            <h3>Registrarse</h3>
        </div>
        <div>
            About:
            <Outlet/>
        </div>
        </>
    );
}