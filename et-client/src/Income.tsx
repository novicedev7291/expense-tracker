import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LocaleUtils from "react-day-picker/moment";

import TopHeading from "./components/TopHeading";
import AppDatePicker from "./components/AppDatePicker";
import { Income as IncomeModel } from "./Types";
import { useFetch } from "./hooks";
import { IncomeRow } from "./components/TableRow";
import { MONTH_YEAR_FORMAT } from "./constant";

import { Link, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ url: string }> {}

export const Income: React.FC<Props> = ({ match }) => {
  const { url } = match;
  const [monthYear, setMonthYear] = useState<Date>(new Date());
  const { data: incomes, loading } = useFetch<IncomeModel[]>(
    `/incomes?monthYear=${LocaleUtils.formatDate(monthYear, MONTH_YEAR_FORMAT)}`
  );
  return (
    <React.Fragment>
      <TopHeading
        iconName="wallet"
        title="Income"
        variantClassName="bg-success"
      />

      <section id="action-section" className="py-2 mb-2 bg-light">
        <Container>
          <Row>
            <Col sm="4">
              <AppDatePicker
                dateFormat={MONTH_YEAR_FORMAT}
                $value={monthYear}
                handleDayChange={(value: Date) => setMonthYear(value)}
              />
            </Col>
            <Col sm="4">
              <Link to={`${url}/new`} className="btn btn-success btn-block">
                <FontAwesomeIcon icon="plus" /> Add Income
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
                        <h4>Income Sources</h4>
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
                      {incomes &&
                        incomes.map((i) => (
                          <IncomeRow
                            detailLink={`${url}/${i.id}`}
                            key={`${i.id}`}
                            income={i}
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
