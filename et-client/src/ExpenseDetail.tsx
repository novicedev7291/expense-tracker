import * as React from "react";

import { RouteComponentProps } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopHeading from "./components/TopHeading";
import AppDatePicker from "./components/AppDatePicker";
import InputGroup from "react-bootstrap/InputGroup";
import { useLocalState, useUIDispatch } from "./hooks";
import { Expense } from "./Types";

interface Props extends RouteComponentProps<{ id: string }> {}

export const ExpenseDetail: React.FC<Props> = ({ match }: Props) => {
  const [values, setValues] = React.useState<Expense>({
    id: 0,
    category: "",
    description: "",
    amount: 0,
    addedOn: new Date(),
  });

  const { selectExpense, loading, error } = useLocalState();
  const { addNewExpense } = useUIDispatch();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (value: Date) => {
    setValues({ ...values, addedOn: value });
  };

  const handleAddExpense = () => {
    console.log(values);
    addNewExpense(values);
  };

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
                          <Form.Control
                            placeholder="Category"
                            name="category"
                            type="text"
                            onChange={handleFieldChange}
                            value={values.category}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Description"
                            type="text"
                            name="description"
                            onChange={handleFieldChange}
                            value={values.description}
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
                              name="amount"
                              onChange={handleFieldChange}
                              value={values.amount}
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <AppDatePicker
                            dateFormat="MMMM DD, YYYY"
                            $value={values.addedOn}
                            handleDayChange={handleDateChange}
                          />
                        </Form.Group>
                      </Form>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Button
                        variant="danger"
                        block
                        onClick={handleAddExpense}
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner
                            as="span"
                            size="sm"
                            animation="border"
                            role="status"
                          />
                        ) : (
                          <>
                            <FontAwesomeIcon icon="plus" /> Add
                          </>
                        )}
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
      const expense = selectExpense(Number.parseInt(id));
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
                            value={expense && expense.category}
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Description"
                            type="text"
                            value={expense && expense.description}
                            readOnly
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
                              value={expense && expense.amount}
                              readOnly
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <AppDatePicker
                            dateFormat="MMMM DD, YYYY"
                            $value={expense && expense.addedOn}
                          />
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
