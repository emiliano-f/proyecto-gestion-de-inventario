import { useNavigate } from "react-router-dom"

export var initializedNavegate;
const CreateNav= () => {
    initializedNavegate = useNavigate();
    return (<></>)
}

export default CreateNav;