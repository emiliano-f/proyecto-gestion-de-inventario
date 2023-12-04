import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { GetEnums} from '../../../../../Api/apiService';
import { GetUrlParts } from '../../../../../data/FRONTURLS';

type Props = {
    entityName?: string | undefined,
    fieldName: string,
    required: boolean,
    defaultValue?: string | undefined,
    exclude?: string[] | undefined,
    readOnly?: boolean
}

/**
 * Componente select que retorna listado desplegable con los valores de un atributo.
 * @param props props.fieldName es el nombre de la columna de interés
 * @returns 
 */
const SelectEnum = ({ props }: { props: Props }) => {
    
    const [enums, setEnum] = useState("");
    const {entity} =  GetUrlParts();
    const entityName = props.entityName===undefined ? entity : props.entityName;
    useEffect(() => {
        const fetchData = async () => {
            await GetEnums(setEnum); 
        };
        
        fetchData();
    }, [entityName]);

    const [currOption,setCurrOption] =  useState("");
    useEffect(() => {
        setCurrOption(props.defaultValue);
    }, [props.defaultValue, enums]);

    // Deprecated
    //useState(()=>{setCurrOption(props.defaultValue)},[enums]);
    const changeHandler = e => setCurrOption(e.target.value);
    //console.log(entityName,props.fieldName)
    console.log(entityName)
    return ( 
        <Form.Select
            name={props.fieldName}
            className="form-select"
            value={currOption}
            required={props.required}
            onChange={changeHandler}
            disabled={props.readOnly || false}
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