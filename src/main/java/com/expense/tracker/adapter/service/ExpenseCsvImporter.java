package com.expense.tracker.adapter.service;

import com.expense.tracker.adapter.DecimalUtil;
import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.domain.Expense;
import com.google.common.base.Splitter;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
class ExpenseCsvImporter {
    public static List<Expense> importFrom(List<String> csvRows) {
        return csvRows.stream()
                .map(ExpenseCsvImporter::createExpenseFromCsvRow)
                .collect(toList());
    }

    private static Expense createExpenseFromCsvRow(String csvRow) {
        List<String> values = parseCsvRow(csvRow);
        LocalDateTime addedOn = LocalDateUtil.dateFromUIFormat(values.get(3));
        int amount = DecimalUtil.decimalToCents(new BigDecimal(values.get(2)));

        return Expense.Companion.of(values.get(0), values.get(1), amount, addedOn);
    }

    static List<String> parseCsvRow(String csvRow) {
        return Splitter.on(",")
                .trimResults()
                .splitToList(csvRow);
    }
}
