package com.expense.tracker.adapter.web;

import lombok.Data;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Data
public class ExpenseDto {
    private Long id;
    private String category;
    private String description;
    private String amount;
    private String addedOn;
}
