import * as React from "react";

import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopHeading from "./components/TopHeading";
import AppDatePicker from "./components/AppDatePicker";
import InputGroup from "react-bootstrap/InputGroup";

interface Props extends RouteComponentProps<{ id: string }> {}

export const ExpenseDetail: React.FC<Props> = ({ match }: Props) => {
  console.log(match);
  if (match) {
    const { id } = match.params;
    if (id === "new") {
      return (
        <React.Fragment>
          <TopHeading
            iconName="money-bill-wave"
            title="Add Expense"
            variantClassName="bg-danger"
          />

          <section id="action-section" className="py-2 mb-2 bg-light">
            <Container>
              <Row>
                <Col sm="2">
                  <Link to="/expense" className="btn btn-secondary">
                    <FontAwesomeIcon icon="arrow-left" /> Back
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container>
              <Row>
                <Col sm="3" md="4">
                  <Card>
                    <Card.Header>
                      <Card.Title>Please fill the details.</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control placeholder="Category" type="text" />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control placeholder="Description" type="text" />
                        </Form.Group>
                        <Form.Group>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon="rupee-sign" />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control placeholder="Amount" type="number" />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <AppDatePicker dateFormat="MMMM DD, YYYY" />
                        </Form.Group>
                      </Form>
                      <Button variant="danger" block>
                        <FontAwesomeIcon icon="plus" /> Add
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <TopHeading
            iconName="money-bill-wave"
            title="View Expense"
            variantClassName="bg-danger"
          />

          <section id="action-section" className="py-2 mb-2 bg-light">
            <Container>
              <Row>
                <Col sm="2">
                  <Link to="/expense" className="btn btn-secondary">
                    <FontAwesomeIcon icon="arrow-left" /> Back
                  </Link>
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container>
              <Row>
                <Col sm="3" md="4">
                  <Card>
                    <Card.Body>
                      <Form>
                        <Form.Group>
                          <Form.Control
                            placeholder="Category"
                            type="text"
                            value="House Rent"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Description"
                            type="text"
                            value="Monthly house Rent"
                          />
                        </Form.Group>
                        <Form.Group>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text>
                                <FontAwesomeIcon icon="rupee-sign" />
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              placeholder="Amount"
                              type="number"
                              value="60000"
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <AppDatePicker dateFormat="MMMM DD, YYYY" />
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
      );
    }
  }
  return null;
};
