import "./messageDisplay.scss"

type msgError = [
    (string | boolean)[], 
    React.Dispatch<React.SetStateAction<(string | boolean)[]>>
]

var setMsg : React.Dispatch<React.SetStateAction<(string | boolean)[]>>;

export function MessageDisplay(state : msgError){   
    const [msg,is_error] = state[0] 
    setMsg = state[1]; 
    return <div id="msg" className={(msg === "")? "hidden":"visible"}>
                <div className={is_error ? "alert alert-danger" : "alert alert-success"}>
                    {msg}
                </div>
            </div>
}

export function setMessage(message: string, is_error: boolean): void{
    setMsg([message, is_error]);
    const elemento : HTMLElement | null = document.getElementById("msg");
    elemento?.classList.remove('hidden');
    elemento?.classList.add('visible');
    setTimeout(()=>setInvisible(elemento),2900)
}

function setInvisible(elemento : HTMLElement | null ){
    elemento?.classList.remove('visible');
    elemento?.classList.add('hidden');
    setMsg(["",false])
}