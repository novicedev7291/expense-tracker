package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public interface ExpenseJpaRepository extends JpaRepository<Expense, Long> {
    @Query("Select e from Expense e where e.addedOn >= :startDate and e.addedOn <= :endDate")
    List<Expense> findAllByAddedOnBetween(LocalDateTime startDate, LocalDateTime endDate);
}
