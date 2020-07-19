import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppDatePicker from "./components/AppDatePicker";
import TopHeading from "./components/TopHeading";

import { Link } from "react-router-dom";

import { ExpenseRow } from "./components/TableRow";
import { MONTH_YEAR_FORMAT } from "./constant";

import { useLocalState, useUIDispatch } from "./hooks";
import { AppDate } from "./context";
import SummaryChart from "./components/SummaryChart";

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const {
    expenses,
    loading,
    error,
    summary,
    currentMonthYear: monthYear,
  } = useLocalState();

  const { fetchExpenses, fetchSummary, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchExpenses(monthYear);
    fetchSummary(monthYear);
  }, [monthYear, fetchExpenses, fetchSummary]);

  return (
    <React.Fragment>
      <TopHeading iconName="cog" title="Dashboard" />

      <section id="action-section" className="py-2 mb-2 bg-light">
        <Container>
          <Row>
            <Col sm="4" className="mb-3">
              <AppDatePicker
                dateFormat={MONTH_YEAR_FORMAT}
                $value={monthYear.value}
                handleDayChange={(value: Date) => {
                  console.log(value);
                  changeMonthYear(new AppDate(value));
                }}
              />
            </Col>
            <Col sm="4">
              <Link to="/expense/new" className="btn btn-danger btn-block">
                <FontAwesomeIcon icon="plus" /> Add Expense
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="content-section">
        <Container>
          <Row>
            <Col md="4">
              <SummaryChart {...summary} />
            </Col>
            <Col md="8">
              {loading ? (
                <div>loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <Card>
                  <Card.Header>
                    <h4>Latest Expenses</h4>
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
                            detailLink={`/expense/${e.id}`}
                            expense={e}
                          />
                        ))}
                    </tbody>
                  </Table>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
