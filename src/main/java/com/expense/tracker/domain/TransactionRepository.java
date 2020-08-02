package com.expense.tracker.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public interface TransactionRepository {
    Transaction save(Transaction transaction);
    List<Transaction> findTransactionsBetween(LocalDateTime startDate, LocalDateTime endDate);
    Optional<Transaction> findById(Integer id);
    void delete(Transaction txn);
}
