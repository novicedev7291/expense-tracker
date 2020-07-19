import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import AppDatePicker from "./AppDatePicker";
import { MONTH_YEAR_FORMAT } from "../constant";
import { AppDate } from "../context";

interface Props {
  actionDate: AppDate;
  actionNavLink: string;
  actionNavLabel: string;
  handleDateChange: (value: Date) => void;
  actionNavVariant?: "btn-danger" | "btn-success" | "btn-primary";
}

const TopActions: React.FC<Props> = ({
  actionDate,
  actionNavLink,
  actionNavLabel,
  handleDateChange,
  actionNavVariant = "btn-danger",
}) => {
  return (
    <section id="action-section" className="py-2 mb-2 bg-light">
      <Container>
        <Row>
          <Col sm="4" className="mb-3">
            <AppDatePicker
              dateFormat={MONTH_YEAR_FORMAT}
              $value={actionDate.value}
              handleDayChange={handleDateChange}
            />
          </Col>
          <Col sm="4">
            <Link
              to={actionNavLink}
              className={`btn ${actionNavVariant} btn-block`}
            >
              <FontAwesomeIcon icon="plus" /> {actionNavLabel}
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopActions;
