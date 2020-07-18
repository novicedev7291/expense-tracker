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
    private String addedOn;

    public NewSavingCommand(String monthYear, String source, BigDecimal amount, String addedOn) {
        this.monthYear = monthYear;
        this.source = source;
        this.amount = amount;
        this.addedOn = addedOn;
    }

    public int amountInCents() {
        return DecimalUtil.decimalToCents(amount);
    }
}
