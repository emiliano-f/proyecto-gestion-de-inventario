import "./addEntityAmount.scss"
import React, { useState,useEffect } from "react";
import { Form,Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import SelectList from "../../selectComponentes/selectList/SelectList";
import InputGroup from 'react-bootstrap/InputGroup';

import {getPlural, getSingular} from '../../../../../data/TRANSLATIONS'

type Entities = {
    [key: string]: any;
}

type Props = {
    entityName: string,
    entList: Entities,
    setEntList: React.Dispatch<React.SetStateAction<Entities[]>>
    amountTitle: string;
    amountTooltip?: string;
    readOnly?: boolean;
}

const AddEntityAmount = (props:Props) =>{
    // console.log(props.entList);
    // Agrega un campo de entidad
    const handleAddEnt =()=>{
        props.setEntList(prevState => [...prevState, { [props.entityName]: '' }]);
    }
    const entListString: string[] = Object.values(props.entList).map(item => item[props.entityName]);

    // Posiblilidad de eliminar
    
    const [amounts, setAmounts] = useState(props.entList.map(x => x[props.amountTitle] || ""));

    useEffect(() => {
        // Actualizar el estado local cuando props.entList cambie
        setAmounts(props.entList.map(x => x[props.amountTitle] || 0));
    }, [props.entList]);


    // Elimina determinado entidad
    const handleDeleteEnt = (index:number) => {
        props.setEntList(prevState => {
            const list = [...prevState];
            list.splice(index, 1);
            return list;
        });
    }

    const addAmount = (index: number, amount:any) => {
        props.setEntList(prevList => {
            const updatedList = [...prevList];
            const objetoModificado = { ...updatedList[index], [props.amountTitle]: amount};
            updatedList[index] = objetoModificado;
            
            return updatedList;
        });
    }

    // Se puede eliminar y hacer el llamado directamente a addAmount
    const handleChange = (index: number, amount: any) => {
        const newAmounts = [...amounts]; // Copiamos el arreglo de valores actual
        newAmounts[index] = amount; // Actualizamos el valor en la posición correspondiente
        setAmounts(newAmounts); // Actualizamos el estado con los nuevos valores
        addAmount(index, amount);

    };

    return(
        <>
            <div className="entity-label">{getPlural(props.entityName) +"/"+ (props.amountTooltip || "Cantidad")}</div>
            {props.entList.map((x, i) => {
                return (
                    <Form.Group className="mb-1" controlId="formGridEntidad" key={i}>
                        <div className="entity">
                            <div className="entity-row">
                                <InputGroup.Text id="basic-addon1">{i + 1}</InputGroup.Text>
                                <SelectList props={{ fieldName: props.entityName, required: false, defaultValue: x[props.entityName], exclude: [...entListString], setEntListObj: { setEntList: props.setEntList, index: i }, readOnly: props.readOnly }} />

                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-${i}`}>
                                           {props.amountTooltip ||"Cantidad (positiva)"}
                                        </Tooltip>
                                    }
                                >
                                    <Form.Control className="w-25" name="cantidad" inputMode="numeric" pattern="[0-9]*" defaultValue={amounts[i]} onChange={(e) => handleChange(i, e.target.value)} readOnly={props.readOnly} />
                                </OverlayTrigger>

                                {!props.readOnly && props.entList.length !== 1 &&
                                    <Button className="btn btn-danger" onClick={() => handleDeleteEnt(i)}>-</Button>
                                }

                                {!props.readOnly && props.entList.length - 1 === i &&
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
export default React.memo(AddEntityAmount);

