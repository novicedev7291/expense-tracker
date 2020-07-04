package com.expense.tracker.domain;

import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.repository.FakeExpenseRepository;
import com.expense.tracker.adapter.repository.FakeTransactionRepository;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class SavingLimitTest {
    private final Clock clockAt1June2019 = Clock.fixed(
            LocalDateUtil.localDateOf(2019, 6, 1)
                    .toInstant(ZoneOffset.ofHours(0)),
            ZoneId.of("Asia/Kolkata")
    );
    private final TransactionRepository txnRepository = new FakeTransactionRepository();
    private final ExpenseRepository expenseRepository = new FakeExpenseRepository();

    @Test
    void totalSavingMustNotBeTotalIncomeMinusTotalExpense() {
        final ExpenseSheet expenseSheet =
                new ExpenseSheet(clockAt1June2019, txnRepository, expenseRepository);
        // Given income is 1000
        expenseSheet.addTransaction("Salary", TxnType.INCOME, 1000);

        // when add expense 700
        expenseSheet.addExpense("Rent", "Monthly rent plus leftover", 700,
                LocalDateTime.now(clockAt1June2019));

        // then adding SAVING 400 must throw error
        assertThrows(IllegalArgumentException.class,
                () -> expenseSheet.addTransaction("Mututal fund", TxnType.SAVING, 500));
    }

    @Test
    void given5000IncomeAdd1000SavingAndThen700MustBeTotal1700() {
        final ExpenseSheet expenseSheet =
                new ExpenseSheet(clockAt1June2019, txnRepository, expenseRepository);

        //Given 5000 as income
        expenseSheet.addTransaction("Salary", TxnType.INCOME, 5000);

        // when 1000 added as saving
        expenseSheet.addTransaction("PPF", TxnType.SAVING, 1000);
        // when 700 added again as saving
        expenseSheet.addTransaction("Mutual Fund", TxnType.SAVING, 700);

        // then total saving must be 1700
        assertThat(expenseSheet.savings().size()).isEqualTo(2);
        assertThat(expenseSheet.totalSaving()).isEqualTo(1700);
    }
}
