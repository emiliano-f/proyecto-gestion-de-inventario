import "./taskForm.scss";

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ReadItem, CreateItem as Create, UpdateItem as Update } from "../../../../Api/apiService";

import AddEntity from "../addEntity/AddEntity";
import SelectEnum from "../selectComponentes/selecEnum/SelectEnum";
import { ServiceOrderInfo } from "./serviceOrderInfo/ServiceOrderInfo";
import AddEntityAmount from "./addEntityAmount/AddEntityAmount";

import MessageDisplay from "../../../generalComponents/messageDisplay/MessageDisplay";
import { setMessage } from "../../../generalComponents/messageDisplay/MessageDisplay";

import { getSingular } from "../../../../data/TRANSLATIONS";
import { objectFilteringNoEmptyValues } from "../../../../utils/utils";

type Props = {
    action: "create" | "update",
}

const TaskForm = (props:Props) => {
    const entityName = "tareas";
    // Para obtener y manejar la información de la orden de servicio
    const [serviceOrder, setServiceOrder] = useState(null);
    // Para obtener y manejar la información de la tarea
    interface Task {
        id: number;
        tipo: string;
        descripcion: string;
        fechaTentativa: any;
        fechaInicio: any;
        fechaFin: any;
        empleados: Array<{ id: number }>;
        retiros_insumos: Array<{ id_insumo: number; cantidad: number }>;
        herramientas: Array<{ id: number }>;
    }

    const [task, setTask] = useState<Task | null>(null);
    // Para validación de campos
    const [validated, setValidated] = useState(false);

    const ErrorState = useState(["",false]);
    
    // Garantiza coherencia de tipos y generecidad para el valor del key (empleado, insumo, herramienta, etc)
    type Entity = {
        [key: string]: any;
    }
    // Array de empleados
    const [empList, setEmpList] = useState<Entity[]>([{ ["empleado"]: '' }]);
    // Array de insumos
    const [insumoList, setInsumoList] = useState<Entity[]>([{ ["insumo"]: '', ["cantidad"]: 0 }]);
    // Array de herramientas
    const [herrList, setHerrList] = useState<Entity[]>([{ ["herramienta"]: '' }]);

    // Si se está realizando una modificación se busca la información de la tarea correspondiente
    if (props.action === "update") {
        ReadItem(setTask, entityName)
            .then((response) => console.log(response))
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar tarea`, error)
            });  
    }
    // Luego de buscar información sobre las tareas. Se actualizan los estados para mantener la lista de empleados, herramientas e insumos (junto a su cantidad solicitada)
    useEffect(() => {
        if (task) {
            const updatedEmpList = task["empleados"].map(item => ({ ["empleado"]: item.id.toString() }));
            setEmpList(updatedEmpList);
            const updatedInsumoList = task["retiros_insumos"].map(item => ({ ["insumo"]: item.id_insumo.toString(), ["cantidad"]: item.cantidad }));
            setInsumoList(updatedInsumoList);
            const updatedHerrList = task["herramientas"].map(item => ({ ["herramienta"]: item.id.toString() }));
            setHerrList(updatedHerrList);    
        }
    }, [task]);

    ReadItem(setServiceOrder, "ordenes-servicio")
        .then((response) => console.log(response))
        .catch((error) => {
            setMessage(`Ha surgido un error al buscar ${getSingular("orden-servicio")}`, error)
        }); 

    const createItem = (formData: FormData | string) => {
        Create("tareas", formData)
            .then(() => {
                setMessage(`Se ha creado la nueva Tarea con exito`, null)
            })
            .catch((error) => {
                console.log(error)
                setMessage(`Ha surgido un error al crear la nueva Tarea.`, error)
            })
            
    }

    const updateItem = (formData: FormData, id:number) => {
        Update("tareas", formData, id.toString())
            .then(() => {
                setMessage(`Se ha modificado la Tarea con exito`, null)
            })
            .catch((error) => {
                console.log(error)
                setMessage(`Ha surgido un error al modificar la Tarea.`, error)
            })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData();
        if (form.checkValidity() === false) {
            e.stopPropagation();

        } else {
            if (props.action === "create") {
                // Campos de form que se extraerán de forma predeterminada
                const allowedFields = ['tipo', 'descripcion', 'fechaTentativa', 'fechaInicio', 'fechaFin', 'clasificacion'];
                serviceOrder && (formData.append("orden_servicio", serviceOrder["id"]));
                for (const field of allowedFields) {
                    const inputElement = form.elements.namedItem(field) as HTMLInputElement | null;
                    if (inputElement) {
                        formData.append(field, inputElement.value);
                    }
                } 
                
                formData.append("empleados", JSON.stringify(objectFilteringNoEmptyValues("empleado", empList)));
                formData.append("retiros_insumos", JSON.stringify(objectFilteringNoEmptyValues("insumo", insumoList)));
                formData.append("herramientas", JSON.stringify(objectFilteringNoEmptyValues("herramienta", herrList)));
                console.log(formData);
                createItem(formData);
            }
            else {
                if (task) {
                    updateItem(formData, task["id"]);
                }
            }
        }
        setValidated(true);
    };

    
    
    return (
        <>
        <MessageDisplay {...ErrorState}/>
        <div className="task-form">
            <div className="info mb-3">
                <h1>Crear tarea</h1>
            </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-5">
                    {(serviceOrder && props.action === "create") && (
                        <ServiceOrderInfo serviceOrder={serviceOrder}></ServiceOrderInfo>
                    )}

                <Col className="task">
                    <h4>Tarea</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Tipo</Form.Label>
                            <SelectEnum props={{ entityName: entityName, fieldName: "tipo", required: true, defaultValue: task ? (task["tipo"]):"", exclude:undefined }}/>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Clasificación</Form.Label>
                                    <SelectEnum props={{ entityName: entityName, fieldName: "clasificacion", required: true, defaultValue: task ? (task["tipo"]) : "", exclude:undefined }} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="taken">
                        <Form.Label>Descripción</Form.Label>
                                <Form.Control name="descripcion" as="textarea" rows={2} defaultValue={task ? (task["descripcion"]) : ""} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Fecha Programada</Form.Label>
                            <Form.Control name="fechaTentativa" type="date" required defaultValue={task ? (task["fechaTentativa"]) : ""}/>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Fecha de Inicio</Form.Label>
                            <Form.Control name="fechaInicio" type="date" defaultValue={task ? (task["fechaInicio"]) : ""} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Fecha de Finalización</Form.Label>
                            <Form.Control name="fechaFin" type="date" defaultValue={task ? (task["fechaFin"]) : ""} />
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