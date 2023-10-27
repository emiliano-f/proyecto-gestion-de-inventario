import "./repositionForm.scss";

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


function PedidoInsumoView(){
    return (<>
    <h4>Pedido de Insumo</h4>
    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridNombre">
            <Form.Label>Fecha de creación</Form.Label>
            <Form.Control disabled type="string" value={row["usuarioNombre"]} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridApellido">
            <Form.Label>Insumo</Form.Label>
            <Form.Control disabled type="string" value={row["usuarioApellido"]} />
        </Form.Group>
    </Row>
    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridSector">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control disabled value={row["sector"]} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridSector">
            <Form.Label>Recibido</Form.Label>
            <Form.Control disabled value={row["sector"]} />
        </Form.Group>
    </Row>
    <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control disabled as="textarea" rows={2} value={row["descripcion"]} />
    </Form.Group>
    </>);
}

function PresupuestoCreate(){
    return (<>
        <h4>Nuevo Presupuesto</h4>
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
    </>)
}


const RepositionForm = () => {
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
                <h1>Crear Presupuesto</h1>
            </div>
            <Form>
                <Row className="mb-5">
                    {row &&
                        <Col xs={5} className="service-order">
                            <PedidoInsumoView/>          
                        </Col>
                    } 
                    <Col className="task">
                        <PresupuestoCreate/>
                    </Col>
                </Row>
                <Row>
                    <AddEntity entityName={"presupuesto"}/>
                </Row>   
                <Row className="mb-3">
                    <Button className="btn btn-success" type="submit">
                        Asociar Presupuestos
                    </Button>
                </Row>       
            </Form>
        </div>
    )
}
export default RepositionForm