import {Outlet} from "react-router-dom";

const Home: React.FC = () => {
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

export default Home;