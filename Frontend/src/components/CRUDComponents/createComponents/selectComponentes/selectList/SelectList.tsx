import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ListItems } from '../../../../../Api/apiService';
import { setMessage } from '../../../../providerComponents/messageDisplay/MessageDisplay';
import { getUri } from '../../../../../data/FOREINGENTITY';
import { getSingular } from '../../../../../data/TRANSLATIONS';

type Props = {
    entityName?: string,
    fieldName: string,
    required: boolean,
    defaultValue?: string | undefined,
    exclude?: string[] | undefined,
    // Objeto utilizado para agregar una entidad a una lista (setEntList), junto a su índice (index).
    setEntListObj?: {
        setEntList: React.Dispatch<React.SetStateAction<{[x: string]: string;}[]>>
        index: number}
        | undefined;
}

/**
 * Componente select que retorna listado desplegable con los valores de un atributo.
 * @param props props.fieldName es el nombre de la columna de interés
 * @returns 
 */
const SelectList = React.memo(({ props }: { props: Props }) => {
    interface Item {
        id: number;
        nombre: string;
        [key: string]: any; // Esto permite otros atributos de cualquier tipo
    }
    

    const { setEntList, index } = props.setEntListObj || {};

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

    useEffect(()=>{
        list.forEach((row)=>{
            if(row.nombre === props.defaultValue || row.id.toString() === props.defaultValue){
                setCurrOption(Number(row.id));
            }
        })
    },[list,setList,props.defaultValue]);

    const changeHandler = e => {
        
        setCurrOption(e.target.value);
        // Aplica solo cuando se hace el llamado desde AddEntity
        
        (setEntList) && (
            setEntList(prevList => {
                const updatedList = [...prevList];
                if (index!==undefined && index < updatedList.length) {
                    updatedList[index] = { [props.fieldName]: e.target.value.toString() };
                }
                return updatedList;
            })
        )
    }
        
    return (
        
        <Form.Select
            name={props.fieldName}
            className="form-select"
            value={currOption}
            required={props.required}
            onChange={changeHandler}
            >
            <option value="" disabled>Elegir {getSingular(itemName)}</option>
            {list
                .map(value => (
                    <option value={value.id} key={value.id} disabled={(props.exclude)?(props.exclude.includes(value.id.toString())):false}>
                        {value.nombre!? value.nombre : value.id}
                    </option>
                ))
            }
        </Form.Select>
    )
})
export default SelectList;