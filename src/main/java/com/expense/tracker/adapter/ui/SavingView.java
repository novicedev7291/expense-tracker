package com.expense.tracker.adapter.ui;

import com.expense.tracker.adapter.DecimalUtil;
import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.service.ExpenseSheetService;
import com.expense.tracker.adapter.web.NewSavingCommand;
import com.expense.tracker.adapter.web.TransactionDto;
import com.expense.tracker.domain.ExpenseSheet;
import com.expense.tracker.domain.Transaction;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.text.ParseException;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Route(value = "saving-view", layout = MainLayout.class)
@PageTitle("Savings | Expense Tracker")
public class SavingView extends VerticalLayout {
    private final ExpenseSheetService service;
    private final Grid<TransactionDto> grid = new Grid<>(TransactionDto.class);
    private final Button addSaving = new Button("New");
    private final TransactionForm transactionForm;
    private MonthYearView monthYearView;

    public SavingView(ExpenseSheetService service) {
        this.service = service;
        addClassName("income-list-view");
        setSizeFull();

        addSaving.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        addSaving.addClickListener(e -> addSaving());

        configureGrid();

        monthYearView = new MonthYearView();
        monthYearView.addListener(MonthYearView.MonthValueChangeEvent.class, this::updateView);

        transactionForm = new TransactionForm();
        transactionForm.addListener(TransactionForm.SaveEvent.class , this::saveIncome);
        transactionForm.addListener(TransactionForm.CancelEvent.class , this::cancelEditing);

        Div content = new Div(grid, transactionForm);
        content.addClassName("content");
        content.setSizeFull();

        add(new HorizontalLayout(monthYearView, addSaving), content);
        closeEditor();

        updateSavingList(monthYearView.value());
    }

    private void updateView(MonthYearView.MonthValueChangeEvent event) {
        updateSavingList(event.chosenValue());
    }

    private void saveIncome(TransactionForm.SaveEvent event) {
        TransactionDto incomeFromUi = event.getTransactionDto();
        try {
            NewSavingCommand savingCommand = new NewSavingCommand(
                    monthYearView.value(),
                    incomeFromUi.getSource(),
                    DecimalUtil.rupeesToDecimal(incomeFromUi.getAmount()),
                    incomeFromUi.getAddedOn()
            );
            service.addSavingInSheet(savingCommand);
            updateSavingList(monthYearView.value());
            closeEditor();
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid amount");
        }
    }

    private void addSaving() {
        grid.asSingleSelect().clear();
        editSaving(new TransactionDto());
    }

    private void cancelEditing(TransactionForm.CancelEvent event) {
        closeEditor();
    }

    private void configureGrid() {
        grid.addClassName("income-grid");
        grid.setSizeFull();
        grid.setColumns("id", "source", "amount", "addedOn");
        grid.getColumns().forEach(col -> col.setAutoWidth(true));
        grid.asSingleSelect().addValueChangeListener(event -> editSaving(event.getValue()));
    }

    private void editSaving(TransactionDto value) {
        if(value == null) {
            closeEditor();
        }else{
            transactionForm.setTransactionDto(value);
            transactionForm.setVisible(true);
            addClassName("editing");
        }
    }

    private void closeEditor() {
        transactionForm.setTransactionDto(null);
        transactionForm.setVisible(false);
        removeClassName("editing");
    }

    private void updateSavingList(String monthYear) {
        final ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        final List<TransactionDto> incomeDtoList = sheet.savings().stream()
                .map(this::createSavingDto).collect(toList());
        grid.setItems(incomeDtoList);
    }

    private TransactionDto createSavingDto(Transaction income) {
        TransactionDto savingDto = new TransactionDto();
        savingDto.setSource(income.getSource());
        savingDto.setId(income.getId());
        savingDto.setAddedOn(LocalDateUtil.dateToUIFormat(income.getAddedOn()));
        savingDto.setAmount(DecimalUtil.inRupeesFormat(income.amount()));
        return savingDto;
    }
}
