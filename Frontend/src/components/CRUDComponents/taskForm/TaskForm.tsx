import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { GetUrlParts, ReadItem } from '../../../Api/apiService';

import "./taskForm.scss";
import { setMessage } from '../messageDisplay/MessageDisplay';
import { getSingular } from '../../../data/data';

const TaskForm = () => {
    const [row, setRow] = useState(null);
    const itemName = "ordenes-servicio";

    ReadItem(setRow, itemName)
        .catch((error) => {
            setMessage(`Ha surgido un error al buscar ${getSingular(itemName)}`, error)
        });
    // Array de empleados
    const [empList, setEmpList] = useState([{employee:''}]);

    // Maneja los cambios en cada empleado del array
    const handleEmpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number)=>{
        const {name, value} = e.target;
        const list = [...empList];
        list[index][name]= value;
        setEmpList(list);

    }
    // Agrega un campo de empleado
    const handleAddEmp =()=>{
        setEmpList([...empList, {employee:''}]);
    }
    // Elimina determinado empleado
    const handleDeleteEmp = index => {
        const list=[...empList];
        list.splice(index,1);
        setEmpList(list);
    }
    return (
        <div className="task-form">
            <div className="info mb-3">
                <h1>Crear tarea</h1>
            </div>
            <Form>
                <Row className="mb-5">
                    <Col xs={4} className="service-order">
                        <h4>Orden de servicio</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control disabled type="string" value={"Aldo"/*row["usuarioNombre"]*/} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control disabled type="string" value={"Trillini"/*row["usuarioApellido"]*/} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridSector">
                                <Form.Label>Sector de la necesidad</Form.Label>
                                <Form.Control disabled value={"X"/*row["sector"]*/} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDetalle">
                                <Form.Label>Detalle de la necesidad</Form.Label>
                                <Form.Control disabled value={"Y"/*row["sector"]*/} />
                            </Form.Group>
                        </Row>
                        

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Descripción de la necesidad</Form.Label>
                            <Form.Control disabled as="textarea" rows={2} value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Prioridad</Form.Label>
                                <Form.Control disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Fecha de Necesidad</Form.Label>
                                <Form.Control type="date" value="11/8/2023" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Comentario adicional</Form.Label>
                            <Form.Control disabled as="textarea" rows={2} value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} />
                        </Form.Group>


                    </Col>

                    <Col className="task">
                        <h4>Tarea</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Tarea Padre</Form.Label>
                                <Form.Control name="supTarea"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control name="tipo" />
                            </Form.Group>
                        </Row>
                        {empList.map((x,i)=>{
                            return(
                                <Form.Group className="mb-3" controlId="formGridEmpleado">
                                    <Form.Label>Empleado {i+1}</Form.Label>
                                    <div className="employee">
                                        <Form.Control type="string" placeholder="Ingrese empleado" onChange={e => handleEmpChange(e,i)} />
                                        {empList.length!==1 &&
                                            <Button className="btn btn-danger" onClick={()=> handleDeleteEmp(i)}>-</Button>
                                        }
                                        {empList.length-1===i &&
                                            <Button className="btn btn-success" onClick={handleAddEmp}>+</Button>
                                        }
                                    </div>
                                </Form.Group>
                            );
                        })}
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