import { useNavigate } from "react-router-dom";

var nav = null;

export function CreateNav(){
    nav = useNavigate();
    return (<></>)
}

export function getNav(){
    return nav;
}