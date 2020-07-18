package com.expense.tracker.adapter.web;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Data
public class ExpenseDto {
    private Long id;
    private String category;
    private String description;
    private BigDecimal amount;
    private String addedOn;
}
