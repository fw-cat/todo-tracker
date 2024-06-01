import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Container, Row, Col,
  Nav, Navbar
} from 'react-bootstrap';

import "../../css/fonts.css"

const BaseLayout = ({ children }) => (
  <>
    <Helmet>
      <title>Todo App</title>
    </Helmet>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className='roboto-slab-fw-900 text-center'>Todo Tracker</Navbar.Brand>
      </Container>
    </Navbar>
    <Container fluid className="mt-2">
      <Row className="justify-content-center">
        <Col xs={8}>
          {children}
        </Col>
      </Row>
    </Container>
  </>
);

export default BaseLayout;
