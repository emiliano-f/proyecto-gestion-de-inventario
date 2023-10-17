import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ListItems } from '../../../Api/apiService';
import { setMessage } from '../messageDisplay/MessageDisplay';
import { getUri } from '../../../data/FOREINGENTITY';
import { getSingular } from '../../../data/TRANSLATIONS';

type Props = {
    fieldName: string,
    required: boolean,
    defaultValue: string | undefined
}

/**
 * Componente select que retorna listado desplegable con los valores de un atributo.
 * @param props props.fieldName es el nombre de la columna de interés
 * @returns 
 */
const SelectList = ({props}:Props) => {
    interface Item {
        id: number;
        nombre: string;
        [key: string]: any; // Esto permite otros atributos de cualquier tipo
    }

    const [list, setList] = useState<Item[]>([]);
    const itemName = getUri(props.fieldName);
    
    useEffect(() => {
        const fetchData = async () => {
            await ListItems(setList, itemName)
            .catch((error) => {setMessage("Se ha producido un error al crear el campo select",error)}) 
        };
        fetchData();
    }, [itemName]);
    
    const [currOption,setCurrOption] =  useState("");    
    useState(()=>{setCurrOption(props.defaultValue.toLowerCase().replace("_"," "))},[list]);
    const changeHandler = e => setCurrOption(e.target.value);

    return ( 
        <Form.Select
            name={props.fieldName}
            className="form-select"
            value={currOption}
            required={props.required}
            onChange={changeHandler}
            >
            <option value="" disabled>Elegir {getSingular(itemName)}</option>
            {list.map(value => (
                value.nombre!?
                    <option value={value.nombre.toLocaleLowerCase().replace("_"," ")} key={value.id}>{value.nombre}</option>
                :
                    <option value={value.id} key={value.id}>{value.id}</option>
            ))}
        </Form.Select>
    )
}
export default SelectList;