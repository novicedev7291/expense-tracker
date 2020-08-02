package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Expense;
import com.expense.tracker.domain.ExpenseRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class FakeExpenseRepository implements ExpenseRepository {
    private final Set<Expense> expenses = new HashSet<>();
    private AtomicLong ids = new AtomicLong(1L);
    @Override
    public Expense save(Expense expense) {
        if(expense.getId() == null) {
            expense.setId(ids.getAndIncrement());
        }
        expenses.add(expense);
        return expense;
    }

    @Override
    public List<Expense> findExpensesBetween(LocalDateTime startDate, LocalDateTime endDate) {
        Predicate<Expense> addedOnBetweenStartAndEndDate =
                e -> e.getAddedOn().isAfter(startDate.minusDays(1L)) && e.getAddedOn().isBefore(endDate.plusDays(1L));
        return expenses.stream()
                .filter(addedOnBetweenStartAndEndDate)
                .collect(Collectors.toList());
    }

    @Override
    public List<Expense> saveAll(List<Expense> expenses) {
        expenses.forEach(this::save);
        return expenses;
    }

    @Override
    public Optional<Expense> findById(Long id) {
        return expenses.stream()
                .filter(expense -> expense.getId().equals(id))
                .findAny();
    }

    @Override
    public void delete(Expense expense){
        expenses.remove(expense);
    }
}
