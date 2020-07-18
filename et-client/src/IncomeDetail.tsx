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
import { Income } from "./Types";

interface Props extends RouteComponentProps<{ id: string }> {}

export const IncomeDetail: React.FC<Props> = ({ match }: Props) => {
  const [values, setValues] = React.useState<Income>({
    id: 0,
    source: "",
    amount: 0,
    addedOn: new Date(),
  });
  const { selectIncome, loading, error } = useLocalState();

  const { addNewIncome } = useUIDispatch();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (value: Date) =>
    setValues({ ...values, addedOn: value });

  const handleAddNewIncome = () => addNewIncome(values);

  if (match) {
    const { id } = match.params;
    if (id === "new") {
      return (
        <React.Fragment>
          <TopHeading
            iconName="wallet"
            title="Add Income"
            variantClassName="bg-success"
          />

          <section id="action-section" className="py-2 mb-2 bg-light">
            <Container>
              <Row>
                <Col sm="2">
                  <Link to="/income" className="btn btn-secondary">
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
                            placeholder="Source"
                            type="text"
                            name="source"
                            value={values.source}
                            onChange={handleFieldChange}
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
                              value={values.amount}
                              onChange={handleFieldChange}
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
                        variant="success"
                        block
                        onClick={handleAddNewIncome}
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
      const income = selectIncome(Number.parseInt(id));
      return (
        <React.Fragment>
          <TopHeading
            iconName="wallet"
            title="View Income"
            variantClassName="bg-success"
          />

          <section id="action-section" className="py-2 mb-2 bg-light">
            <Container>
              <Row>
                <Col sm="2">
                  <Link to="/income" className="btn btn-secondary">
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
                            placeholder="Source"
                            type="text"
                            value={income && income.source}
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
                              value={income && income.amount}
                              readOnly
                            />
                          </InputGroup>
                        </Form.Group>
                        <Form.Group>
                          <AppDatePicker
                            dateFormat="MMMM DD, YYYY"
                            $value={income && income.addedOn}
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
