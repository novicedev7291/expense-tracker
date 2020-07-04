package com.expense.tracker.adapter.web;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Data
public class ExpenseDto {
    private Long id;
    private String category;
    @NotEmpty
    private String description;
    @NotNull
    private String amount;
    @NotNull
    private String addedOn;
}
