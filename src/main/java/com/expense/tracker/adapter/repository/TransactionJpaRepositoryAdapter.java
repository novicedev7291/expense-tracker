package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Transaction;
import com.expense.tracker.domain.TransactionRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Repository
class TransactionJpaRepositoryAdapter implements TransactionRepository {
    private final TransactionJpaRepository jpaRepository;

    TransactionJpaRepositoryAdapter(TransactionJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Transaction save(Transaction transaction) {
        return jpaRepository.save(transaction);
    }

    @Override
    public List<Transaction> findTransactionsBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return jpaRepository.findAllByAddedOnBetween(startDate, endDate);
    }
}
