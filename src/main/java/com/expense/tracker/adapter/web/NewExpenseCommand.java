package com.expense.tracker.adapter.web;

import com.expense.tracker.adapter.DecimalUtil;
import lombok.Data;

import java.math.BigDecimal;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Data
public class NewExpenseCommand {
    private String monthYear;
    private String category;
    private String description;
    private BigDecimal amount;
    private String addedOn;

    public static NewExpenseCommand of(String monthYear, String category, String description, BigDecimal amount, String date) {
        NewExpenseCommand command = new NewExpenseCommand();
        command.setAmount(amount);
        command.setCategory(category);
        command.setDescription(description);
        command.setAddedOn(date);
        command.setMonthYear(monthYear);
        return command;
    }

    public int amountInCents() {
        return DecimalUtil.decimalToCents(amount);
    }
}
