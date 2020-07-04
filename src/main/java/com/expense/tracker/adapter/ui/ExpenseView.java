package com.expense.tracker.adapter.ui;

import com.expense.tracker.adapter.DecimalUtil;
import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.service.ExpenseSheetService;
import com.expense.tracker.adapter.web.ExpenseDto;
import com.expense.tracker.adapter.web.NewExpenseCommand;
import com.expense.tracker.domain.Expense;
import com.expense.tracker.domain.ExpenseSheet;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import lombok.extern.apachecommons.CommonsLog;

import java.text.ParseException;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@CommonsLog
@Route(value = "expense-view", layout = MainLayout.class)
@PageTitle("Expenses | Expense Tracker")
public class ExpenseView extends VerticalLayout {
    private final ExpenseSheetService service;
    private final Grid<ExpenseDto> grid = new Grid<>(ExpenseDto.class);
    private final Button addExpense = new Button("New");
    private final ExpenseForm expenseForm;
    private MonthYearView monthYearView;

    public ExpenseView(ExpenseSheetService service) {
        this.service = service;
        addClassName("list-view");
        setSizeFull();

        addExpense.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        addExpense.addClickListener(e -> addExpense());

        configureGrid();

        monthYearView = new MonthYearView();
        monthYearView.addListener(MonthYearView.MonthValueChangeEvent.class, this::updateView);

        expenseForm = new ExpenseForm();
        expenseForm.addListener(ExpenseForm.SaveEvent.class , this::saveExpense);
        expenseForm.addListener(ExpenseForm.CancelEvent.class , this::cancelEditing);

        Div content = new Div(grid, expenseForm);
        content.addClassName("content");
        content.setSizeFull();

        add(new HorizontalLayout(monthYearView, addExpense), content);
        closeEditor();

        updateExpenseList(monthYearView.value());
    }

    private void updateView(MonthYearView.MonthValueChangeEvent event) {
        updateExpenseList(event.chosenValue());
    }

    private void saveExpense(ExpenseForm.SaveEvent event) {
        ExpenseDto expenseFromUI = event.getExpenseDto();
        try {
            NewExpenseCommand expenseCommand = NewExpenseCommand.of(
                    monthYearView.value(),
                    expenseFromUI.getCategory(),
                    expenseFromUI.getDescription(),
                    DecimalUtil.rupeesToDecimal(expenseFromUI.getAmount()),
                    expenseFromUI.getAddedOn()
            );
            service.addNewExpenseInSheet(expenseCommand);
            updateExpenseList(monthYearView.value());
            closeEditor();
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid amount");
        }
    }

    private void addExpense() {
        grid.asSingleSelect().clear();
        editExpense(new ExpenseDto());
    }

    private void cancelEditing(ExpenseForm.CancelEvent event) {
        closeEditor();
    }

    private void configureGrid() {
        grid.addClassName("expense-grid");
        grid.setSizeFull();
        grid.setColumns("id", "category", "description", "amount", "addedOn");
        grid.getColumns().forEach(col -> col.setAutoWidth(true));
        grid.asSingleSelect().addValueChangeListener(event -> editExpense(event.getValue()));
    }

    private void editExpense(ExpenseDto value) {
        if(value == null) {
            closeEditor();
        }else{
            expenseForm.setExpenseDto(value);
            expenseForm.setVisible(true);
            addClassName("editing");
        }
    }

    private void closeEditor() {
        expenseForm.setExpenseDto(null);
        expenseForm.setVisible(false);
        removeClassName("editing");
    }

    private void updateExpenseList(String monthYear) {
        final ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        final List<ExpenseDto> expenseDtoList = sheet.expenses().stream()
                .map(this::createExpenseDtoFrom).collect(toList());
        grid.setItems(expenseDtoList);
    }

    private ExpenseDto createExpenseDtoFrom(Expense expense) {
        ExpenseDto expenseDto = new ExpenseDto();
        expenseDto.setCategory(expense.getCategory());
        expenseDto.setDescription(expense.getDescription());
        expenseDto.setId(expense.getId());
        expenseDto.setAddedOn(LocalDateUtil.dateToUIFormat(expense.getAddedOn()));
        expenseDto.setAmount(DecimalUtil.inRupeesFormat(expense.amount()));
        return expenseDto;
    }
}
