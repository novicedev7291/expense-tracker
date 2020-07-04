package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Expense;
import com.expense.tracker.domain.ExpenseRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Repository
class ExpenseJpaRepositoryAdapter implements ExpenseRepository {
    private final ExpenseJpaRepository jpaRepository;

    ExpenseJpaRepositoryAdapter(ExpenseJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Expense save(Expense expense) {
        return jpaRepository.save(expense);
    }

    @Override
    public List<Expense> findExpensesBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return jpaRepository.findAllByAddedOnBetween(startDate, endDate);
    }

    @Override
    public List<Expense> saveAll(List<Expense> expenses) {
        return jpaRepository.saveAll(expenses);
    }
}
