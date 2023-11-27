import "./serviceOrderInfo.scss"
import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import "./serviceOrderInfo.scss"

type Props = {
    serviceOrder: any
}

export const ServiceOrderInfo = (props:Props) => {
  return (
      <Col xs={5} className="service-order">
          <h4>Orden de servicio</h4>
          <Row className="mb-3">
              <Form.Group as={Col} controlId="no">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control disabled type="string" value={props.serviceOrder["usuarioNombre"]} />
              </Form.Group>

              <Form.Group as={Col} controlId="no">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control disabled type="string" value={props.serviceOrder["usuarioApellido"]} />
              </Form.Group>
          </Row>
          <Row className="mb-3">
              <Form.Group as={Col} controlId="no">
                  <Form.Label>Sector de la necesidad</Form.Label>
                  <Form.Control disabled value={props.serviceOrder["sector"]} />
              </Form.Group>
              <Form.Group as={Col} controlId="no">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control disabled value={props.serviceOrder["categoria"]} />
              </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="no">
              <Form.Label>Descripción de la necesidad</Form.Label>
              <Form.Control disabled as="textarea" rows={2} value={props.serviceOrder["descripcion"]} />
          </Form.Group>
          <Row className="mb-3">
              <Form.Group as={Col} controlId="no">
                  <Form.Label>Prioridad</Form.Label>
                  <Form.Control disabled value={props.serviceOrder["prioridad"]} />
              </Form.Group>
              <Form.Group as={Col} controlId="no">
                  <Form.Label>Fecha de Necesidad</Form.Label>
                  <Form.Control disabled type="date" value={props.serviceOrder["fechaNecesidad"]} />
              </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="no">
              <Form.Label>Comentario adicional</Form.Label>
              <Form.Control disabled as="textarea" rows={2} value={props.serviceOrder["comentario"]} />
          </Form.Group>
      </Col>
  )
}
