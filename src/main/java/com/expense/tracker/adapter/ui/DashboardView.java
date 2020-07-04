package com.expense.tracker.adapter.ui;

import com.expense.tracker.adapter.DecimalUtil;
import com.expense.tracker.adapter.service.ExpenseSheetService;
import com.expense.tracker.domain.ExpenseSheet;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Route(value = "dashboard", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
@PageTitle("Dashboard | Expense Tracker")
public class DashboardView extends VerticalLayout {
    private Chart chart = new Chart(ChartType.PIE);
    private Span incomeSummary = new Span();
    private Span expenseSummary = new Span();
    private Span savingSummary = new Span();
    private DataSeries dataSeries = new DataSeries();

    private final MonthYearView monthYearView;
    private final ExpenseSheetService service;

    public DashboardView(ExpenseSheetService service) {
        this.service = service;

        monthYearView = new MonthYearView();
        monthYearView.addListener(MonthYearView.MonthValueChangeEvent.class, this::updateChart);

        incomeSummary.addClassName("summary-stats");
        savingSummary.addClassName("summary-stats");
        expenseSummary.addClassName("summary-stats");

        addClassName("dashboard-view");
        setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        add(
                monthYearView,
                new HorizontalLayout(incomeSummary, savingSummary, expenseSummary),
                chart
        );

        addDataToChart();
        addDataToSpan();
    }

    private void addDataToSpan() {
        ExpenseSheet sheet = getSheetFor(monthYearView.value());
        incomeSummary.setText("Income : " + DecimalUtil.inRupeesFormat(sheet.totalIncome()));
        savingSummary.setText("Saving : " + DecimalUtil.inRupeesFormat(sheet.totalSaving()));
        expenseSummary.setText("Expense : " + DecimalUtil.inRupeesFormat(sheet.totalExpense()));
    }

    private void addDataToChart() {
        ExpenseSheet sheet = getSheetFor(monthYearView.value());
        dataSeries.add(new DataSeriesItem("Expense", sheet.totalExpense()));
        dataSeries.add(new DataSeriesItem("Saving", sheet.totalSaving()));
        dataSeries.add(new DataSeriesItem("Balance",
                sheet.totalIncome() - sheet.totalExpense() - sheet.totalSaving()));
        chart.getConfiguration().setSeries(dataSeries);
    }

    private void updateChart(MonthYearView.MonthValueChangeEvent event) {
        updateDataInSpan(event.chosenValue());
        updateDataInChart(event.chosenValue());
    }

    private void updateDataInSpan(String monthYear) {
        ExpenseSheet sheet = getSheetFor(monthYear);
        incomeSummary.setText("Income : " + DecimalUtil.inRupeesFormat(sheet.totalIncome()));
        savingSummary.setText("Saving : " + DecimalUtil.inRupeesFormat(sheet.totalSaving()));
        expenseSummary.setText("Expense : " + DecimalUtil.inRupeesFormat(sheet.totalExpense()));
    }

    private void updateDataInChart(String monthYear) {
        ExpenseSheet sheet = getSheetFor(monthYear);
        dataSeries.clear();
        dataSeries.add(new DataSeriesItem("Expense", sheet.totalExpense()));
        dataSeries.add(new DataSeriesItem("Saving", sheet.totalSaving()));
        dataSeries.add(new DataSeriesItem("Balance",
                sheet.totalIncome() - sheet.totalExpense() - sheet.totalSaving()));
        chart.getConfiguration().setSeries(dataSeries);
        chart.drawChart();
    }

    private ExpenseSheet getSheetFor(String monthYear) {
        return service.getExpenseSheetFor(monthYear);
    }

}
