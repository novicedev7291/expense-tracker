import React from "react";

import "./fontawesome";
import "./App.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Switch, Route, NavLink } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Income } from "./Income";
import { Saving } from "./Saving";
import { Expense } from "./Expense";
import { IncomeDetail } from "./IncomeDetail";
import { ExpenseDetail } from "./ExpenseDetail";
import { SavingDetail } from "./SavingDetail";

const App: React.FunctionComponent = () => (
  <React.Fragment>
    <Navbar bg="dark" expand="sm" variant="dark">
      <div className="container">
        <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="mr-auto">
            <NavLink className="nav-link" exact to="/">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/income">
              Incomes
            </NavLink>
            <NavLink className="nav-link" to="/saving">
              Savings
            </NavLink>
            <NavLink className="nav-link" to="/expense">
              Expenses
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="login">
              <FontAwesomeIcon icon="user" /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/income" exact component={Income} />
      <Route path="/income/:id" component={IncomeDetail} />
      <Route path="/saving" exact component={Saving} />
      <Route path="/saving/:id" component={SavingDetail} />
      <Route path="/expense" exact component={Expense} />
      <Route path="/expense/:id" component={ExpenseDetail} />
      <Route path="/" render={() => <h1>404 Not found</h1>} />
    </Switch>
  </React.Fragment>
);

export default App;
