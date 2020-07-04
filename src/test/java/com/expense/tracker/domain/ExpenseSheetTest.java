package com.expense.tracker.domain;

import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.repository.FakeExpenseRepository;
import com.expense.tracker.adapter.repository.FakeTransactionRepository;
import com.google.common.collect.ImmutableList;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class ExpenseSheetTest {
    public static final String SOURCE_SALARY = "Salary";

    private final Clock clockAt1June2020 = Clock.fixed(
            LocalDateUtil.localDateOf(2020, 6, 1)
                    .toInstant(ZoneOffset.ofHours(0)),
            ZoneId.of("Asia/Kolkata")
    );
    private final TransactionRepository txnRepository = new FakeTransactionRepository();
    private final ExpenseRepository expenseRepository = new FakeExpenseRepository();

    @Test
    void shouldAddExpenseToAccountFor2020AndJune() {
        ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        LocalDateTime june62020 = LocalDateUtil.localDateOf(2020, 6, 6);
        expenseSheet.addExpense(null, "Expense on given date", 100, june62020);
        assertThat(expenseSheet.expenses().size())
                .isEqualTo(1);
    }

    @Test
    void shouldAddMultipleExpensesFor2020AndJune() {
        ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        LocalDateTime june62020 = LocalDateUtil.localDateOf(2020, 6, 6);
        LocalDateTime june222020 = LocalDateUtil.localDateOf(2020, 6, 22);
        final List<Expense> expenses = new ArrayList<>(
                ImmutableList.<Expense>builder()
                    .add(
                            Expense.of(null, "Expense on given date", 100, june62020),
                            Expense.of("Rent", "Rent on given date", 1000, june222020)
                    ).build()
        );
        expenseSheet.addAllExpenses(expenses);
        assertThat(expenseSheet.expenses().size()).isEqualTo(2);
    }

    @Test
    void shouldFailToAddExpenseFor2020AndJuly() {
        final ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        LocalDateTime july72020 = LocalDateUtil.localDateOf(2020, 7, 7);
        assertThrows(IllegalArgumentException.class,
                () -> expenseSheet.addExpense(null, "Expense for future", 100, july72020));
    }

    @Test
    void failToAddNegativeExpense() {
        final ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        LocalDateTime july72020 = LocalDateUtil.localDateOf(2020, 7, 7);
        assertThrows(IllegalArgumentException.class,
                () -> expenseSheet.addExpense(null, "Negative expense", -10, july72020));
    }

    @Test
    void shouldAddIncomeSourceForTheCurrentMonthAndYear() {
        final ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        expenseSheet.addTransaction(SOURCE_SALARY, TxnType.INCOME, 10000);
        assertThat(expenseSheet.incomeSources().size()).isEqualTo(1);
        assertThat(expenseSheet.incomeSources().get(0).getType())
                .isEqualTo(TxnType.INCOME);
    }

    @Test
    void add10000IncomeToSheet() {
        final ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        expenseSheet.addTransaction(SOURCE_SALARY, TxnType.INCOME, 10000);
        assertThat(expenseSheet.totalIncome()).isEqualTo(10000);
    }

    @Test
    void add10000FromSalaryAsIncomeAnd5000FromInterestMustBe15000() {
        final ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);

        expenseSheet.addTransaction(SOURCE_SALARY, TxnType.INCOME, 10000);
        expenseSheet.addTransaction("Interest", TxnType.INCOME, 5000);
        assertThat(expenseSheet.incomeSources().size()).isEqualTo(2);
        assertThat(expenseSheet.totalIncome()).isEqualTo(15000);
    }

    @Test
    void failToAddZeroIncome() {
        final ExpenseSheet expenseSheet = new ExpenseSheet(clockAt1June2020, txnRepository, expenseRepository);
        assertThrows(IllegalArgumentException.class, () ->
                expenseSheet.addTransaction(SOURCE_SALARY, TxnType.INCOME, 0));
    }
}
