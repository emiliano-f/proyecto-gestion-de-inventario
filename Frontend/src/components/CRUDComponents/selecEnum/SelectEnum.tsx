import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { GetEnums, GetUrlParts } from '../../../Api/apiService';
import { getUri, getSingular} from '../../../data/data';


type Props = {
    fieldName: string,
    formType: object,
    row: any[],
    required: boolean,
    defaultValue: string | undefined
}
enum FormType {
    ADD = "add",
    UPDATE = "update",
    READ = "read",
    DELETE = "delete",
}

/**
 * Componente select que retorna listado desplegable con los valores de un atributo.
 * @param props props.fieldName es el nombre de la columna de interés
 * @returns 
 */
const SelectEnum = (props:Props) => {
    
    const [enums, setEnum] = useState("");
    const [selectedValue, setSelectedValue] = useState<number | string>("");
    
    const {item : itemName} =  GetUrlParts()

    useEffect(() => {
        const fetchData = async () => {
            await GetEnums(setEnum); 
        };
        fetchData();
        
    }, [itemName]);

    useEffect(() => {
        if (props.defaultValue !== "" && enums!=="") {
            const object = enums[itemName][props.fieldName].find(field => field.nombre === props.defaultValue);
            if (object) {
                setSelectedValue(object.id);
            }
        }
    },[enums])

    console.log(itemName,props.fieldName)
    return ( 
        <Form.Select
            name={props.fieldName}
            className="form-select"
            defaultValue={(props.formType === FormType.UPDATE && props.row !== null) ? (props.row[props.fieldName]) : ("")}
            required={props.required}>
            <option value="" disabled>Elegir {props.fieldName}</option>
            {enums!==""?
            enums[itemName][props.fieldName].map(unidad => (<option value={unidad} key={unidad}>{unidad}</option>))
            :null}
        </Form.Select>
    )
}
export default SelectEnum;