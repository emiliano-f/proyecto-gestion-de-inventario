import "./taskForm.scss";

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ReadItem } from '../../../Api/apiService';
import { setMessage, MessageDisplay } from '../messageDisplay/MessageDisplay';
import { UpdateItem as Update, CreateItem as Create } from "../../../Api/apiService"
import { getSingular } from '../../../data/TRANSLATIONS';
import { GetUrlParts } from '../../../data/FRONTURLS';
import AddEntity from "../addEntity/AddEntity";
import SelectEnum from "../selecEnum/SelectEnum";
import { ServiceOrderInfo } from "./serviceOrderInfo/ServiceOrderInfo";
import AddEntityAmount from "../addEntityAmount/AddEntityAmount";

const TaskForm = () => {
    const entityName = "tareas";
    const [serviceOrder, setServiceOrder] = useState(null);

    const [validated, setValidated] = useState(false);

    const ErrorState = useState(["",false]);
    
    // Garantiza coherencia de tipos y generecidad para el valor del key (empleado, insumo, herramienta, etc)
    type Entities = {
        [key: string]: any;
    }

    // Array de empleados
    const [empList, setEmpList] = useState<Entities>([{ ["empleado"]: '' }]);
    // Array de insumos
    const [insumoList, setInsumoList] = useState<Entities>([{ ["insumo"]: '', ["cantidad"]: 0 }]);

    // Array de herramientas
    const [herrList, setHerrList] = useState<Entities>([{ ["herramienta"]: '' }]);

    const createItem = (formData: FormData) => {
        Create("tareas", formData)
            .then(() => {
                setMessage(`Se ha creado la nueva Tarea con exito`, null)
            })
            .catch((error) => {
                console.log(error)
                setMessage(`Ha surgido un error al crear la nueva Tarea.`, error)
            })
            // .finally(() => props.setOpen(false));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        // Campos de form que se extraerán de forma predeterminada
        const allowedFields = ['tipo', 'descripcion', 'fechaTentativa', 'fechaInicio', 'fechaFin', 'clasificacion'];
        const formData = new FormData();
        for (const field of allowedFields) {
            const inputElement = form.elements.namedItem(field) as HTMLInputElement | null;
            if (inputElement) {
                formData.append(field, inputElement.value);
            }
        }
        // Se agregan los demás campos
        const empleadosJSON = JSON.stringify(empList);
        formData.append("empleados", empleadosJSON);

        const insumosJSON = JSON.stringify(insumoList);
        
        formData.append("retiros_insumo", insumosJSON);

        const herramientasJSON = JSON.stringify(herrList);
        formData.append("herramientas", herramientasJSON);

        console.log(formData)
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else { 
            createItem(formData);

        }
        setValidated(true);
    };

    ReadItem(setServiceOrder, "ordenes-servicio")
        .then((response)=>console.log("response"))
        .catch((error) => {
            setMessage(`Ha surgido un error al buscar ${getSingular("orden-servicio")}`, error)
        });
    
    return (
        <>
        <MessageDisplay {...ErrorState}/>
        <div className="task-form">
            <div className="info mb-3">
                <h1>Crear tarea</h1>
            </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-5">
                    {serviceOrder && (
                        <ServiceOrderInfo serviceOrder={serviceOrder}></ServiceOrderInfo>
                    )}

                <Col className="task">
                    <h4>Tarea</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Tipo</Form.Label>
                            <SelectEnum props={{ entityName: entityName, fieldName: "tipo", required: true, defaultValue: "", exclude:undefined }}/>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Clasificación</Form.Label>
                            <SelectEnum props={{ entityName: entityName, fieldName: "clasificacion", required: true, defaultValue: "", exclude:undefined }} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="taken">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control name="descripcion" as="textarea" rows={2} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Fecha de Inicio</Form.Label>
                            <Form.Control name="fechaInicio" type="date"/>
                        </Form.Group>

                            <Form.Group as={Col} controlId="taken">
                                <Form.Label>Fecha de Finalización</Form.Label>
                                <Form.Control name="fechaFin" type="date" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            
                            <AddEntity entList={empList} setEntList={setEmpList} entityName="empleado"/>
                            
                        </Row>
                        <Row className="mb-3">
                            <Col className="mb-3">
                                <AddEntityAmount entList={insumoList} setEntList={setInsumoList} entityName="insumo"/>
                            </Col>
                            <Col className="mb-3">
                                <AddEntity entList={herrList} setEntList={setHerrList} entityName="herramienta"/>
                            </Col>
                            
                        </Row>
                             
                    </Col>
                </Row>
        
                
                <Row className="mb-3">
                    <Button className="btn btn-success" type="submit">
                        Crear Tarea
                    </Button>
                        
                </Row>       
                
            </Form >
        </div>
        </>
    )
}
export default TaskForm