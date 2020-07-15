import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopHeading from "./components/TopHeading";
import AppDatePicker from "./components/AppDatePicker";
import { ExpenseRow } from "./components/TableRow";
import { RouteUrl, Expense as ExpenseModel } from "./Types";
import { MONTH_YEAR_FORMAT } from "./constant";

import { Link, RouteComponentProps } from "react-router-dom";

import { useFetch } from "./hooks";
import LocaleUtils from "react-day-picker/moment";

interface Props extends RouteComponentProps<RouteUrl> {}

export const Expense: React.FC<Props> = ({ match }) => {
  const { url } = match;
  const [monthYear, setMonthYear] = useState<Date>(new Date());
  const { data: expenses, loading } = useFetch<ExpenseModel[]>(
    `/expenses?monthYear=${LocaleUtils.formatDate(
      monthYear,
      MONTH_YEAR_FORMAT
    )}`
  );

  return (
    <React.Fragment>
      <TopHeading
        iconName="money-bill-wave"
        title="Expense"
        variantClassName="bg-danger"
      />

      <section id="action-section" className="py-4 mb-4 bg-light">
        <Container>
          <Row>
            <Col sm="4" className="mb-3">
              <AppDatePicker
                dateFormat={MONTH_YEAR_FORMAT}
                $value={monthYear}
                handleDayChange={(value: Date) => setMonthYear(value)}
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
              ) : (
                <Card>
                  <Card.Header>
                    <div className="d-flex">
                      <div className="mr-auto">
                        <h4>Latest Expenses</h4>
                      </div>
                      <div className="ml-auto"></div>
                    </div>
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
                            key={`${e.id}`}
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
