package com.expense.tracker.adapter.web;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Getter
@AllArgsConstructor
public class SummaryDto {
    private final BigDecimal income;
    private final BigDecimal expense;
    private final BigDecimal saving;
    private final BigDecimal balance;
}
