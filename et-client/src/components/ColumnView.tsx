import React, { ReactNode } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TableView from "./TableView";

interface FirstColumnProps {
  heading: string;
  headers: string[];
  loading: boolean;
  error: string;
  render: () => ReactNode;
}

const FirstColumn: React.FC<FirstColumnProps> = ({
  loading,
  error,
  render,
  heading,
  headers,
}) => {
  return (
    <Col md="8">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <TableView heading={heading} headerColumns={headers} render={render} />
      )}
    </Col>
  );
};

interface Props {
  heading: string;
  headers: string[];
  loading: boolean;
  error?: string;
  renderFirstColumn: () => ReactNode;
  renderSecondColumn?: () => ReactNode;
  reverseColumnDirection?: boolean;
}

const ColumnView: React.FC<Props> = ({
  heading,
  headers,
  loading,
  error,
  renderFirstColumn: render,
  renderSecondColumn = () => null,
  reverseColumnDirection = false,
}) => {
  return (
    <section id="content-section">
      <Container>
        <Row>
          {reverseColumnDirection ? (
            <>
              <Col md="4">{renderSecondColumn()}</Col>
              <FirstColumn
                headers={headers}
                heading={heading}
                loading={loading}
                error={error!}
                render={render}
              />
            </>
          ) : (
            <>
              <FirstColumn
                headers={headers}
                heading={heading}
                loading={loading}
                error={error!}
                render={render}
              />
              <Col md="4">{renderSecondColumn()}</Col>
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ColumnView;
