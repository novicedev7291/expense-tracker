package com.expense.tracker.adapter.repository;

import com.expense.tracker.domain.Transaction;
import com.expense.tracker.domain.TransactionRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class FakeTransactionRepository implements TransactionRepository {
    private final Set<Transaction> txns = new HashSet<>();
    private AtomicInteger idCounter = new AtomicInteger(1);
    @Override
    public Transaction save(Transaction transaction) {
        if(transaction.getId() == null) {
            transaction.setId(idCounter.getAndIncrement());
        }
        txns.add(transaction);
        return transaction;
    }

    @Override
    public List<Transaction> findTransactionsBetween(LocalDateTime startDate, LocalDateTime endDate) {
        Predicate<Transaction> addedOnBetweenStartAndEndDate =
                t -> t.getAddedOn().isAfter(startDate.minusDays(1L)) && t.getAddedOn().isBefore(endDate.plusDays(1L));
        return txns.stream()
                .filter(addedOnBetweenStartAndEndDate)
                .collect(Collectors.toList());
    }
}
