import "./notFound.scss"

import { Col, Row, Card, Image, Button, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import NotFoundImage from "../../../images/illustrations/404.svg"

const NotFound = () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center ">
        <Container>
          <Row>
            <Col xs={12} className="text-center d-flex align-items-center justify-content-center">
              <div>
                
                <Image src={NotFoundImage} className="img-fluid w-75" />
                
                <h1 className="text-primary mt-5">
                  Página <span className="fw-bolder">no encontrada</span>
                </h1>
                <p className="text-light lead my-4">
                  La página que intentas acceder no está en el servidor (Error 404)
                </p>
                <Link to={"/"}>
                  <Button variant="primary" className="animate-hover">
                    Volver al inicio
                  </Button>
                </Link>         
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}

export default NotFound;
