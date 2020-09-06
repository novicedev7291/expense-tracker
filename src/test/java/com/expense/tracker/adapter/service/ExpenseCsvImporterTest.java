package com.expense.tracker.adapter.service;

import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.domain.Expense;
import com.google.common.collect.ImmutableList;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class ExpenseCsvImporterTest {
    @Test
    void singleCsvRowOfExpenseShouldGivenExactlyExpense() {
        final String csvRow = "Credit Card,Credit card bill for the month,2000,2020-06-05";
        List<String> csvList = new ArrayList<>(ImmutableList.<String>builder().add(csvRow).build());
        List<Expense> expenseList = ExpenseCsvImporter.importFrom(csvList);
        Expense expectedExpense = Expense.Companion.of(
                "Credit Card", "Credit card bill for the month", 200000,
                LocalDateUtil.localDateOf(2020,6,5)
        );
        assertThat(expenseList)
                .usingElementComparatorIgnoringFields("id")
                .containsExactly(expectedExpense);
    }

    @Test
    void multipleCsvRowsShouldGiveMultipleExactExpenses() {
        List<String> csvRows = new ArrayList<>(
                ImmutableList.<String>builder()
                    .add("Credit Card,Credit card bill for the month,2000,2020-06-05")
                    .add("Miscellaneous,Expenses wh`ich were random,5892,2020-06-26")
                    .build()
        );
        List<Expense> actualExpenses = ExpenseCsvImporter.importFrom(csvRows);
        assertThat(actualExpenses)
                .usingElementComparatorIgnoringFields("id")
                .containsExactly(
                        Expense.Companion.of(
                                "Credit Card", "Credit card bill for the month", 200000,
                                LocalDateUtil.localDateOf(2020,6,5)
                        ),
                        Expense.Companion.of(
                                "Miscellaneous", "Expenses wh`ich were random", 589200,
                                LocalDateUtil.localDateOf(2020,6,26)
                        )
                );
    }

    @Test
    void singleCsvRowWithNullCategoryMustGiveExactExpenseWithMiscellaneousCategory() {
        final String csvRow = ",Credit card bill for the month,2000,2020-06-05";
        List<String> csvList = new ArrayList<>(ImmutableList.<String>builder().add(csvRow).build());
        List<Expense> expenseList = ExpenseCsvImporter.importFrom(csvList);
        Expense expectedExpense = Expense.Companion.of(
                "Miscellaneous", "Credit card bill for the month", 200000,
                LocalDateUtil.localDateOf(2020,6,5)
        );
        assertThat(expenseList)
                .usingElementComparatorIgnoringFields("id")
                .containsExactly(expectedExpense);
    }

    @Test
    void singleCsvRowStringShouldGivenExactContents() {
        final String csvRow = "Mobile Bill,Mobile postpaid bill for this month,588.49,2020-06-22";
        List<String> values = ExpenseCsvImporter.parseCsvRow(csvRow);
        assertThat(values)
                .containsExactly("Mobile Bill", "Mobile postpaid bill for this month", "588.49", "2020-06-22");
    }
}
