import "./addEntity.scss"
import React, { useState,useEffect } from "react";
import { Form,Button } from "react-bootstrap";
import SelectList from "../selectList/SelectList";
import InputGroup from 'react-bootstrap/InputGroup';
import {getPlural, getSingular} from '../../../data/TRANSLATIONS'

type Props = {
    entityName: string
}

const AddEntity = (props:Props) =>{

    // Array de entidades
    const [entList, setEntList] = useState([{entity:''}]);
    
    // Agrega un campo de entidad
    const handleAddEnt =()=>{
        setEntList([...entList, {entity:''}]);
    }
    // Elimina determinado entidad
    const handleDeleteEnt = (index:number) => {
        const list=[...entList];
        list.splice(index,1);
        setEntList(list);
    }
    return(
        <>
            <div className="entity-label">{getPlural(props.entityName)}</div>
            {entList.map((x, i) => {
                return (
                    <Form.Group className="mb-1" controlId="formGridEntidad" key={i}>
                        <div className="entity">

                            <div className="entity-row">
                                <InputGroup.Text id="basic-addon1">{i + 1}</InputGroup.Text>
                                <SelectList props={{ fieldName: props.entityName, required: false, defaultValue: "" }} />


                                {entList.length !== 1 &&
                                    <Button className="btn btn-danger" onClick={() => handleDeleteEnt(i)}>-</Button>
                                }
                                {entList.length - 1 === i &&
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
export default AddEntity