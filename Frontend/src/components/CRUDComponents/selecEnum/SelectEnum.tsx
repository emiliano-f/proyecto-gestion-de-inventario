import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { GetEnums} from '../../../Api/apiService';
import { GetUrlParts } from '../../../data/FRONTURLS';

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
const SelectEnum = ({props}:Props) => {
    const [enums, setEnum] = useState("");
    const {entity : entityName} =  GetUrlParts()
    
    useEffect(() => {
        const fetchData = async () => {
            await GetEnums(setEnum); 
        };
        fetchData();
    }, [entityName]);

    const [currOption,setCurrOption] =  useState("");    
    useState(()=>{setCurrOption(props.defaultValue)},[enums]);
    const changeHandler = e => setCurrOption(e.target.value);

    return ( 
        <Form.Select
            name={props.fieldName}
            className="form-select"
            value={currOption}
            required={props.required}
            onChange={changeHandler}
        >
            <option value="" disabled>Elegir {props.fieldName}</option>
            {enums!==""?
            enums[entityName][props.fieldName].map(unidad => (
                <option value={unidad} key={unidad}>{unidad}</option>
            ))
            :null}
        </Form.Select>
    )
}


export default SelectEnum;