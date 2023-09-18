import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { ListItems } from '../../../Api/apiService';
import { getUri, getSingular} from '../../../data/data';

type Props = {
    fieldName: string,
}

const SelectList = (props:Props) => {
    const [list, setList] = useState([]);
    const itemName = getUri(props.fieldName);
    
    ListItems(setList, itemName)
    
    return (
        <Form.Select className="form-select" defaultValue="" required>
            <option selected value="" disabled>Elegir {getSingular(itemName)}</option>
            {list.map(value => (
                <option value={value.nombre} key={value.nombre}>{value.nombre}</option>
            ))}
        </Form.Select>
    )
}
export default SelectList;