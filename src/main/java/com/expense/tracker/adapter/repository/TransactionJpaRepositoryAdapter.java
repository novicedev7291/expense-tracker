package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Transaction;
import com.expense.tracker.domain.TransactionRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    @Override
    public Optional<Transaction> findById(Integer id) {
        return jpaRepository.findById(id);
    }

    @Override
    public void delete(Transaction txn) {
        jpaRepository.delete(txn);
    }
}
