package com.expense.tracker.domain;

import com.expense.tracker.adapter.LocalDateUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class ExpenseTest {
    @Test
    void shouldCreateExpenseWithNullCategory() {
        Expense expense = Expense.of(
                null,
                "Expense with null category",
                2000,
                LocalDateUtil.localDateOf(2020, 6, 5)
        );
        assertThat(expense).isNotNull();
    }

    @Test
    void expenseWithNullCategoryShouldHaveMiscellaneousCategory() {
        Expense expense = Expense.of(
                null,
                "Expense with null category",
                2000,
                LocalDateUtil.localDateOf(2020, 6, 5)
        );
        assertThat(expense.getCategory()).isEqualTo("Miscellaneous");
    }
}
