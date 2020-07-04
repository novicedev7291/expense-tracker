package com.expense.tracker.adapter.service;

import com.expense.tracker.adapter.repository.FakeExpenseRepository;
import com.expense.tracker.adapter.repository.FakeTransactionRepository;
import com.expense.tracker.adapter.web.ExpenseCsvContent;
import com.expense.tracker.adapter.web.NewExpenseCommand;
import com.expense.tracker.adapter.web.NewIncomeCommand;
import com.expense.tracker.adapter.web.NewSavingCommand;
import com.expense.tracker.domain.ExpenseRepository;
import com.expense.tracker.domain.ExpenseSheet;
import com.expense.tracker.domain.TransactionRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class ExpenseSheetServiceTest {
    private final TransactionRepository txnRepository = new FakeTransactionRepository();
    private final ExpenseRepository expenseRepository = new FakeExpenseRepository();

    @Test
    void dispatchingNewExpenseCommandShouldSaveInSheet() {
        final String monthYear = "05/2019";
        final ExpenseSheetService service =
                new ExpenseSheetService(txnRepository, expenseRepository);
        final NewExpenseCommand command =
                NewExpenseCommand.of(
                        monthYear,
                        null,
                        "Miscellaneous expense",
                        new BigDecimal("12.29"),
                        "2019-05-21"
                );
        service.addNewExpenseInSheet(command);
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        assertThat(sheet).isNotNull();
        assertThat(sheet.expenses().size()).isEqualTo(1);
    }

    @Test
    void dispatchingNewExpenseCommandForDifferentMonthShouldFail() {
        final String monthYear = "07/2019";
        final ExpenseSheetService service =
                new ExpenseSheetService(txnRepository, expenseRepository);
        final NewExpenseCommand command =
                NewExpenseCommand.of(
                        monthYear,
                        null,
                        "Miscellaneous expense",
                        new BigDecimal("12.29"),
                        "2019-05-21"
                );
        assertThrows(IllegalArgumentException.class, () -> service.addNewExpenseInSheet(command));
    }

    @Test
    void dispatchingNewIncomeCommandShouldSaveInSheet() {
        final String monthYear = "05/2019";
        final ExpenseSheetService service =
                new ExpenseSheetService(txnRepository, expenseRepository);
        final NewIncomeCommand incomeCommand =
                new NewIncomeCommand(monthYear, "Salary", new BigDecimal("10000"), "2019-05-12");
        service.addIncomeSourceInSheet(incomeCommand);
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        assertThat(sheet).isNotNull();
        assertThat(sheet.incomeSources().size()).isEqualTo(1);
    }

    @Test
    void dispatchingNewIncomeCommandForDifferentMonthShouldFail() {
        final String monthYear = "01/2019";
        final ExpenseSheetService service =
                new ExpenseSheetService(txnRepository, expenseRepository);
        final NewIncomeCommand incomeCommand =
                new NewIncomeCommand(monthYear, "Salary", new BigDecimal("10000"), "2019-05-12");
        assertThrows(IllegalArgumentException.class, () -> service.addIncomeSourceInSheet(incomeCommand));
    }

    @Test
    void dispatchingNewSavingCommandShouldSaveInSheet() {
        final String monthYear = "05/2019";
        final ExpenseSheetService service =
                new ExpenseSheetService(txnRepository, expenseRepository);
        final NewIncomeCommand incomeCommand =
                new NewIncomeCommand(monthYear, "Salary", new BigDecimal("10000"), "2019-05-12");
        service.addIncomeSourceInSheet(incomeCommand);
        final NewSavingCommand command =
                new NewSavingCommand(monthYear, "PPF", new BigDecimal("2000"), "2019-05-23");
        service.addSavingInSheet(command);
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        assertThat(sheet).isNotNull();
        assertThat(sheet.savings().size()).isEqualTo(1);
    }

    @Test
    void dispatchingNewSavingCommandForDifferentYearShouldFail() {
        final String monthYear = "03/2012";
        final ExpenseSheetService service =
                new ExpenseSheetService(txnRepository, expenseRepository);
        final NewIncomeCommand incomeCommand =
                new NewIncomeCommand(monthYear, "Salary", new BigDecimal("10000"), "2012-03-12");
        service.addIncomeSourceInSheet(incomeCommand);
        final NewSavingCommand command =
                new NewSavingCommand(monthYear, "PPF", new BigDecimal("2000"), "2019-05-23");
        assertThrows(IllegalArgumentException.class, () -> service.addSavingInSheet(command));
    }

    @Test
    void importExpensesFromCsvForGivenMonthYear() {
        final String monthYear = "06/2020";
        final ExpenseSheetService service = new ExpenseSheetService(txnRepository, expenseRepository);
        String csvContent = "Category,Description,Amount,Added On\nRent,Monthly rent of house,21000,2020-06-02\nCredit Card,Credit card bill for the month,2000,2020-06-05\nGroceries,Groceries payment this week,3000,2020-06-11\nMobile Bill,Mobile postpaid bill for this month,588.49,2020-06-22\nGym,Gym fee for this month,1000,2020-06-10\nMiscellaneous,Expenses wh`ich were random,5892,2020-06-26\n";
        final ExpenseCsvContent content = new ExpenseCsvContent(csvContent, monthYear);
        service.importExpensesFromCsv(content);
        ExpenseSheet sheet = service.getExpenseSheetFor(monthYear);
        assertThat(sheet.expenses().size()).isEqualTo(6);
    }

    @Test
    void importExpensesFromCsvForDifferentMonthYearShouldFail() {
        final String monthYear = "06/2029";
        final ExpenseSheetService service = new ExpenseSheetService(txnRepository, expenseRepository);
        String csvContent = "Category,Description,Amount,Added On\nRent,Monthly rent of house,21000,2020-06-02\nCredit Card,Credit card bill for the month,2000,2020-06-05\nGroceries,Groceries payment this week,3000,2020-06-11\nMobile Bill,Mobile postpaid bill for this month,588.49,2020-06-22\nGym,Gym fee for this month,1000,2020-06-10\nMiscellaneous,Expenses wh`ich were random,5892,2020-06-26\n";
        final ExpenseCsvContent content = new ExpenseCsvContent(csvContent, monthYear);
        assertThrows(IllegalArgumentException.class, () -> service.importExpensesFromCsv(content));
    }
}
