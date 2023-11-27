import "./addEntity.scss"
import React from "react";
import { Form,Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

import SelectList from "../selectComponentes/selectList/SelectList";
import {getPlural, getSingular} from '../../../../data/TRANSLATIONS'

type Entities = {
    [key: string]: any;
}

type Props = {
    entityName: string,
    entList: Entities,
    setEntList: React.Dispatch<React.SetStateAction<Entities[]>>
}

const AddEntity = (props:Props) =>{

    // Agrega un campo de entidad
    const handleAddEnt =()=>{
        props.setEntList(prevState => [...prevState, { [props.entityName]: '' }]);
    }
    
    const entListString: string[] = Object.values(props.entList).map(item => item[props.entityName]);
    
    // Elimina determinado entidad
    const handleDeleteEnt = (index:number) => {
        props.setEntList(prevState => {
            const list = [...prevState];
            list.splice(index, 1);
            return list;
        });
    }
    return(
        <>
            <div className="entity-label">{getPlural(props.entityName)}</div>
            {props.entList.map((x, i) => { 
                return (
                    <Form.Group className="mb-1" controlId="formGridEntidad" key={i}>
                        <div className="entity">
                            <div className="entity-row">
                                <InputGroup.Text id="basic-addon1">{i + 1}</InputGroup.Text>

                                <SelectList props={{ fieldName: props.entityName, required: false, defaultValue: x[props.entityName], exclude: [...entListString], setEntListObj: {setEntList: props.setEntList, index:i}}} />

                                {props.entList.length !== 1 &&
                                    <Button className="btn btn-danger" onClick={() => handleDeleteEnt(i)}>-</Button>
                                }
                                {props.entList.length - 1 === i &&
                                    <Button className="btn btn-success" onClick={handleAddEnt}>+</Button>
                                }
                            </div>
                        </div>
                    </Form.Group>
                )
            })}
        </>
    )
}
export default React.memo(AddEntity);

