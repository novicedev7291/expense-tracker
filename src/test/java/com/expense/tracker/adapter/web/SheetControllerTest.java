package com.expense.tracker.adapter.web;

import com.expense.tracker.adapter.repository.FakeExpenseRepository;
import com.expense.tracker.adapter.repository.FakeTransactionRepository;
import com.expense.tracker.adapter.service.ExpenseSheetService;
import com.expense.tracker.domain.ExpenseRepository;
import com.expense.tracker.domain.TransactionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class SheetControllerTest {
    private final TransactionRepository txnRepository = new FakeTransactionRepository();
    private final ExpenseRepository expenseRepository = new FakeExpenseRepository();

    private final ExpenseSheetService service = new ExpenseSheetService(txnRepository, expenseRepository);

    @Test
    void shouldAddNewExpense() {
        final SheetController controller = new SheetController(service);
        ResponseEntity responseEntity = controller.addExpense(
                NewExpenseCommand
                        .of(
                                "06/2020",
                                null,
                                "Miscellaneous expense",
                                new BigDecimal("7.897"),
                                "2020-06-13"
                        )
        );
        assertThat(responseEntity.getStatusCode())
                .isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void shouldAddNewSaving() {
        final SheetController controller = new SheetController(service);
        controller.addIncome(
                new NewIncomeCommand("03/2019", "Salary", new BigDecimal("1538.20"),
                        "2019-03-04")
        );
        ResponseEntity responseEntity = controller.addSaving(
                new NewSavingCommand("03/2019","Mutual Fund", new BigDecimal("9.87"),
                        "2019-03-07")
        );
        assertThat(responseEntity.getStatusCode())
                .isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void shouldAddNewIncome() {
        final SheetController controller = new SheetController(service);
        ResponseEntity responseEntity = controller.addIncome(
                new NewIncomeCommand("02/2020", "Salary", new BigDecimal("9.87"),
                        "2020-02-23")
        );
        assertThat(responseEntity.getStatusCode())
                .isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void shouldImportExpenseCsv() {
        final SheetController controller = new SheetController(service);
        String csvContent = "Category,Description,Amount,Added On\n" +
                "Rent,Monthly rent of house,21000,2020-06-02\n" +
                "Credit Card,Credit card bill for the month,2000,2020-06-05\n" +
                "Groceries,Groceries payment this week,3000,2020-06-11\n" +
                "Mobile Bill,Mobile postpaid bill for this month,588.49,2020-06-22\n" +
                "Gym,Gym fee for this month,1000,2020-06-10\n" +
                "Miscellaneous,Expenses wh`ich were random,5892,2020-06-26";
        final ExpenseCsvContent content = new ExpenseCsvContent(csvContent, "06/2020");
        final ResponseEntity responseEntity = controller.importExpenses(content);
        assertThat(responseEntity.getStatusCode())
                .isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void shouldFailImportingExpenseFromCsvForDifferentMonth() {
        final SheetController controller = new SheetController(service);
        String csvContent = "Category,Description,Amount,Added On\n" +
                "Rent,Monthly rent of house,21000,2020-06-02\n" +
                "Credit Card,Credit card bill for the month,2000,2020-06-05\n" +
                "Groceries,Groceries payment this week,3000,2020-06-11\n" +
                "Mobile Bill,Mobile postpaid bill for this month,588.49,2020-06-22\n" +
                "Gym,Gym fee for this month,1000,2020-06-10\n" +
                "Miscellaneous,Expenses wh`ich were random,5892,2020-06-26";
        final ExpenseCsvContent content = new ExpenseCsvContent(csvContent, "06/2019");
        Assertions.assertThrows(
                IllegalArgumentException.class, () -> controller.importExpenses(content));
    }
}
