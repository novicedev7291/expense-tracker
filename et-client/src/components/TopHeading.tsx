import React, { FunctionComponent } from "react";

import "../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface HeadingProps {
  iconName?: IconProp;
  title: string;
  variantClassName?: string;
}

const TopHeading: FunctionComponent<HeadingProps> = ({
  title,
  iconName = "cog",
  variantClassName = "bg-primary",
}: HeadingProps) => {
  const classNames = `py-2 ${variantClassName} text-white`;
  return (
    <header id="main-heading" className={classNames}>
      <Container>
        <Row>
          <Col md="6">
            <h1>
              <FontAwesomeIcon icon={iconName} /> {title}
            </h1>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default TopHeading;
