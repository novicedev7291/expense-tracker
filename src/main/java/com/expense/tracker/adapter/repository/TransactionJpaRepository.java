package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionJpaRepository extends JpaRepository<Transaction, Integer> {
    @Query("Select t from Transaction t where t.addedOn >= :startDate and t.addedOn <= :endDate")
    List<Transaction> findAllByAddedOnBetween(LocalDateTime startDate, LocalDateTime endDate);
}
