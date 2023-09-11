import "./addItem.scss"
import { GetUrlParts, CreateItem as Create} from "../../Api/apiService"
import { translate, crudContext } from "../../data/data";
import { useContext } from "react";
import { Field } from "../getColumns/GetColumns";

import { unidadesMedida } from "../../data/data";

import { useForm, SubmitHandler } from "react-hook-form"

type Props = {
    slug: string,
    fields: Field[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const AddItem = (props: Props) => {

    const [msg, setMsg] = useContext(crudContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {item:itemName} = GetUrlParts();
    /*
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    */
    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);

        try {
            Create(itemName, data);
            setMsg([`Se ha creado el nuevo ${translate[itemName].singular} con exito`, false])

        } catch (error) {
            setMsg([`Ha surgido un error al crear el Nuevo ${translate[itemName].singular}`, true])
        } finally {
            props.setOpen(false)
        
        } 
    };

    return (
        <div className="addItem">
            
            <div className="modal2">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Crear nuevo {props.slug}</h1>
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    {props.fields
                        .filter(item => item.field !== "id" && item.field !== "img")
                        .map(field => (
                            
                            <div className="item">
                                <label htmlFor="1">{field.headerName}</label>
                                {(field.field === "unidadMedida") ? 
                                    (<select {...register(field.field, {required: field.required})}>
                                        {unidadesMedida.map(unidad => (
                                            <option value={unidad} >{unidad}</option>
                                        ))}
                                    </select>
                                    )
                                : (
                                    <input
                                        type = {field.type}
                                        // name={field.field}
                                        placeholder={field.field}
                                        {...register(field.field, { required: field.required })} />
                                )}
                                                                
                            </div>
                        ))}
                    <button type="submit">Crear</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;