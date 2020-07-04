package com.expense.tracker.adapter.web;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Getter
@AllArgsConstructor
public class SummaryDto {
    private final String income;
    private final String expense;
    private final String saving;
    private final String balance;
}
