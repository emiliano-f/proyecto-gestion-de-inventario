import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ListItems } from '../../../Api/apiService';
import { getUri, getSingular} from '../../../data/data';

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
const SelectList = (props:Props) => {

    interface Item {
        id: number;
        nombre: string;
        [key: string]: any; // Esto permite otros atributos de cualquier tipo
    }
    
    const [list, setList] = useState<Item[]>([]);
    const [selectedValue, setSelectedValue] = useState<number | string>("");

    const itemName = getUri(props.fieldName);
    
    useEffect(() => {
        const fetchData = async () => {
            await ListItems(setList, itemName); 
        };
        fetchData();
        
    }, [itemName]);

    useEffect(() => {
        if (props.defaultValue !== "") {
            const object = list.find(field => field.nombre === props.defaultValue);
            if (object) {
                setSelectedValue(object.id);
            }
        }
    },[list])

    return ( 
        <Form.Select
            name={props.fieldName}
            className="form-select"
            value={selectedValue}
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            required={props.required}>
            <option defaultValue={selectedValue} value="" disabled>Elegir {getSingular(itemName)}</option>
            {list.map(vclassName="form-select"
            value={selectedValue}
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            required={props.required}>
            <option defaultValue={selectedValue} value="" disabled>Elegir {getSingular(itemName)}</option>
            {list.map(value => (
                <option value={value.id} key={value.id}>{value.nombre}</option>
            ))}alue => (
                <option value={value.id} key={value.id}>{value.nombre}</option>
            ))}
        </Form.Select>
    )
}
export default SelectList;