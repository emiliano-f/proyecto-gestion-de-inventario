import "./addEntity.scss"
import React, { useState,useEffect } from "react";
import { Form,Button } from "react-bootstrap";
import SelectList from "../selectList/SelectList";
import { getSingular } from "../../../data/TRANSLATIONS";

const AddEntity = ({entityName}) =>{

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
        entList.map((x,i)=>{
            return(
                <Form.Group className="mb-1" controlId="formGridEntidad" key={i}>
                    <div className="entity">
                        <Form.Label>{i+1} : </Form.Label>
                        <div className="entitySelect">
                        <SelectList props={{fieldName:entityName,required:false,defaultValue:""}}/>
                        </div>
                        <div className="entityButtons">
                        {entList.length!==1 &&
                            <Button className="btn btn-danger" onClick={()=> handleDeleteEnt(i)}>-</Button>
                        }
                        {entList.length-1===i &&
                            <Button className="btn btn-success" onClick={handleAddEnt}>+</Button>
                        }
                        </div> 
                    </div>
                </Form.Group>  
            )
        })
    )
}
export default AddEntity