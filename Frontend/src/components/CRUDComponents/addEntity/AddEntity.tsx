import "./addEntity.scss"
import React, { useState,useEffect } from "react";
import { Form,Button } from "react-bootstrap";
import SelectList from "../selectList/SelectList";
import { setMessage } from "../messageDisplay/MessageDisplay";
import { ListItems } from "../../../Api/apiService";

const AddEntity = ({entityName}) =>{

    const [list, setList] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            await ListItems(setList, entityName)
            .catch((error) => {setMessage("Se ha producido un error al crear el campo select",error)}) 
        };
        fetchData();
    }, [entityName]);

    // Array de entidades
    const [entList, setEntList] = useState([{entity:''}]);
    
    // Maneja los cambios en cada entidad del array
    const handleEntChange = (e: React.ChangeEvent<HTMLInputElement>, index: number)=>{
        const {name, value} = e.target;
        const list = [...entList];
        (list[index] as { [key: string]: string })[name] = value;
        setEntList(list);

    }
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
                <Form.Group className="mb-3" controlId="formGridEntidad" key={i}>
                    <Form.Label>{entityName} {i+1}</Form.Label>
                    <div className="entity">
                        <SelectList fieldName={entityName} required={false} defaultValue={""}/>
                        {entList.length!==1 &&
                            <Button className="btn btn-danger" onClick={()=> handleDeleteEnt(i)}>-</Button>
                        }
                        {entList.length-1===i &&
                            <Button className="btn btn-success" onClick={handleAddEnt}>+</Button>
                        }
                    </div>

                </Form.Group>              
        })
    )
}
export default AddEntity
