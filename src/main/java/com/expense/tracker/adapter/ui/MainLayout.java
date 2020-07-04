package com.expense.tracker.adapter.ui;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.HighlightConditions;
import com.vaadin.flow.router.RouterLink;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@CssImport("./styles/shared-styles.css")
public class MainLayout extends AppLayout {
    public MainLayout() {
        createHeader();
        createDrawer();
    }

    private void createDrawer() {
        final RouterLink incomeLink = new RouterLink("Income Sources", IncomeView.class);
        final RouterLink expenseLink = new RouterLink("Expenses", ExpenseView.class);
        final RouterLink dashboardLink = new RouterLink("Dashboard", DashboardView.class);
        final RouterLink savingLink = new RouterLink("Savings", SavingView.class);
        dashboardLink.setHighlightCondition(HighlightConditions.sameLocation());

        addToDrawer(new VerticalLayout(dashboardLink, incomeLink, savingLink, expenseLink));
    }


    private void createHeader() {
        final H1 logo = new H1("Expense Tracker");
        logo.addClassName("logo");

        HorizontalLayout header = new HorizontalLayout(new DrawerToggle(), logo);

        header.setDefaultVerticalComponentAlignment(
                FlexComponent.Alignment.CENTER
        );
        header.setWidth("100%");
        header.addClassName("header");

        addToNavbar(header);
    }
}
