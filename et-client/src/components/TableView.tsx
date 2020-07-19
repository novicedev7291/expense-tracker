import React from "react";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

interface Props {
  heading: string;
  headerColumns: string[];
  render: () => React.ReactNode;
}

const TableView: React.FC<Props> = ({ heading, headerColumns, render }) => {
  return (
    <Card>
      <Card.Header>
        <h4>{heading}</h4>
      </Card.Header>
      <Table striped responsive>
        <thead className="thead-dark">
          <tr>
            {headerColumns.map((column) => (
              <th key={`${column === "" ? "detail" : column}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{render()}</tbody>
      </Table>
    </Card>
  );
};

export default TableView;
