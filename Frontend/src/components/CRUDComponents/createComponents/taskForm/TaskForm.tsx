import "./taskForm.scss";

import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import { ReadItem, CreateItem as Create, UpdateItem as Update, ReadItemId } from "../../../../Api/apiService";

import AddEntity from "../addEntity/AddEntity";
import SelectEnum from "../selectComponentes/selecEnum/SelectEnum";
import { ServiceOrderInfo } from "./serviceOrderInfo/ServiceOrderInfo";
import AddEntityAmount from "./addEntityAmount/AddEntityAmount";

import { setMessage } from "../../../providerComponents/messageDisplay/MessageDisplay";

import { getSingular } from "../../../../data/TRANSLATIONS";
import { objectFilteringNoEmptyValues } from "../../../../utils/utils";
import AddEntityAmount2 from "./addEntityAmount2/AddEntityAmount2";


type Props = {
    action: "create" | "update",
}
/**
 * Componente utilizado para gestionar el ciclo de vida de una Tarea. Acompaña información de la orden de servicio.
 * @param props prop1 action: ["create"] | ["update"]
 * @returns
 */
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
        empleados: Array<{ id: number, horasEstimadas: number, horasTotales: number}>;
        retiros_insumos: Array<{ id_insumo: number; cantidad: number }>;
        herramientas: Array<{ id: number }>;
        ordenServicio: number;
    }
    // Estado que almacena la tarea correspondiente
    const [task, setTask] = useState<Task | null>(null);
    // Para validación de campos
    const [validated, setValidated] = useState(false);

    // Garantiza coherencia de tipos y generecidad para el valor del key (empleado, insumo, herramienta, etc)
    type Entity = {
        [key: string]: any;
    }
    // Array de empleados
    const [empList, setEmpList] = useState<Entity[]>([{ ["empleado"]: '', ["horasEstimadas"]: 0, ["horasTotales"]: null}]);
    // Array de insumos
    const [insumoList, setInsumoList] = useState<Entity[]>([{ ["insumo"]: '', ["cantidad"]: 0 }]);
    // Array de herramientas
    const [herrList, setHerrList] = useState<Entity[]>([{ ["herramienta"]: '' }]);
    // Utilizado para manejar una redirección
    const navigate = useNavigate();
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
            const updatedEmpList = task["empleados"].map(item => ({ ["empleado"]: item.id.toString(), ["horasEstimadas"]: item.horasEstimadas, ["horasTotales"]: item.horasTotales}));
            
            if (updatedEmpList.length > 0) setEmpList(updatedEmpList);
      
            const updatedInsumoList = task["retiros_insumos"].map(item => ({ ["insumo"]: item.id_insumo.toString(), ["cantidad"]: item.cantidad }));
            if (updatedInsumoList.length > 0) setInsumoList(updatedInsumoList);
            const updatedHerrList = task["herramientas"].map(item => ({ ["herramienta"]: item.id.toString() }));
            if (updatedHerrList.length>0) setHerrList(updatedHerrList);

            ReadItemId(setServiceOrder, "ordenes-servicio", task.ordenServicio.toString())
                .then((response) => console.log(response))
                .catch((error) => {
                    setMessage(`Ha surgido un error al buscar la ${getSingular("orden-servicio")} correspondiente a la tarea`, error)
                }); 

        }
    }, [task]);

    // Busca la orden de servicio correspondiente al Crear una Tarea
    if (props.action==="create") {
        ReadItem(setServiceOrder, "ordenes-servicio")
            .then((response) => console.log(response))
            .catch((error) => {
                setMessage(`Ha surgido un error al buscar ${getSingular("orden-servicio")}`, error)
            }); 
    }
    
    /**
     * Crea la tarea con la información del Form
     * @param formData formulario con información de la tarea
     */
    const createItem = (formData: FormData | string) => {
        Create("tareas", formData)
            .then(() => {
                setMessage(`Se ha creado la nueva Tarea con exito`, null);
                navigate('/tarea/tareas');

            })
            .catch((error) => {
                setMessage(`Ha surgido un error al crear la nueva Tarea.`, error);
            })
            
    }
    /**
     * Actualiza la tarea con la información del Form
     * @param formData formulario con información de la tarea
     * @param id identificador de la tarea
     */
    const updateItem = (formData: FormData, id:number) => {
        Update("tareas", formData, id.toString())
            .then(() => {
                setMessage(`Se ha modificado la Tarea con exito`, null);
                window.location.reload();
            })
            .catch((error) => {
                setMessage(`Ha surgido un error al modificar la Tarea.`, error);
            })
    }
    /**
     * Maneja el submit para Crear/Actualizar/Finalizar tarea
     * @param form Formulario extraído del Form
     * @param newForm Formulario nuevo, el cual contendrá toda la información necesaria para procesar la información de la tarea
     */
    const handleSubmit2 = (form: HTMLFormElement, newForm: FormData) => {
        const formData = newForm;
        if (props.action === "create") {
            // Campos de form que se extraerán de forma predeterminada
            const allowedFields = ['tipo', 'descripcion', 'fechaTentativa', 'fechaInicio', 'clasificacion'];
            serviceOrder && (formData.append("ordenServicio", serviceOrder["id"]));
            for (const field of allowedFields) {
                const inputElement = form.elements.namedItem(field) as HTMLInputElement | null;
                if (inputElement) {
                    formData.append(field, inputElement.value);
                }
            }

            formData.append("empleados", JSON.stringify(objectFilteringNoEmptyValues("empleado", empList)));
            formData.append("retiros_insumos", JSON.stringify(objectFilteringNoEmptyValues("insumo", insumoList)));
            formData.append("herramientas", JSON.stringify(objectFilteringNoEmptyValues("herramienta", herrList)));
            createItem(formData);
        }
        else {
            if (task) {
                const allowedFields = ['tipo', 'descripcion', 'fechaTentativa', 'fechaInicio', 'clasificacion'];
                serviceOrder && (formData.append("ordenServicio", serviceOrder["id"]));
                for (const field of allowedFields) {
                    const inputElement = form.elements.namedItem(field) as HTMLInputElement | null;
                    if (inputElement) {
                        formData.append(field, inputElement.value);
                    }
                }

                formData.append("empleados", JSON.stringify(objectFilteringNoEmptyValues("empleado", empList)));
                formData.append("retiros_insumos", JSON.stringify(objectFilteringNoEmptyValues("insumo", insumoList)));
                formData.append("herramientas", JSON.stringify(objectFilteringNoEmptyValues("herramienta", herrList)));
                formData.append("id", task["id"].toString());
                updateItem(formData, task["id"]);
            }
        }
        
    }
    /**
     * Maneja el submit para Crear/Actualizar tarea
     * @param e Evento generado al hacer submit en el Form
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();

        } else {
            const formData = new FormData();
            handleSubmit2(form, formData);
            
        }
        setValidated(true);
    };

    /**
     * Maneja el completado de una tarea
     * @param e Evento generado al hacer click en el botón "Finalizar tarea"
     */
    const completeTask = (e: React.MouseEvent<HTMLButtonElement>) => {

        const form = e.currentTarget.closest('form') as HTMLFormElement | null;
        const fechaInicio = document.querySelector('input[name="fechaInicio"]') as HTMLInputElement;
        if (fechaInicio===null || fechaInicio.value==="") {
            setMessage("Para finalizar la tarea, antes debe establecer una fecha de inicio.", null);
        } 
        else if (form) {
            const formData = new FormData();
            // Obtener valores de horas totales de empList
            const horasTotales = empList.map(emp => emp.horasTotales);

            const todasSonNumericas = horasTotales.every(horas => (horas !== "" && !isNaN(parseInt(horas))));

            if (todasSonNumericas) {
                // Almacenamiento de la fecha actual, como "fechaFin"
                const dateObject = new Date();
                const month = dateObject.getMonth() + 1;
                const year = dateObject.getFullYear();
                const date = dateObject.getDate();
                const currentDate = year + "-" + month + "-" + date;
                formData.append("fechaFin", currentDate);
                handleSubmit2(form, formData)
                setValidated(true);
            } else {
                setMessage("Antes de finalizar la tarea, asignar horas totales a cada empleado", null);
            }
        }
               
    };
    
    return (
        <>
        
        <div className="task-form">
            <div className="info mb-3">
                {(props.action === "create") && (
                    <h1>Crear tarea</h1>
                )}
                {(props.action === "update") && (
                    <h1>Modificar tarea</h1>
                )}
                
                
            </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-5">
                    {(serviceOrder) && (
                        <ServiceOrderInfo action={props.action} serviceOrder={serviceOrder}></ServiceOrderInfo>
                    )}

                <Col className="task">
                    <h4>Tarea</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Tipo</Form.Label>
                            <SelectEnum props={{ entityName: entityName, fieldName: "tipo", required: true, defaultValue: task ? (task["tipo"]):"", exclude:undefined, readOnly:serviceOrder && (serviceOrder["estado"]==="FINALIZADA") || false}}/>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Clasificación</Form.Label>
                                <SelectEnum props={{ entityName: entityName, fieldName: "clasificacion", required: true, defaultValue: task ? (task["tipo"]) : "", exclude: undefined, readOnly: serviceOrder && (serviceOrder["estado"] === "FINALIZADA") || false }} />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="taken">
                        <Form.Label>Descripción</Form.Label>
                                <Form.Control name="descripcion" as="textarea" rows={2} required defaultValue={task ? (task["descripcion"]) : ""} readOnly={serviceOrder && (serviceOrder["estado"] === "FINALIZADA") || false} />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio
                                </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                        
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Fecha de Inicio</Form.Label>
                                    <Form.Control name="fechaInicio" type="date" defaultValue={task ? (task["fechaInicio"]) : ""} readOnly={serviceOrder && (serviceOrder["estado"] === "FINALIZADA") || false} />
                        </Form.Group>
                            <Form.Group as={Col} controlId="taken">
                                <Form.Label>Fecha Tentativa</Form.Label>
                                <Form.Control readOnly={props.action === "update"} name="fechaTentativa" type="date" required defaultValue={task ? (task["fechaTentativa"]) : ""} />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio
                                </Form.Control.Feedback>
                            </Form.Group>
                        <Form.Group as={Col} controlId="taken">
                            <Form.Label>Fecha de Finalización</Form.Label>
                            <Form.Control readOnly={true} name="fechaFin" type="date" defaultValue={task ? (task["fechaFin"]) : ""} />
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">                            
                            <AddEntityAmount2 entList={empList} setEntList={setEmpList} entityName="empleado" amountTitle="horasEstimadas" amountTooltip="Horas estimadas" amountTitle2="horasTotales" amountTooltip2="Horas totales" action={props.action} readOnly={serviceOrder && (serviceOrder["estado"] === "FINALIZADA") || false} />
                        </Row>
                        <Row className="mb-3">
                            <Col className="mb-3">
                                <AddEntityAmount entList={insumoList} setEntList={setInsumoList} entityName="insumo" amountTitle="cantidad" readOnly={serviceOrder && (serviceOrder["estado"] === "FINALIZADA") || false} />
                            </Col>
                            <Col className="mb-3">
                                <AddEntity entList={herrList} setEntList={setHerrList} entityName="herramienta" readOnly={serviceOrder && (serviceOrder["estado"] === "FINALIZADA") || false} />
                            </Col>
                        </Row>
                             
                    </Col>
                </Row>
        
                
                <Row className="mb-3">
                        {props.action === "create" &&
                            (<Button className="btn btn-success" type="submit">
                                Crear Tarea
                            </Button>)
                        }
                        {props.action === "update" &&
                            (<>
                                <div className="d-flex">
                                    <Button className="btn btn-success mx-2 col" type="submit">
                                        Actualizar Tarea
                                    </Button>
                                    <Button className="btn btn-light mx-2 col-2" onClick={(e) => completeTask(e)}>
                                        Finalizar Tarea
                                    </Button>

                                </div>
                                
                            </>)
                        }                        
                </Row>       
                
            </Form >
        </div>
        </>
    )
}
export default TaskForm