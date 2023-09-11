import { GridColDef } from "@mui/x-data-grid"
import "./addItem.scss"
import {GetUrlParts,CreateItem as Create} from "../../Api/apiService"
import { translate,crudContext } from "../../data/data";
import { useContext } from "react";

type Props = {
    slug: string,
    columns: GridColDef[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddItem = (props: Props) => {

    const [msg,setMsg] = useContext(crudContext)

    const {item:itemName,module:moduleName} = GetUrlParts();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        try{
            Create(itemName,formData);
            setMsg([`Se ha creado el nuevo ${translate[itemName].singular} con exito`,false])
        }catch(error){
            setMsg([`Ha surgido un error al crear el Nuevo ${translate[itemName].singular}`,true])
        }finally{
            props.setOpen(false)
        }            
    };

    return (
        <div className="addItem">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Crear nuevo {translate[props.slug].singular}</h1>
                <form method="post" onSubmit={handleSubmit}>
                    {props.columns
                        .filter(item => item.field !== "id" && item.field !== "img")
                        .map((column, index) => (
                            <div className="item" key={index}>
                                <label htmlFor="1">{column.headerName}</label>
                                <input
                                    type={column.type}
                                    name={column.field}
                                    placeholder={column.field} />
                            </div>
                        ))}
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;