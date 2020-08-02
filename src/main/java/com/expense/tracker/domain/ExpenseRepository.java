package com.expense.tracker.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public interface ExpenseRepository {
    Expense save(Expense expense);
    List<Expense> findExpensesBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Expense> saveAll(List<Expense> expenses);
    Optional<Expense> findById(Long id);
    void delete(Expense expense);
}
