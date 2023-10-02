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

    return ( 
        <Form.Select
            name="unidadMedida"
            className="form-select"
            defaultValue={(props.formType === FormType.UPDATE && props.row !== null) ? (props.row["unidadMedida"]) : ("")}
            required>
            <option value="" disabled>Elegir unidad de medida</option>
            {mesureUnits[][props.slug].map(unidad => (<option value={unidad} key={unidad}>{unidad}</option>))}
        </Form.Select>
    )
}
export default SelectList;