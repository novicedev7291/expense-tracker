import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TopHeading from "./components/TopHeading";
import AppDatePicker from "./components/AppDatePicker";
import { RouteUrl } from "./Types";
import { SavingRow } from "./components/TableRow";
import { MONTH_YEAR_FORMAT } from "./constant";

import { Link, RouteComponentProps } from "react-router-dom";
import { useLocalState, useUIDispatch } from "./hooks";
import { AppDate } from "./context";

interface Props extends RouteComponentProps<RouteUrl> {}

export const Saving: React.FC<Props> = ({ match }) => {
  const { url } = match;
  const {
    savings,
    loading,
    error,
    currentMonthYear: monthYear,
  } = useLocalState();
  const { fetchSavings, changeMonthYear } = useUIDispatch();

  useEffect(() => {
    fetchSavings(monthYear);
  }, [fetchSavings, monthYear]);
  return (
    <React.Fragment>
      <TopHeading iconName="hand-holding-usd" title="Saving" />

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
              <Link to={`${url}/new`} className="btn btn-primary btn-block">
                <FontAwesomeIcon icon="plus" /> Add Saving
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
                    <div className="d-flex">
                      <div className="mr-auto">
                        <h4>Savings</h4>
                      </div>
                      <div className="ml-auto"></div>
                    </div>
                  </Card.Header>
                  <Table striped responsive>
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Added On</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {savings &&
                        savings.map((s) => (
                          <SavingRow
                            detailLink={`${url}/${s.id}`}
                            key={`${s.id}`}
                            saving={s}
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
