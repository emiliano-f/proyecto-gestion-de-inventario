import { Link } from "react-router-dom";
import { resources } from "../components/Api/apiService"

export default function Sidebar(){
    return(
        <div className="Sidebar">
            <h2>Inventario</h2>
            <nav>{
                Object.keys(resources).map((module,index) => {
                    return (
                    <div key={index}>
                        <h3>modulo {module}</h3>    
                        <ol key={index}>{
                            Object.keys(resources[module]).map((item,index) => {
                                return (
                                <li key={index}>
                                    <Link key={index} to={`${module}/${item}/`}>
                                        <h4>{item}</h4>
                                    </Link>
                                </li>);
                            })
                        }</ol>   
                    </div>)
                },[resources])
            }</nav>
        </div>
    );
}