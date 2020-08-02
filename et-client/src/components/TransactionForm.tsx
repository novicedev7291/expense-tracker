import * as React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppDatePicker from "./AppDatePicker";

interface FieldInfo {
  placeholder: string;
  name: string;
  type: string;
}

interface Props {
  loading: boolean;
  error?: string;
  readOnly?: boolean;
  values: Map<string, any>;
  title?: string;
  fields: FieldInfo[];
  variant: "danger" | "success" | "primary";
  handleOnAddClick?: () => void;
  handleFieldChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange?: (value: Date) => void;
  handleOnDeleteClick?: () => void;
}

const TransactionForm: React.FC<Props> = ({
  loading,
  error,
  readOnly,
  values,
  title,
  variant,
  handleOnAddClick,
  handleFieldChange,
  handleDateChange,
  handleOnDeleteClick,
  fields,
}) => {
  const fieldInputs = fields.map((field) => {
    const value = values.get(field.name);
    const jsxField =
      field.name === "amount" ? (
        <FormGroup key={`${field.name}`}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon icon="rupee-sign" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
              onChange={handleFieldChange && handleFieldChange}
              readOnly={readOnly}
              value={value && value}
            />
          </InputGroup>
        </FormGroup>
      ) : (
        <Form.Group key={`${field.name}`}>
          <Form.Control
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            onChange={handleFieldChange && handleFieldChange}
            readOnly={readOnly}
            value={value && value}
          />
        </Form.Group>
      );
    return jsxField;
  });
  return (
    <section>
      <Container>
        <Row>
          <Col sm="3" md="4">
            <Card>
              <Card.Header>
                <Card.Title>
                  <div className="d-flex">
                    <div>{title || "Please fill the details"}</div>
                    {readOnly && (
                      <div className="d-flex flex-grow-1">
                        <button
                          onClick={() =>
                            handleOnDeleteClick && handleOnDeleteClick()
                          }
                          style={{
                            border: "none",
                            marginLeft: "auto",
                            background: "none",
                          }}
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon="trash-alt" />
                        </button>
                      </div>
                    )}
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  {fieldInputs}
                  <Form.Group>
                    <AppDatePicker
                      dateFormat="MMMM DD, YYYY"
                      $value={values.get("addedOn")}
                      handleDayChange={handleDateChange}
                    />
                  </Form.Group>
                </Form>
                {error && <Alert variant="danger">{error}</Alert>}
                {!readOnly && (
                  <Button
                    variant={variant}
                    block
                    onClick={handleOnAddClick && handleOnAddClick}
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
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TransactionForm;
