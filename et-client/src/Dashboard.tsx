import React, { useState, useContext, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppDatePicker from "./components/AppDatePicker";
import TopHeading from "./components/TopHeading";

import { Link } from "react-router-dom";

import { Expense } from "./Types";
import { ExpenseRow } from "./components/TableRow";
import { MONTH_YEAR_FORMAT } from "./constant";

import AppContext, { ContextValues, AppState, AppDate } from "./context";

interface Props {}

const extract = (
  state: AppState,
  forMonthYear: Date
): { expenses: Expense[]; loading: boolean; error?: string } => {
  console.log(state);
  const monthYearKey = new AppDate(forMonthYear).toMonthYearStr();
  const sheet = state.monthYear
    ? state.monthYear!.get(monthYearKey)
    : state.monthYear;
  const { loading, error } = state;

  if (sheet) {
    let expenses: Expense[] = [];
    sheet.expenses!.forEach((value, key) => expenses.push(value));
    return { expenses, loading, error };
  }
  return { expenses: [], loading, error };
};

export const Dashboard: React.FC<Props> = () => {
  const [monthYear, setMonthYear] = useState<Date>(new Date());

  const { state, fetchExpenses } = useContext<ContextValues>(AppContext);

  const { expenses, loading } = extract(state, monthYear);

  useEffect(() => {
    if (fetchExpenses) {
      fetchExpenses(new AppDate(monthYear));
    }
  }, [monthYear]);

  return (
    <React.Fragment>
      <TopHeading iconName="cog" title="Dashboard" />

      <section id="action-section" className="py-4 mb-4 bg-light">
        <Container>
          <Row>
            <Col sm="4" className="mb-3">
              <AppDatePicker
                dateFormat={MONTH_YEAR_FORMAT}
                $value={monthYear}
                handleDayChange={(monthYear: Date) => setMonthYear(monthYear)}
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
              <div className="bg-warning mb-4 text-white text-center">
                Charts will come here
              </div>
            </Col>
            <Col md="8">
              {loading ? (
                <div>loading...</div>
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
