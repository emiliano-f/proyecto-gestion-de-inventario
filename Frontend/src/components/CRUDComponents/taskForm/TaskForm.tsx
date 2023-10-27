import "./taskForm.scss";

import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ReadItem } from '../../../Api/apiService';
import { setMessage } from '../messageDisplay/MessageDisplay';

import { getSingular } from '../../../data/TRANSLATIONS';
import { GetUrlParts } from '../../../data/FRONTURLS';
import AddEntity from "../addEntity/AddEntity";

const TaskForm = () => {
    const [row, setRow] = useState(null);
    const {entity: entityName} = GetUrlParts();

    ReadItem(setRow, entityName)
        .then((response)=>console.log("response"))
        .catch((error) => {
            setMessage(`Ha surgido un error al buscar ${getSingular(entityName)}`, error)
        });
    
    return (    
        <div className="task-form">
            <div className="info mb-3">
                <h1>Crear tarea</h1>
            </div>
            <Form>
                <Row className="mb-5">
                    {row &&
                        <Col xs={5} className="service-order">
                            <h4>Orden de servicio</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control disabled type="string" value={row["usuarioNombre"]} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control disabled type="string" value={row["usuarioApellido"]} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridSector">
                                    <Form.Label>Sector de la necesidad</Form.Label>
                                    <Form.Control disabled value={row["sector"]} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDetalle">
                                    <Form.Label>Detalle de la necesidad</Form.Label>
                                    <Form.Control disabled placeholder="Detalle de la necesidad" value={""} />
                                </Form.Group>
                            </Row>


                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Descripción de la necesidad</Form.Label>
                                <Form.Control disabled as="textarea" rows={2} value={row["descripcion"]} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Prioridad</Form.Label>
                                    <Form.Control disabled value={row["prioridad"]} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Fecha de Necesidad</Form.Label>
                                    <Form.Control type="date" value={row["fechaNecesidad"]} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Comentario adicional</Form.Label>
                                <Form.Control disabled as="textarea" rows={2} value={row["comentario"]} />
                            </Form.Group>
                        </Col>
                    
                    }
                    

                    <Col className="task">
                        <h4>Tarea</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control name="tipo" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control name="descripcion" as="textarea" rows={2} value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Fecha de Inicio</Form.Label>
                                <Form.Control name="fechaInicio" type="date"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Fecha de Finalización</Form.Label>
                                <Form.Control name="fechaFin" type="date" />
                            </Form.Group>
                        </Row>
                             
                    </Col>
                </Row>
                
                <div>
                    <AddEntity entityName={"empleado"}/>
                </div>
                <div>
                    <AddEntity entityName={"insumo"}/>
                </div>
                <div>
                    <AddEntity entityName={"herramienta"}/>
                </div>       
                
                <Row className="mb-3">
                    <Button className="btn btn-success" type="submit">
                        Crear Tarea
                    </Button>
                </Row>       
                
            </Form >
        </div>
        
    )
}
export default TaskForm