import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  navAction: () => void;
}

const NavBack: React.FC<Props> = ({ navAction }) => {
  return (
    <section id="action-section" className="py-2 mb-2 bg-light">
      <Container>
        <Row>
          <Col sm="2">
            <button onClick={() => navAction()} className="btn btn-secondary">
              <FontAwesomeIcon icon="arrow-left" /> Back
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NavBack;
