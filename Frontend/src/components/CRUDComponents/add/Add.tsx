import "./add.scss"
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { GetUrlParts, CreateItem as Create } from "../../../Api/apiService"
import { getSingular, crudContext } from "../../../data/data";
import { Field } from "../getColumns/GetColumns";

const mesureUnits = [
    "litro",
    "metro",
    "gramo",
    "contable"
]

type Props = {
    slug: string,
    fields: Field[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const Add = (props: Props) => {

    const [msg, setMsg] = useContext(crudContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { item: itemName } = GetUrlParts();

    const onSubmit: SubmitHandler<any> = (data) => {
        try {
            Create(itemName, data);
            setMsg([`Se ha creado el nuevo ${getSingular(itemName)} con exito`, false])
        } catch (error) {
            setMsg([`Ha surgido un error al crear el Nuevo ${getSingular(itemName)}`, true])
        } finally {
            props.setOpen(false)

        }
    };

    return (
        <div className="addItem">

            <div className="modal2">
                <span className="close" onClick={() => props.setOpen(false)}>X</span>
                <h1>Crear nuevo {getSingular(props.slug)}</h1>
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    {props.fields
                        .filter(item => item.field !== "id" && item.field !== "img")
                        .map((field,index) => (
                            <div className="item" key={index}>
                                <label htmlFor="1">{field.headerName}</label>
                                {(field.field === "unidadMedida") ?
                                    (<select {...register(field.field, { required: field.required })}>
                                        {mesureUnits.map(unidad => (
                                            <option value={unidad} >{unidad}</option>
                                        ))}
                                    </select>
                                    )
                                    : (
                                        <input
                                            type={field.type}
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

export default Add;