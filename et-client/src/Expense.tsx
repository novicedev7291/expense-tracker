import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopHeading from "./components/TopHeading";
import AppDatePicker from "./components/AppDatePicker";
import { ExpenseRow } from "./components/TableRow";
import { RouteUrl } from "./Types";
import { MONTH_YEAR_FORMAT } from "./constant";

import { Link, RouteComponentProps } from "react-router-dom";

import { useLocalState, useUIDispatch } from "./hooks";
import { AppDate } from "./context";

interface Props extends RouteComponentProps<RouteUrl> {}

export const Expense: React.FC<Props> = ({ match }) => {
  const { url } = match;
  const {
    expenses,
    loading,
    error,
    currentMonthYear: monthYear,
  } = useLocalState();
  const { fetchExpenses, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchExpenses(monthYear);
  }, [monthYear, fetchExpenses]);

  return (
    <React.Fragment>
      <TopHeading
        iconName="money-bill-wave"
        title="Expense"
        variantClassName="bg-danger"
      />

      <section id="action-section" className="py-2 mb-2 bg-light">
        <Container>
          <Row>
            <Col sm="4" className="mb-3">
              <AppDatePicker
                dateFormat={MONTH_YEAR_FORMAT}
                $value={monthYear.value}
                handleDayChange={(value: Date) =>
                  changeMonthYear(new AppDate(value))
                }
              />
            </Col>
            <Col sm="4">
              <Link to={`${url}/new`} className="btn btn-danger btn-block">
                <FontAwesomeIcon icon="plus" /> Add Expense
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="content-section">
        <Container>
          <Row>
            <Col md="8">
              {loading ? (
                <div>loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <Card>
                  <Card.Header>
                    <h4>Expenses</h4>
                  </Card.Header>
                  <Table striped responsive>
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Added On</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses &&
                        expenses?.map((e) => (
                          <ExpenseRow
                            key={e.id.toString()}
                            detailLink={`${url}/${e.id}`}
                            expense={e}
                          />
                        ))}
                    </tbody>
                  </Table>
                </Card>
              )}
            </Col>
            <Col md="4"></Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
