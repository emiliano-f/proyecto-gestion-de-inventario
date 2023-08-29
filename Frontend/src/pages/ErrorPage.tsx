import { useRouteError } from "react-router-dom"

export default function ErrorPage() : React.ReactNode{
    const err : unknown = useRouteError();
    var msg : any = err;
    return (
    <div>
        <h1>Ha ocurrido un Error</h1>
        <h2>{msg}</h2>
    </div>
    )
}