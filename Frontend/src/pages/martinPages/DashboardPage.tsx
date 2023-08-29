import {Outlet} from "react-router-dom";

import {Sidebar} from "../components/Sidebar/Sidebar"

export default function Dashboard() : React.ReactNode{
    return(
    <>
        <h1>Main Page</h1>
        <Sidebar/>
        <div><Outlet/></div>
    </>
    );
}