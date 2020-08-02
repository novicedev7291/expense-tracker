package com.expense.tracker.domain;

import com.expense.tracker.adapter.LocalDateUtil;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableSet;
import org.springframework.util.CollectionUtils;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class ExpenseSheet {
    private ImmutableSet<Expense> expenses;
    private ImmutableSet<Transaction> transactions;
    private final Clock clock;

    private final TransactionRepository txnRepository;
    private final ExpenseRepository expenseRepository;

    public ExpenseSheet(Clock clock, TransactionRepository txnRepository, ExpenseRepository expenseRepository) {
        this.clock = clock;
        LocalDateTime today = LocalDateTime.now(clock);
        LocalDateTime startDate = LocalDateUtil.startDateOf(today.getYear(), today.getMonthValue());
        LocalDateTime endDate = LocalDateUtil.lastDateOfMonthFor(today);
        expenses = ImmutableSet.<Expense>builder()
                .addAll(expenseRepository.findExpensesBetween(startDate, endDate))
                .build();
        transactions = ImmutableSet.<Transaction>builder()
                .addAll(txnRepository.findTransactionsBetween(startDate, endDate))
                .build();
        this.txnRepository = txnRepository;
        this.expenseRepository = expenseRepository;
    }

    public void addTransaction(String source, TxnType type, int amount) {
        if(type == TxnType.SAVING && hasBalanceToAddSaving(amount)) {
            throw new IllegalArgumentException("Not having enough balance to save this much for this month");
        }
        Transaction savedTransaction = txnRepository.save(Transaction.of(source, type, amount, LocalDateTime.now(clock)));
        this.transactions = ImmutableSet.<Transaction>builder()
                .addAll(transactions)
                .add(savedTransaction)
                .build();
    }

    public Transaction addTransaction(String source, TxnType type, int amount, LocalDateTime addedOn) {
        if(type == TxnType.SAVING && hasBalanceToAddSaving(amount)) {
            throw new IllegalArgumentException("Not having enough balance to save this much for this month");
        }
        if(canAddInSheetForThisMonth(addedOn)) {
            Transaction savedTransaction = txnRepository.save(Transaction.of(source, type, amount, addedOn));
            this.transactions = ImmutableSet.<Transaction>builder()
                    .addAll(transactions)
                    .add(savedTransaction)
                    .build();
            return savedTransaction;
        }
        throw new IllegalArgumentException("Income is not for given month/year");

    }

    private boolean hasBalanceToAddSaving(int amount) {
        return balance() < amount;
    }

    private int balance() {
        return totalIncome() - totalExpenses() - totalSaving();
    }

    private int totalExpenses() {
        return expenses.stream()
                .flatMapToInt(e -> IntStream.of(e.amount()))
                .sum();
    }

    public Expense addExpense(String category, String description, int amount, LocalDateTime addedOn) {
        if(canAddInSheetForThisMonth(addedOn)) {
            Expense savedExpense = expenseRepository.save(Expense.of(category, description, amount, addedOn));
            this.expenses = ImmutableSet.<Expense>builder()
                    .addAll(expenses)
                    .add(savedExpense)
                    .build();
            return savedExpense;
        }
        throw new IllegalArgumentException("Expense is not for this month/year");
    }

    private boolean canAddInSheetForThisMonth(LocalDateTime addedOn) {
        LocalDateTime dateNow = LocalDateTime.now(clock);
        return addedOn.getYear() == dateNow.getYear() && addedOn.getMonth().getValue() == dateNow.getMonthValue();
    }

    public ImmutableSet<Expense> expenses() {
        return ImmutableSet.<Expense>builder()
                .addAll(expenses.stream().sorted(compareExpensesByAddedOn()).collect(toList()))
                .build();
    }

    public ImmutableList<Transaction> incomeSources() {
        return ImmutableList.copyOf(transactions.stream()
                .filter(Transaction::isFromIncome)
                .sorted(compareTxnByAddedOn())
                .collect(toList()));
    }

    private Comparator<Transaction> compareTxnByAddedOn() {
        return (left, right) -> {
            if(left.getAddedOn().isBefore(right.getAddedOn())) return -1;
            else if(left.getAddedOn().isAfter(right.getAddedOn())) return 1;
            return 0;
        };
    }

    private Comparator<Expense> compareExpensesByAddedOn() {
        return (left, right) -> {
            if(left.getAddedOn().isBefore(right.getAddedOn())) return 1;
            else if(left.getAddedOn().isAfter(right.getAddedOn())) return -1;
            return 0;
        };
    }

    public ImmutableList<Transaction> savings() {
        return ImmutableList.copyOf(transactions.stream()
                .filter(Transaction::isFromSaving)
                .sorted(compareTxnByAddedOn())
                .collect(toList()));
    }

    public int totalIncome() {
        return transactions.stream()
                .filter(Transaction::isFromIncome)
                .flatMapToInt(t -> IntStream.of(t.amount()))
                .sum();
    }

    public int totalSaving() {
        return transactions.stream()
                .filter(Transaction::isFromSaving)
                .flatMapToInt(t -> IntStream.of(t.amount()))
                .sum();
    }

    public int totalExpense() {
        return expenses.stream()
                .flatMapToInt(e -> IntStream.of(e.amount()))
                .sum();
    }

    public void addAllExpenses(List<Expense> expenses) {
        List<Expense> expensesCannotBeSaved =  expenses.stream()
                .filter(e -> !canAddInSheetForThisMonth(e.getAddedOn()))
                .collect(toList());
        if(!CollectionUtils.isEmpty(expensesCannotBeSaved)) {
            String error = expensesCannotBeSaved
                    .stream().map(Expense::getCategory).collect(Collectors.joining(","));
            throw new IllegalArgumentException(error);
        }
        List<Expense> expensesSaved = expenseRepository.saveAll(expenses);
        this.expenses = ImmutableSet.<Expense>builder()
                .addAll(expenses)
                .addAll(expensesSaved)
                .build();
    }
}
