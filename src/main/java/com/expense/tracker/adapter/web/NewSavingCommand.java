package com.expense.tracker.adapter.web;

import com.expense.tracker.adapter.DecimalUtil;
import lombok.Data;

import java.math.BigDecimal;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Data
public class NewSavingCommand {
    private String monthYear;
    private String source;
    private BigDecimal amount;
    private String date;

    public NewSavingCommand(String monthYear, String source, BigDecimal amount, String date) {
        this.monthYear = monthYear;
        this.source = source;
        this.amount = amount;
        this.date = date;
    }

    public int amountInCents() {
        return DecimalUtil.decimalToCents(amount);
    }
}
