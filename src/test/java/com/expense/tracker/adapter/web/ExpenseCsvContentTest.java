package com.expense.tracker.adapter.web;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class ExpenseCsvContentTest {
    @Test
    void shouldGiveMultipleLinesFromCsvContent() {
        ExpenseCsvContent content = new ExpenseCsvContent();
        content.setContent("Category,Description,Amount,Added On\n" +
                "Rent,Monthly rent of house,21000,2020-06-02\n");
        List<String> lines = content.asLines();
        assertThat(lines)
                .containsExactly("Rent,Monthly rent of house,21000,2020-06-02");
    }
}
